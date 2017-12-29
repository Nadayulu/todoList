//BASE SETUP
var express = require('express'); //grab express dependencies
var app = express(); // app is using our express dependencies
var bodyParser = require('body-parser'); //so that we can use our bodyParser later
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true})); //configures app to use the bodyparser so that we can get data from a POST
app.use(bodyParser.json());

var port = process.env.PORT || 8000;
var dbuser = process.env.DBUSERNAME;
console.log(dbuser);
var dbpw = process.env.DBPASSWORD;

var mongoose = require('mongoose');
mongoose.connect(`mongodb://localhost:27017/database`, function(err, db) {
    if( err ) {
        console.log("THIS IS DB ERR", err)
    }
});

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

router.route('/bears')
  .post(function(req, res) {
      var bear = new Bear();
      bear.name = req.body.name;
      bear.save(function(err) {
          if (err) {
              console.log('THIS IS ERR', err);
          }
          res.json({message: 'BEAR CREATED!'})
      })
  })
  .get(function(req, res) {
    Bear.find(function(err, bears) {
        if(err) {
            console.log("Couldnt find the bears..", err);
        }
        res.json(bears);
    })
  })

router.route('/bears/:bear_id')
  .get(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
          if (err) {
              res.send("That bear does not exist!", err)
          }
          res.json(bear);
      })
  })
  .put(function(req, res) {
      Bear.findById(req.params.bear_id, function(err, bear) {
          if(err) 
            res.send(err);
        
          bear.name = req.body.name;

          bear.save(function(err) {
              if(err)
                res.send("Couldnt update the Bear!", err);
            
              res.json({message: "Bear has been successfuly updated!"})
          })
      })
  })
  .delete(function(req, res) {
      Bear.remove({
          _id: req.params.bear_id
      }, function(err, bear) {
          if (err)
            res.send("coudlnt delete the bear", err)

          res.json({ message: "Deletion Complete!"});
      })
  })

//REGISTERING OUR ROUTES
app.use('/api', router); // all of our routes will be prefixed with  /api

//START THE SERVER
//starting the server from bottom.
app.listen(port);
console.log('Magic happens on port ' + port);