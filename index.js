const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys'); 
mongoose.connect(keys.mongoURI);

const app = express();
require('./services/passport');
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`You are listening at ${PORT}`));

