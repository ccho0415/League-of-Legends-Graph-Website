// Require our models
var Champion = require("../models/champion.js");
module.exports = {
	find: function(params, callback){
		Champion.find(params, function(err, champions){
			if (err){
				callback(err, null)
				return
			}
			callback(null, champions)
		})
	},
	findById: function(id, callback){
		Champion.findOne({"id": id}, function(err, champion){
			if(err){
				callback(err, null)
				return
			}
			callback(null, champion)
		})
	},
	findByName: function(name, callback){
		Champion.findOne({"champName": name}, function(err, champion){
			if(err){
				callback(err, null)
				return
			}
			callback(null, champion)
		})
	},	
	create: function(obj, callback){
		Champion.create(obj, function(err, champion){
			if(err){
				callback(err, null)
				return
			}
			callback(null, champion)
		})
	}
}