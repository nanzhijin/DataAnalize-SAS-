const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploadRouter = require('./routes/upload')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')

const app = express()

app.use(bodyParser.json())

// 只保留带配置的 cors
app.use(cors({
  origin: 'https://nanzhijin.github.io',
  credentials: true
}))

app.use('/api', authRouter)
app.use('/api', uploadRouter)
app.use('/api', userRouter)

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})