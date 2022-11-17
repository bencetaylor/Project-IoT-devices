const express = require('express')
const app = express()
const port = 3002
const http = require("http");

const DEVICE_ID='X8AKY9XR2G';

const STATUS = {
  operating: true
}

const DEVICE_DATA = {
  id: DEVICE_ID,
  ip_address: 'localhost',
  port: port,
  type: 'solar',
  status: STATUS
}

app.get('/', (req, res) => {
  res.send("I'm a solar sensor")
})

app.get('/data', (req, res) => {
  res.json({
    id: DEVICE_ID,
    data: {
      sunlight: Math.random()*100
    }
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const data = JSON.stringify({
  id: DEVICE_ID,
  ip_address: 'localhost',
  port: port,
  type: 'solar'
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

request.on('error', (err) => console.error(err))

request.end(data);

