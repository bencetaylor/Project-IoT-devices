const mongoose = require('mongoose');
const cron = require('node-cron')
const dotenv = require('dotenv');
const express = require('express');
const app = express();
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

// DB connection setup
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true
})
.then(con => {
  console.log('DB connection established!');
})
.catch(err => console.log(err));

const _CLIENTS_ONLINE = [
  // {
  //   id: 'X8AKY9XR2G',
  //   ip_address: 'localhost:3001',
  //   type: 'solar sensor'
  // }
];

/**
 * Cron job to poll the online clients
 */
cron.schedule("*/10 * * * * *", function () {
  console.log('Poll clients:')
  _CLIENTS_ONLINE.forEach(client => {
    http.get({ path: '/data', hostname: 'localhost', port: 3001 }, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => { console.log(data.sunlight) })
    })
  })
});

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// app.get('/send', (req,res) => {
//   io.emit('msg', 'Hi')
//   res.send('send')
// })

/**
 * REST endpoints
*/
app.route('/api/:id')
.get((req, res) => {
  console.log(+req.params.id)
  // TODO call service 
  const device = _CLIENTS_ONLINE.filter(device => device.id === +req.params.id)[0]
  res.json(device)
})

app.route('/api/register')
.post((req,res)=>{
  const clientData = req.body
  console.log(clientData)
  _CLIENTS_ONLINE.push(clientData)
  res.json({
    register: 'success'
  });
})


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

const port = 3000;
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})