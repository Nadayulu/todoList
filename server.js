//BASE SETUP
var express = require('express'); //grab express dependencies
var app = express(); // app is using our express dependencies
var bodyParser = require('body-parser'); //so that we can use our bodyParser later

app.use(bodyParser.urlencoded({ extended: true})); //configures app to use the bodyparser so that we can get data from a POST
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');

var Bear = require('./app/models/bear');



//ROUTES FOR OUR API SET UP
var router = express.Router(); //get an instance of the express Router

router.use(function(req, res, next) {

    console.log('Something is Happening. Our router is being used!')
    next();
})

router.get('/', function(req, res) {
    res.json({message: 'hooray! welcome to our api!'}); //test routes to make sure our server is running from the main page
})





//REGISTERING OUR ROUTES
app.use('/api', router); // all of our routes will be prefixed with  /api

//START THE SERVER
//starting the server from bottom.
app.listen(port);
console.log('Magic happens on port ' + port);