// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Require our userModel model
var Champ = require("./champion.js");

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/league-of-feed");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// ======
app.post("/submit", function(req, res) {


	// Request. for each champ make an object with these infos. then make the mongoose call
  // console.log(req.body);
  var makechamp = new Champ(req.body);
  console.log(makechamp);
  // save a user to our mongoDB
  makechamp.save(function(error, doc) {
    // send an error to the browser
    if (error) {
      res.send(error);
    }
    // or send the doc to our browser
    else {
      res.send(doc);
    }
  });
});

// Listen on port 3000
app.listen(3015, function() {
  console.log("App running on port 3015!");
});
