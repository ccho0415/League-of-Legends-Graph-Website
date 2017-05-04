// Require our models
var Item = require("../models/item.js");
module.exports = {
	find: function(params, callback){
		Item.find(params, function(err, items){
			if (err){
				callback(err, null)
				return
			}
			callback(null, items)
		})
	},
	findById: function(id, callback){
		Item.findOne({"object.id": id}, function(err, item){
			if(err){
				callback(err, null)
				return
			}
			callback(null, item)
		})
	},
	create: function(obj, callback){
		Item.create(obj, function(err, item){
			if(err){
				callback(err, null)
				return
			}
			callback(null, item)
		})
	}
}