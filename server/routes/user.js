var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var Item = require('../models/user.model').item;

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//sending data to the database
router.post('/', function (req, res){
  console.log('In post route');
  // var itemsDB = Item(req.body);

  // id: req.user._id
  var itemsDB = new Item({
    userId: req.user._id,
    description: req.body.description,
    img: req.body.img
  });

  console.log('this is req.body:', req.user, req.body);
  itemsDB.save().then(function(){
    res.sendStatus(200);
  });
});

router.get('/getItems', function(req, res){
  console.log('zzzzzzzzzxxxxxxxxxxaaaaaaaaaa');
  // server side is grabing items from the database with the .find
  Item.find().populate('userId').exec({}, function(err, results) {
    if(err){
      console.log(err);
      res.sendStatus(500);
    }
    else{
      console.log('successful get items ->', results);
      res.status(200).send(results);
    }
  });

});

module.exports = router;
