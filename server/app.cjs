const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const uploadRouter = require('./routes/upload.cjs')
const authRouter = require('./routes/auth.cjs')
const userRouter = require('./routes/user.cjs')

const app = express()

app.use(bodyParser.json())

// Allow both GitHub Pages and Vercel origins
const allowedOrigins = [
  'https://nanzhijin.github.io',
]
// Add Vercel preview/prod domains if provided via env (VERCEL_URL)
if (process.env.VERCEL_URL) {
  // e.g. my-app.vercel.app (without protocol)
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`)
}
if (process.env.PUBLIC_BASE_URL) {
  allowedOrigins.push(process.env.PUBLIC_BASE_URL)
}
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true) // allow non-browser tools/curl
    if (allowedOrigins.some(o => origin.startsWith(o))) {
      return callback(null, true)
    }
    return callback(null, false)
  },
  credentials: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true })
})

app.use('/api', authRouter)
app.use('/api', uploadRouter)
app.use('/api', userRouter)

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

module.exports = app
