require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();

// FIX CORS for mobile
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// FIX: correct API prefixes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// IMPORTANT: mobile requires root route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://SocialMediaApp_MERN:SocialMediaApp_MERN@cluster0.tlj9qks.mongodb.net/")
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  })
  .catch(err => console.error(err));
