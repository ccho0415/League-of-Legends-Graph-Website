// *********************************************************************************
// admin-routes.js - a set of routes for queries into the server
// *********************************************************************************

// Dependencies
// =============================================================
var controllers = require("../controllers")
var champion = require("../controllers/ChampionController.js")
var match = require("../controllers/MatchController.js")
var mastery = require("../controllers/MasteryController.js")
var rune = require("../controllers/RuneController.js")
var item = require("../controllers/ItemController.js")
var path = require("path");
module.exports = function(app) {
	app.get("/admin", function(req,res){
		res.sendFile(path.join(__dirname, "../public/admin.html"))
	});

	app.post("/admin/champion", function(req, res, result){
	let allchamps = req.body
	for (var key in allchamps){
		var obj = allchamps[key]
		for (var item in obj){
			champion.create(obj[item], function(err, result){
				console.log(result)
			})
		
		}
	}

	});
	app.post("/admin/match", function(req, res, result){
		console.log(req)
		match.create(gamedata, function(err, result){
			if(err){
				console.log(err)
			}
			res.json({
				confirmation: 'success',
				results: result});
			return
			var foo = "";
		})
	});
	app.post("/admin/mastery", function(req, res, result){
		var masterydata = req.body
		console.log(masterydata)
		for(var key in masterydata){
			var obj = masterydata[key]
			for(var item in obj){
			mastery.create(obj[item], function(err, result){
				console.log(result)
			})
			}
		}

	})
	app.post("/admin/rune", function(req, res, result){
		var runedata = req.body
		console.log(runedata)
		for(var key in runedata){
			var obj = runedata[key]
			for(var item in obj){
				rune.create(obj[item], function(err, result){
					console.log(result)
				})
			}
		}
	})
	app.post("/admin/item", function(req,res, result){
		var itemdata = req.body
		for(var key in itemdata){
			var obj = itemdata[key]
			for (var part in obj){
			item.create(obj[part], function(err, result){
				console.log(result)
			})

			}		
		}
	})

	app.get("/admin/:resource/", function(req, res, result){
		var resource = req.params.resource
		var controller = controllers[resource]
		if(controller == null){
			res.json({
				confirmation: "Fail",
				message: "Invalid Resource Request : " + resource
			})
			return
		}
		controller.find(req.query, function(err, results){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
			})
			return
			}
			res.json({
				confirmation: 'success',
				results: results
			})		
		})
	});
	app.get("/admin/:resource/id/:id", function(req, res, result){
		var resource = req.params.resource
		var controller = controllers[resource]
		var id = req.params.id
		if(controller == null){
			res.json({
				confirmation: "Fail",
				message: "Invalid Resource Request : " + resource
			})
			return
		}
		controller.findById(id, function(err, results){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
			})
			return
			}
			res.json({
				confirmation: 'success',
				results: results
			})		
		})
	});	
	app.get("/admin/:resource/name/:name", function(req, res, result){
		var resource = req.params.resource
		var controller = controllers[resource]
		var name = req.params.name
		if(controller == null){
			res.json({
				confirmation: "Fail",
				message: "Invalid Resource Request : " + resource
			})
			return
		}
		controller.findByName(name, function(err, results){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
			})
			return
			}
			res.json({
				confirmation: 'success',
				results: results
			})		
		})
	});	
}