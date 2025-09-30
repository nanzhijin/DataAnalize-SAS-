const express = require('express')
const bcrypt = require('bcrypt')
const pool = require('../db')
const router = express.Router()

// 注册接口
router.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    return res.json({ success: false, message: '用户名和密码不能为空' })
  }
  // 检查用户是否已存在
  const [rows] = await pool.query('SELECT * FROM users WHERE username=?', [username])
  if (rows.length > 0) {
    return res.json({ success: false, message: '用户名已存在' })
  }
  // 密码加密
  const hash = await bcrypt.hash(password, 10)
  // 保存用户
  await pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash])
  // 创建数据库账号和数据库
  try {
    await pool.query(`CREATE USER IF NOT EXISTS '${username}'@'%' IDENTIFIED BY ?`, [password])
    await pool.query(`CREATE DATABASE IF NOT EXISTS \`${username}_db\``)
    await pool.query(`GRANT ALL PRIVILEGES ON \`${username}_db\`.* TO '${username}'@'%'`)
  } catch (e) {
    // 忽略数据库账号已存在等错误
  }
  res.json({ success: true })
})

// 登录接口
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
  // 登录成功，可以生成token（此处简单返回成功）
  res.json({ success: true, message: '登录成功' })
})

module.exports = router