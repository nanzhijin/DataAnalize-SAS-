const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../db/index.cjs')
const jwt = require('jsonwebtoken')
const router = express.Router()

const SECRET = process.env.JWT_SECRET

router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({ success: false, message: '用户名和密码不能为空' })
  }
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username])
  if (rows.length > 0) {
    return res.json({ success: false, message: '用户名已存在' })
  }
  const hash = await bcrypt.hash(password, 10)
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash])
  try {
    await pool.query(`CREATE USER IF NOT EXISTS '${username}'@'%' IDENTIFIED BY ?`, [password])
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${username}_db\``)
    await pool.query(`GRANT ALL PRIVILEGES ON \`${username}_db\`.* TO '${username}'@'%'`)
  } catch (e) {}
  res.json({ success: true })
})

router.post('/login', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({ success: false, message: '用户名和密码不能为空' })
  }
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username])
  if (rows.length === 0) {
    return res.json({ success: false, message: '用户不存在' })
  }
  const user = rows[0]
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    return res.json({ success: false, message: '密码错误' })
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '2h' })
  res.json({ success: true, token })
})

module.exports = router
