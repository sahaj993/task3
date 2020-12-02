const express = require('express');
const app = express();
const port = 9000;

app.set('view engine', 'ejs');
app.set('views', './view');

// Entry point for all the routes
app.use('/', require('./routes'));

app.listen(port, function(err){
    if (err){
        console.log('Error in running the server');
    }
    console.log('Server is up and running');
})