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
		console.log(info);
  		 console.log("=====================================================================================");
  //  		var data = {}
   		var index = [];
		function Gameobj (gameid, gamemode, subtype, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, invalid, duration, mastery, order) {
			this.gameid= gameid;
			this.gamemode= gamemode;
			this.subtype= subtype;
			this.win= win;
			this.kills= kills;
			this.deaths= deaths;
			this.assists= assists;
			this.gold= gold;
			this.minions = minions;
			this.champ= champ;	
      this.spell1 = spell1;
      this.spell2 = spell2;
      this.duration = duration;
      this.mastery = mastery;	
      this.order = order
		}   			
		for(i=0; i<info.games.length; i++){
			var gameid =info.games[i].gameId
			var stats = info.games[i].stats
			var gamemode = info.games[i].gameMode
			var subtype = info.games[i].subType
      var kills;
      var assists;
      var deaths;
      if (stats.championsKilled == undefined){
        var kills = 0;
      }else{
        var kills = stats.championsKilled        
      }
      if(stats.assists == undefined){
        var assists = 0;
      }else{
        var assists = stats.assists
      }
      if(stats.numDeaths == undefined){
        var deaths = 0;
      }else{
        var deaths = stats.numDeaths
      }
      var duration = 0;
      var mastery = 0;
      console.log(stats)
			var currentgame = new Gameobj(gameid, gamemode, subtype, stats.win, kills, deaths, assists, stats.goldEarned, stats.minionsKilled, info.games[i].championId, info.games[i].spell1, info.games[i].spell2, info.games[i].invalid, duration, mastery, i)
			index.push(currentgame);											
		}
   		console.log("=====================================================================================");
   		res.json(index);

  	});
  });

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

//   // PUT route for updating todos. We can access the updated todo in req.body
//   app.post("/data/todos", function(req, res) {

//   });
};