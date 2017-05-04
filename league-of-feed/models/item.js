var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var ItemSchema = new Schema({
  version: {
    type: String
  },
  id: {
    type: Number
  },
  name: {
    type: String
  },
  stats: {
    type: String
  },
  plaintext : {
    type: String
  },
  description: {
  	type: String
  }
}, {strict: false});


var Item = mongoose.model("Item", ItemSchema);

// Export the model so the server can use it
module.exports = Item;
