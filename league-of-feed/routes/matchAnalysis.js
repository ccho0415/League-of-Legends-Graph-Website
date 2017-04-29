// *********************************************************************************
// admin-routes.js - a set of routes for queries into the server
// *********************************************************************************

// Dependencies
// =============================================================
var controllers = require("../controllers")
var match = require("../controllers/MatchController.js")
var path = require("path");
module.exports = function(app) {
	app.get("/admin", function(req,res){
		res.sendFile(path.join(__dirname, "../public/admin.html"))
	});
	app.post("/matchAnalysis/:id",function(req,res, result){
		var id = req.params.id
		match.findById(id, function(err, results){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
			})
			return
			}
			res.send("/matchAnalysis/"+id)
		})

	})
	app.get("/matchAnalysis/:id", function(req, res, result){
		var id = req.params.id
		match.findById(id, function(err, results){
			if(err){
				res.json({
					confirmation: 'fail',
					message: err
			})
			return
			}
			res.render('match', {id: id})	
		})
	});		
}