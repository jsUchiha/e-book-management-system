require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static('uploads'));

app.get('/download/:file', (req, res) => {
  res.download('uploads/' + req.params.file);
});

// ✅ ONLY ONE DATABASE CONNECTION
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ROUTES
app.use('/auth', require('./routes/authRoutes'));
app.use('/books', require('./routes/bookRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

// SERVER START
app.listen(5000, () => {
  console.log('Server running on 5000');
});