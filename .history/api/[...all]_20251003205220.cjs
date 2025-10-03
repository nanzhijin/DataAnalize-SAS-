// Catch-all Vercel Serverless Function for any /api/* path
const app = require('../server/app.cjs')

module.exports = (req, res) => {
  // Ensure Express sees a /api-prefixed path for mounted routers
  if (!req.url.startsWith('/api')) {
    req.url = req.url === '/' ? '/api' : `/api${req.url}`
  }
  return app(req, res)
}
