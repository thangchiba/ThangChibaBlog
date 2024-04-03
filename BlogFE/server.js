// server.js

const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3435
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  key: fs.readFileSync('/Users/hoangthang/Desktop/WorkSpace/WebServer/LocalCert/key.pem'),
  cert: fs.readFileSync('/Users/hoangthang/Desktop/WorkSpace/WebServer/LocalCert/cert.pem'),
}

app.prepare().then(() => {
  createServer(options, (req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on https://localhost:${port}`)
  })
})
