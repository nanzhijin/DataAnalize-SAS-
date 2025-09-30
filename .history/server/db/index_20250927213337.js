const mysql = require('mysql2/promise')

// 修改为你的数据库配置
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6411NANZHIjin985',
  database: 'main_db', // 主数据库名
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool