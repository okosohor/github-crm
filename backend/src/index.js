const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {createDataBaseConection} = require('./config/db');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({status: 'OK'});
});

createDataBaseConection();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log('Current environment:', process.env.NODE_ENV);
});
