const express = require('express');
const app = express();
const io = require("socket.io-client");

const port = 3003;

const DEVICE_ID='5DJIFTT3Q8';

const STATUS = {
    operating: true
  }
  
  const DEVICE_DATA = {
    id: DEVICE_ID,
    ip_address: 'localhost',
    port: port,
    type: 'motion',
    status: STATUS
  }

const socket = io("http://localhost:3000");

socket.on('msg', (msg)=>{
    console.log(msg)

    socket.emit('report', {
        id: DEVICE_ID,
        event: "no event"
    })
})

app.get('/', (req, res) => {
    res.send("I'm a motion sensor")
})

app.get('/data', (req, res) => {
    res.send(DEVICE_DATA)
})

app.get('/trigger', (req, res) => {
    socket.emit('report', {
        id: DEVICE_ID,
        event: "motion detected"
    })

    res.status('OK')
})

app.listen(port, () => {
    console.log('listening on *:' + port)
})