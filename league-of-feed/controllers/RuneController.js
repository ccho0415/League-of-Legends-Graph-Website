// Require our models
var Rune = require("../models/rune.js");
module.exports = {
	find: function(params, callback){
		Rune.find(params, function(err, runes){
			if (err){
				callback(err, null)
				return
			}
			callback(null, runes)
		})
	},
	findById: function(id, callback){
		Rune.findOne({"id": id}, function(err, rune){
			if(err){
				callback(err, null)
				return
			}
			callback(null, rune)
		})
	},
	create: function(obj, callback){
		Rune.create(obj, function(err, rune){
			if(err){
				callback(err, null)
				return
			}
			callback(null, rune)
		})
	}
}