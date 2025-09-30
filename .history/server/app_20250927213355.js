// filepath: c:\Windows\System32\dataAnalize\server\app.js
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Backend is running!')
})

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})