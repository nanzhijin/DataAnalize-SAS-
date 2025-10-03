// Bridge Vercel API route to the Express app
const app = require('../server/app.cjs')

module.exports = (req, res) => {
  // Ensure the Express app sees the original /api prefix expected by its routes
  if (!req.url.startsWith('/api')) {
    req.url = req.url === '/' ? '/api' : `/api${req.url}`
  }
  return app(req, res)
}
