const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = 3000;

// function for socket handling
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// function for setting security http headers
const helmet = require('helmet');
// function for NoSQL query injection data sanitization
const mongoSanitize = require('express-mongo-sanitize');
// module for data sanitization against xss attacks
const xss = require('xss-clean');

// Configuration
dotenv.config({ path: './.env' });
app.use(express.json({ limit: '10kb' }));

// Security
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

const api = require('./api')
app.use('/api', api)

// DB connection setup
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true
})
.then(con => {
  console.log('DB connection established!');
})
.catch(err => console.log(err));

/**
 * socket endpoint to the clients
*/
io.on('connection', (socket) => {
  console.log('socket connected');
  socket.on('msg', (msg)=>{
    console.log(msg)
  })

  socket.on('disconnect', ()=>{
    console.log('socket disconnected')
  })
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})