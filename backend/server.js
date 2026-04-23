require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 STATIC FILES (IMPORTANT FOR PDF & IMAGES)
app.use('/uploads', express.static('uploads'));

// 🔥 ROUTES (THIS WAS MISSING ❌)
app.use('/auth', require('./routes/authRoutes'));
app.use('/admin', require('./routes/adminRoutes'));
app.use('/books', require('./routes/bookRoutes'));

// 🔥 TEST ROUTE
app.get('/test', (req, res) => {
  res.send("Server Working");
});

// 🔥 DATABASE
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// 🔥 START SERVER
app.listen(5000, () => {
  console.log("Server running on 5000");
});