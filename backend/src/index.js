const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { createDataBaseConection } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userProjectRoutes = require('./routes/userProjectRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/userProject', userProjectRoutes);

createDataBaseConection();

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
  console.log('Current environment:', process.env.NODE_ENV);
});
