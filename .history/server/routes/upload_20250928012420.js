const express = require('express')
const multer = require('multer')
const pool = require('../db')
const mysql = require('mysql2/promise')
const jwt = require('jsonwebtoken')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })
const SECRET = 'your_secret_key' // 与auth.js一致

function getUsernameFromToken(req) {
  const auth = req.headers.authorization
  if (!auth) return null
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, SECRET)
    return payload.username
  } catch {
    return null
  }
}

// 工具函数略...

router.post('/upload', upload.single('file'), async (req, res) => {
  const username = getUsernameFromToken(req)
  if (!username || !req.file) {
    return res.json({ success: false, message: '未登录或缺少文件' })
  }
  try {
    // 1. 创建用户数据库
    const dbName = `${username}_db`
    const connection1 = await pool.getConnection()
    await connection1.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
    connection1.release()
    // 2. 创建文件表
    const connection2 = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '6411NANZHIjin985',
      database: dbName
    })
    await connection2.query(`
      CREATE TABLE IF NOT EXISTS files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255),
        mimetype VARCHAR(100),
        size INT,
        data LONGBLOB,
        upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    // 3. 存储文件
    await connection2.query(
      'INSERT INTO files (filename, mimetype, size, data) VALUES (?, ?, ?, ?)',
      [req.file.originalname, req.file.mimetype, req.file.size, req.file.buffer]
    )
    await connection2.end()
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

module.exports = router