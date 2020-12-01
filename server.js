const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const passport = require('passport');

// express init
const app = express();

// cofig
dotenv.config({path: './config/config.env'});

//passport config
require('./config/passport')(passport);

//connect DB
connectDB();

// body-parseer middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// morgan
app.use(morgan('dev'));

// passport config
app.use(passport.initialize());

// routes
app.use('/doctors', require('./routes/doctors'));
app.use('/patients', require('./routes/patients'));
app.use('/reports', require('./routes/reports'));


// PORT init
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server Running '+PORT));