const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploadRouter = require('./routes/upload')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user') // 新增

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/api', authRouter)
app.use('/api', uploadRouter)
app.use('/api', userRouter) // 新增

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

/* 注释掉原本端口的监听
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
*/


// 配置Vercel部署，后端
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});