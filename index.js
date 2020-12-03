const express = require('express');
const passport = require('passport');
const app = express();
const port = 9000;
const db = require('./config/mongoose');
const passportGoogle = require('./config/passport-google-outh');

// For all the post requests
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', './view');

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// Entry point for all the routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log('Error in running the server');
    }
    console.log('Server is up and running');
})