const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const SECRET = process.env.JWT_SECRET

router.get('/me', (req, res) => {
  const auth = req.headers.authorization
  if (!auth) return res.json({ success: false })
  const token = auth.split(' ')[1]
  try {
    const payload = jwt.verify(token, SECRET)
    res.json({ success: true, username: payload.username })
  } catch {
    res.json({ success: false })
  }
})

module.exports = router
