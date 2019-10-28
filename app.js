var express = require('express');
var faucetController = require('./controllers/faucetController')
var app = express()


// set up template engine 
app.set('view engine', 'ejs');

// static files 
app.use(express.static('./public'))

// fire controllers 
faucetController(app);


//listen to port 
app.listen(3200)
console.log('Puerto 3200 en Localhost')