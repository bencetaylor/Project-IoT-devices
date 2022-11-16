const express = require('express');
const app = express();
const io = require("socket.io-client");

const PORT = 4000;

const DEVICE_ID='5DJIFTT3Q8';

const socket = io("http://localhost:3000");

socket.on('msg', (msg)=>{
    console.log(msg)
})

app.get('/', (req, res) => {
    res.send('index')
})

app.get('/send', (req, res) => {
    socket.emit('msg', 'hello there')
    res.send('send')
})

app.listen(PORT, () => {
    console.log('listening on *:' + PORT)
})