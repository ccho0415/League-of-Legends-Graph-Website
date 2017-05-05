var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var RuneSchema = new Schema({
  version: {
    type: String
  },
  id: {
    type: Number
  },
  name: {
    type: String
  },
  stats: {},
  description : {
    type: String
  }
}, {strict: false});


var Rune = mongoose.model("Rune", RuneSchema);

// Export the model so the server can use it
module.exports = Rune;
