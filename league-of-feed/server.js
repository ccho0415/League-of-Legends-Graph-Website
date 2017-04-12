var express= require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var PORT = 3000;
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.json({limit: '10000mb'}));
app.use(bodyParser.urlencoded({ limit: '10000mb', parameterLimit: 10000000000,
  extended: true
}));
// Static Directory ===================================================
app.use(express.static("./public"));
// Database configuration with mongoose
mongoose.connect("mongodb://localhost/league-of-feed-dev");
var db = mongoose.connection;
var collection = "league-of-feed"
// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes =============================================================
require("./routes/index")(app);
require("./routes/admin")(app);
require("./routes/data")(app);


// 
app.listen(PORT, function() {
    console.log(`Listening on PORT:`+ PORT);
});