// Require our models
var Mastery = require("../models/mastery.js");
module.exports = {
	find: function(params, callback){
		Mastery.find(params, function(err, masteries){
			if (err){
				callback(err, null)
				return
			}
			callback(null, masteries)
		})
	},
	findById: function(id, callback){
		Mastery.findOne({"id": id}, function(err, mastery){
			if(err){
				callback(err, null)
				return
			}
			callback(null, mastery)
		})
	},
	create: function(obj, callback){
		Mastery.create(obj, function(err, mastery){
			if(err){
				callback(err, null)
				return
			}
			callback(null, mastery)
		})
	}
}