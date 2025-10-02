const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploadRouter = require('./routes/upload')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const app = express()

app.use(bodyParser.json())

// 全局 use + options 配置CORS
// 只保留带配置的 cors
app.use(cors({
  origin: 'https://nanzhijin.github.io',
  credentials: true
}))
// 加一条全局OPTIONS路由，确保CORS头在预检时返回
app.options('*', cors({
  origin: 'https://nanzhijin.github.io',
  credentials: true
}))

// 简单健康检查，排查路由问题
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', authRouter)
app.use('/api', uploadRouter)
app.use('/api', userRouter)

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

module.exports = app;
// const port = process.env.PORT || 3001;
/* 因为Vercel不能用app.listen，所以注释掉
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})
*/
