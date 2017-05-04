var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var MasterySchema = new Schema({
  version: {
    type: String
  },
  id: {
    type: Number
  },
  name: {
    type: String
  },
  ranks: {
    type: Number
  },
  description : []
}, {strict: false});


var Mastery = mongoose.model("Mastery", MasterySchema);

// Export the model so the server can use it
module.exports = Mastery;
