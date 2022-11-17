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
  socket.on('report', (data) => {
    logService.createLog(data.id, { info: data.event})
  })

  socket.on('disconnect', () => {
    console.log('socket disconnected')
  })
});

// set view engine
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// bootstrap
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// setting up routing
const apiRoutes = require('./routes/apiRoutes');
const deviceRoutes = require('./routes/deviceRoutes')(io);
const logRoutes = require('./routes/logRoutes');

app.get('/', (req, res) => {
  res.redirect('/devices')
})

app.use('/api', apiRoutes);
app.use('/logs', logRoutes);
app.use('/devices', deviceRoutes);


/**
 * Cron job to poll the online clients
 * Poll rate - 10s
 */

const cron = require('node-cron');
const deviceService = require('./middlewares/deviceService')
const httpComm = require('./middlewares/httpComm');
const logService = require('./middlewares/logService');
cron.schedule("*/15 * * * * *", function () {
  io.emit('msg', 'Request report!');
  console.log('job run ' + Date.now())
  deviceService.getDevicesByCommunication('rest')
    .then((result) => {
      result.forEach((client) => {
        httpComm.sendGetRequest(client.device_address)
      })
    })
});


server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})