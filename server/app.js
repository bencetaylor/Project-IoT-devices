const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({ path: './.env' });

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