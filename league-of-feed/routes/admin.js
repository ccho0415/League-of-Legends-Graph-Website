// *********************************************************************************
// admin-routes.js - a set of routes for queries into the server
// *********************************************************************************

// Dependencies
// =============================================================
var controllers = require("../controllers")
var champion = require("../controllers/ChampionController.js")
var match = require("../controllers/MatchController.js")
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
		var foo = req.body
		console.log('////////////////FOOOOOOOOOOOO/////////////////////')
		console.log(foo)
		console.log('////////////////ENDFOOOOOOOOOOOO/////////////////////')		
		match.create(foo, function(err, result){
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