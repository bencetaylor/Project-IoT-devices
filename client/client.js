const express = require('express')
const app = express()
const port = 3001
const http = require("http");

const DEVICE_NAME='X8AKY9XR2G'
// const DEVICE_ID='5DJIFTT3Q8'
// const DEVICE_ID='Z4XFLET3TS'
// const DEVICE_ID='UQKRWSO6OQ'

app.get('/', (req, res) => {
  res.send("I'm a solar sensor")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const data = JSON.stringify({
  name: 'solar sensor',
  ip: 'localhost:' + port
})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const request = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += "" + chunk; })
  res.on('end', () => { console.log('response', body) })
  res.on('close', () => { console.log('Closed connection') })
})

request.end(data);