// Require our models
var Match = require("../models/match.js");
module.exports = {
	find: function(params, callback){
		Match.find(params, function(err, matches){
			if (err){
				callback(err, null)
				return
			}
			callback(null, matches)
		})
	},
	findById: function(id, callback){
		Match.findOne({"object.matchId": id}, function(err, match){
			if(err){
				callback(err, null)
				return
			}
			callback(null, match)
		})
	},
	create: function(obj, callback){
	console.log("I AM GRABBING THIS")	
		console.log(obj)
	console.log("++++++++++++++++++++++++++++++++")
		Match.create(obj, function(err, match){
			if(err){
				callback(err, null)
				return
			}
			callback(null, match)
		})
	}
}