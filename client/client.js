const express = require('express')
const app = express()
const port = 3001
const http = require("http");

const DEVICE_NAME='X8AKY9XR2G';
// const DEVICE_ID='Z4XFLET3TS'
// const DEVICE_ID='UQKRWSO6OQ'

app.get('/', (req, res) => {
  res.send("I'm a solar sensor")
})

app.get('/data', (req, res) => {
  res.json({
    sunlight: Math.random()*100
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const data = JSON.stringify({
  id: DEVICE_NAME,
  ip_address: 'localhost:' + port,
  type: 'solar sensor'
})

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/register',
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