const express = require('express')
const multer = require('multer')
const pool = require('../db')
const mysql = require('mysql2/promise')

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// 工具函数：为用户创建数据库
async function ensureUserDatabase(username) {
  const dbName = `${username}_db`
  const connection = await pool.getConnection()
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``)
  connection.release()
  return dbName
}

// 工具函数：为用户数据库创建文件表
async function ensureFileTable(dbName) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '6411NANZHIjin985',
    database: dbName
  })
  await connection.query(`
    CREATE TABLE IF NOT EXISTS files (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(255),
      mimetype VARCHAR(100),
      size INT,
      data LONGBLOB,
      upload_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `)
  await connection.end()
}

// 上传接口
router.post('/upload', upload.single('file'), async (req, res) => {
  const username = req.body.username
  if (!username || !req.file) {
    return res.json({ success: false, message: '缺少用户名或文件' })
  }
  try {
    // 1. 创建用户数据库
    const dbName = await ensureUserDatabase(username)
    // 2. 创建文件表
    await ensureFileTable(dbName)
    // 3. 存储文件
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '6411NANZHIjin985',
      database: dbName
    })
    await connection.query(
      'INSERT INTO files (filename, mimetype, size, data) VALUES (?, ?, ?, ?)',
      [req.file.originalname, req.file.mimetype, req.file.size, req.file.buffer]
    )
    await connection.end()
    res.json({ success: true })
  } catch (err) {
    res.json({ success: false, message: err.message })
  }
})

module.exports = router