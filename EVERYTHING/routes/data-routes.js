// *********************************************************************************
// data-routes.js - a set of routes for queries into riot's api
// *********************************************************************************

// Dependencies
// =============================================================
var request = require('request');
var $ = require('jQuery');
var Promise = require("bluebird");
// Routes
// =============================================================
module.exports = function(app) {

  // POST route for getting searching summoner by name
  app.post("/data/sumname/:summoner", function(req, res) {
  	var name = req.params.summoner
  	var name = name.split(' ').join('');
  	var url = "https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/"+name+"?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
  	request(url, function(error, response, body){
  		// Check what type of response is received
  		// console.log("=====================================================================================");  		
  		// console.log("Err : "+error);
  		// console.log("=====================================================================================");
  		// console.log("Res : "+response &&response.statusCode);
  		// console.log("=====================================================================================");  		
  		// console.log("Body : "+body);
   	// 	console.log("====================================================================================="); 		
  		if (error){
  			error = "Query failed";
   			res.send(error); 			
  		} else if (response.statusCode == 404){
 			error = "Not a summoner";
  			res.send(error);  		
  		} else{
  			info = JSON.parse(body);
   			console.log("=====================================================================================");  			
  			console.log("Summoner Id : "+info[name].id);
  			console.log("Profile Icon : "+info[name].profileIconId);
  			console.log("Summoner Name : "+info[name].name);
  		   	console.log("=====================================================================================");  	
  		  	var summoner = {
  		  			name: info[name].name,
  		  			icon: info[name].profileIconId,
  		  			id: info[name].id
  		  		}
  		  	res.json(summoner)			  			  			
  		}

  	}); 	
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/data/recentgames/:id", function(req, res) {
  	var sumId = req.params.id
  	var url = "https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/"+sumId+"/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
  	request(url, function(error,response, body){
  		// Check What Type of info is received
  		// console.log("=====================================================================================");  		
  		// console.log("Err : "+error);
  		// console.log("=====================================================================================");
  		// console.log("Res : "+response &&response.statusCode);
  		// console.log("=====================================================================================");  		
  		// console.log("Body : "+body);
   		// console.log("=====================================================================================");
		var info = JSON.parse(body);
		// Pretty Print for body
		// console.log(info);
  		//  console.log("=====================================================================================");
   		var gameIdArr = [];
   		var gameModeArr = [];
   		var subtypeArr = [];
   		var winArr = [];
   		var killsArr = [];
   		var deathsArr = [];
   		var assistsArr = [];
   		var goldArr = [];
   		var minionsArr = [];
   		var champsArr = [];		
		for(i=0; i<info.games.length; i++){
			var gameid =info.games[i].gameId
			var stats = info.games[i].stats
			var gamemode = info.games[i].gameMode
			var subtype = info.games[i].subType
			gameIdArr.push(gameid);
			gameModeArr.push(gamemode);
			subtypeArr.push(subtype);
			winArr.push(stats.win);
			killsArr.push(stats.championsKilled);
			deathsArr.push(stats.numDeaths);
			assistsArr.push(stats.assists);
			goldArr.push(stats.goldEarned);
			minionsArr.push(stats.minionsKilled);
			champsArr.push(info.games[i].championId);												
		}
   		console.log("=====================================================================================");
   		var games = {
   			gameids: gameIdArr,
   			gamemodes: gameModeArr,
   			subtypes: subtypeArr,
   			wins: winArr,
   			kills: killsArr,
   			deaths: deathsArr,
   			assists: assistsArr,
   			gold: goldArr,
   			minions: minionsArr,
   			champs: champsArr	   			
   		}
   		console.log(games);
   		res.json(games);

  	});
  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.post("/data/gameduration/:id", function(req, res) {
  	var gameid = req.params.id
  	var url = "https://na.api.riotgames.com/api/lol/NA/v2.2/match/"+gameid+"?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
  	request(url, function(error, response, body){
  		var info = JSON.parse(body);
  	// Pretty Print Body
   	// 	console.log("=====================================================================================");  		
  		// console.log(info);
   	// 	console.log("=====================================================================================");
   		var duration = info.matchDuration;
   		res.json(duration);  		
  	})
  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.post("/api/todos", function(req, res) {

  });
};