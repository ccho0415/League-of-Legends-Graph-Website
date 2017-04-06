// Require mongoose
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;
// New Schema
var ChampionSchema = new Schema({
  // firstName: a trimmed, required string
  champName: {
    type: String,
    trim: true
  },
  armor: {
    type: Number
  },
  armorPer: {
    type: Number
  },
  ad: {
    type: Number
  },
  adPer: {
    type: Number
  },
  range: {
    type: Number
  },
  asOff: {
    type: Number
  },
  asPer: {
    type: Number
  },
  crit: {
    type: Number
  },
  critPer: {
    type: Number
  },
  hp: {
    type: Number
  },
  hpPer: {
    type: Number
  },
  hpReg: {
    type: Number
  },
  hpRegPer: {
    type: Number
  },
  mp: {
    type: Number
  },
  mpPer: {
    type: Number
  },
  mpReg: {
    type: Number
  },
  mpRegPer: {
    type: Number
  },
  spellblock: {
    type: Number
  },
  spellblockPer: {
    type: Number
  },
  Q: Schema.Types.Mixed,
  W: Schema.Types.Mixed,
  E: Schema.Types.Mixed,
  R: Schema.Types.Mixed   
});

var Champion = mongoose.model("Champion", ChampionSchema);

// Export the model so the server can use it
module.exports = Champion;
