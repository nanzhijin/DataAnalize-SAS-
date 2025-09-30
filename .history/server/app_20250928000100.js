// filepath: c:\Windows\System32\dataAnalize\server\app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploadRouter = require('./routes/upload')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const authRouter = require('./routes/auth') // 引入auth路由
app.use('/api', authRouter)                 // 挂载到/api前缀
app.use('/api', uploadRouter)

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})