const express = require('express')
const app = express()
const port = 3001
const http = require("http");

const DEVICE_ID='Z4XFLET3TS'
const STATUS = {
    operating: false,
    battery: 100,
    dust_bag: 0
}

const DEVICE_DATA = {
    id: DEVICE_ID,
    ip_address: 'localhost',
    port: port,
    type: 'hoover',
    status: STATUS
}

app.get('/', (req, res) => {
  res.send("I'm a hoover")
})

app.get('/data', (req, res) => {
  res.json({ 
    id: DEVICE_ID,
    data: STATUS
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const data = JSON.stringify(DEVICE_DATA)

const SERVER_OPTIONS = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const request = http.request(SERVER_OPTIONS, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += "" + chunk; })
  res.on('end', () => { console.log('response', body) })
  res.on('close', () => { console.log('Closed connection') })
})

request.on('error', (err) => {
  console.error(err)
})

request.end(data);