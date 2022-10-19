const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
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
  console.log(con.connections);
  console.log('DB connection established!');
})
.catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})