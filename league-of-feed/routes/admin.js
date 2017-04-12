// *********************************************************************************
// admin-routes.js - a set of routes for queries into the server
// *********************************************************************************

// Dependencies
// =============================================================
var controllers = require("../controllers")
var path = require("path");
module.exports = function(app) {
	app.get("/admin", function(req,res){
		res.sendFile(path.join(__dirname, "../public/admin.html"))
	});

	app.post("/admin/:resource", function(req, res, result){
		var resource = req.params.resource
		var controller = controllers[resource]
	if (controller == null) {
		res.json({
			confirmation: 'Fail',
			message: 'Invalid Resource Request :  '+ resource
		})
		return
	}
	let allchamps = req.body
	for (var key in allchamps){
		var obj = allchamps[key]
		for (var item in obj){
			controller.create(obj[item], function(err, result){
				console.log(result)
			})
		
		}
	}

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