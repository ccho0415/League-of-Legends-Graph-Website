// *********************************************************************************
// data-routes.js - a set of routes for queries into riot's api
// *********************************************************************************

// Dependencies
// =============================================================
var request = require('request');
var $ = require('jQuery');

// Routes
// =============================================================
module.exports = function(app) {

  // POST route for getting searching summoner by name
  app.post("/data/sumname/:summoner", function(req, res) {
  	var name = req.params.summoner
  	var url = "https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/"+name+"?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
  	request(url, function(error, response, body){
  		console.log("=====================================================================================");  		
  		console.log("Err : "+error);
  		console.log("=====================================================================================");
  		console.log("Res : "+response &&response.statusCode);
  		console.log("=====================================================================================");  		
  		console.log("Body : "+body);
   		console.log("====================================================================================="); 		
  		if (error){
  			error = "Query failed";
   			res.send(error); 			
  		} else if (response.statusCode == 404){
 			error = "Not a summoner";
  			res.send(error);  		
  		} else{
  			info = JSON.parse(body);
  			console.log(info[name].id);
  			console.log(info[name].profileIconId);
  			console.log(info[name].name);  			  			
  		}

  	});
      // $.ajax({
      //     url: "https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/"+req.params.summoner+"?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
      //     method: "GET"
      // }).done(function(data){
      //     console.log(data);
      //     $.each(data, function(){
      //       console.log(this)
      //       $("#result").append(
      //       "<h3>"+this.name+"</h3><br>"+
      //       "<span>"+this.id+"</span><br>"+
      //      "<img src = 'http://ddragon.leagueoflegends.com/cdn/7.6.1/img/profileicon/"+this.profileIconId+".png'>" )            
      //         $.ajax({
      //           url: "https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/"+this.id+"/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
      //           method: "GET"
      //         }).done(function(data){
      //           console.log(data)
      //           $.each(data, function(){
      //             $.each(this, function(){
      //                   // Match Duration Code
      //                   // $.ajax({
      //                   //   url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/"+this.gameId+"?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
      //                   //   method: "GET"
      //                   // }).done(function(data){
      //                   //   $("#data").append("<span>"+data.matchDuration+"</span> <br>")
      //                   // })
      //               if(this.gameMode == "CLASSIC" && this.gameType =="MATCHED_GAME"){
      //                 $("#data").append("<span>"+ this.gameMode +" </span>");
      //                 $("#data").append("<span>"+ this.subType+ " </span>");
      //                 let stat = this.stats
      //                 $("#data").append("<span> Win: "+ stat.win+"</span>")
      //                 $("#data").append("<span> KDA: "+stat.championsKilled+"/"+stat.numDeaths+"/"+stat.assists+"</button>");         
      //                 $("#data").append("<span> Gold: "+stat.goldEarned+" k</span>");
      //                 $("#data").append("<span> Minions: "+stat.minionsKilled+"</span>");
      //                 $("#data").append("<button data-champid = "+this.championId+" data-matchid="+this.gameId+" class='detail'>Details</button><br>")
      //               }else{
      //                 $("#data").append("NOT SR CANT ANALAYZE <br>")
      //               }
      //             });
      //           });                
      //         })
      //       })        
      //   }).fail(function(){
      //     alert("Could not find summoner "+ summoner);
      //   });   	
  });

  // POST route for saving a new todo. We can create a todo using the data on req.body
  app.post("/api/todos", function(req, res) {

  });

  // DELETE route for deleting todos. We can access the ID of the todo to delete in
  // req.params.id
  app.delete("/api/todos/:id", function(req, res) {

  });

  // PUT route for updating todos. We can access the updated todo in req.body
  app.put("/api/todos", function(req, res) {

  });
};