require('dotenv').config();
const bodyParser = require('body-parser');
const passport = require('passport');
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const walletRoutes = require('./routes/wallet_route');
const connectDB  = require('./utils/db.js')
//const mongoose = require('mongoose');


const app = express();


// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

connectDB();

app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
  });

  
app.use('/api', walletRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
