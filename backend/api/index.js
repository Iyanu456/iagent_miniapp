require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const walletRoutes = require('./routes/wallet_route');
const connectDB  = require('./utils/db.js');
const cors = require('cors');
//const mongoose = require('mongoose');


const app = express();


// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());
connectDB();

app.use(cors({

  origin: [ 
    'http://localhost:5173', 
    'https://iagent-miniapp-wps8.vercel.app'
    
    ],

  methods: [
    'GET', 
    'POST', 
    'PUT', 
    'DELETE', 
    'OPTIONS'
    ],

  allowedHeaders: [
  'Content-Type', 
  'Authorization'
  ],

}));


app.options('*', cors());  // Preflight request handling


app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
  });

  
app.use('/api', walletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
