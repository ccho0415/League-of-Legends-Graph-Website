// Test summoner ID : 20278955
$(document).ready(function(){
// Button Functions
  $("body").on("click", ".match-analysis", searchMatch); 
  $("#searchSumName").on("click", function(event){
      searchSummoner(event, recentGames)
  });
  // Time Conversion ==================================================================== 
  function timeconvertseconds(millis) {
    var minutes = Math.floor(millis / 60);
    var seconds = ((millis % 60) / 1).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }  
// Searching Summoner Name ========================================================================
  function searchSummoner(event, cb){
    summoner = $("#sname").val().trim();    
    event.preventDefault();   
    $("#result").empty();
    $("#data").empty();
    if (summoner == "") {
      alert("Please enter a summoner name");
      return false;
    }else{
      $.post("/data/sumname/"+summoner, function() {
        console.log("Searching for a summoner with the name of "+summoner);
      }).then(function(data){
        // console.log(data)
        if (data == "Not a summoner"){
          alert(summoner+" is not a summoner")
        }else{
          $("#result").append("<h3>"+data.name+"</h3><br>"+
          "<img src = 'http://ddragon.leagueoflegends.com/cdn/7.6.1/img/profileicon/"+data.icon+".png'>" )
          setTimeout(function(){cb(data.id, matchCall)}, 4000);
        }
      });
      }
  }
//Searching Recent Games ====================================================================== 
  function recentGames(id, cb){
    $.post("/data/recentgames/"+id, function(){
      console.log("Getting the match history")
    }).then(function(data){
      // console.log(data)
      data.forEach(function callback(value, index, data){
        let gameid = value.gameid;
        console.log(gameid);    
        setTimeout(function(){cb(data[index], createMatchObj)},4000)
      })               
    })
  }
//Searching Duration ==========================================================================
  function matchCall(data, cb){
    console.log(data.gameid)
    var duration = data.duration
    var mastery;
    // console.log(data);
    $.ajax({
      url: "/data/details/"+ data.gameid,
      method: "POST",
      async: false,
      complete: function(result){
        var result = result.responseJSON;
        cb(data, result, checkMatch)            
      },
      error: function(err){
        console.log(err);
      }
    });  
  }
// Constructor Function for Matches
  function matchObj(matchVersion, region, matchId, matchMode, matchType, matchDuration, queueType, mapId, season, participantIdentities, participants, teams, timeline, players , analysis){
    this.matchVersion = matchVersion;
    this.region = region;
    this.matchId = matchId;
    this.matchMode = matchMode;
    this.matchType = matchType;
    this.matchDuration = matchDuration;
    this.queueType = queueType;
    this.mapId = mapId;
    this.season = season;
    this.participantIdentities = participantIdentities;
    this.participants = participants;
    this.teams = teams;
    this.timeline  = timeline;
    this.players = players;
    this.analysis = analysis;
  }  
// Create the Constructor
  function createMatchObj(data, result, cb){
    // console.log(data)
    let players = data.players;
    let win = data.win;
    let kills = data.kills;
    let deaths = data.deaths;
    let assists = data.assists;
    let gold = data.gold;
    let minions = data.minions;
    // console.log(result)
    let champ = data.champ
    let spell1 = data.spell1
    let spell2 = data.spell2
    let matchDuration = timeconvertseconds(parseInt(result.matchDuration));
    // console.log(matchDuration);
    let matchId = result.matchId;
    let matchVersion = result.matchVersion;
    let matchMode = result.matchMode;
    let matchType = result.matchType;
    let queueType = result.queueType;
    let region = result.region;
    let mapId = result.mapId;
    let season = result.season;
    let teams = result.teams;
    let timeline = result.timeline;
    let participantIdentities = result.participantIdentities;
    let participants = result.participants;
    let analysis = "meow";                       
    var currentMatch = new matchObj(matchVersion, region, matchId, matchMode, matchType, matchDuration, queueType, mapId, season, participantIdentities, participants, teams, timeline, players, analysis );
    cb(currentMatch, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, postMatch, insertGame)
  }  
// Check if match is in the database
    function checkMatch(object, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, cb1, cb2){
      var gameMode;
      var subType;
      var duration;
      var matchId;
      matchid = object.matchId;
      champ = champ
      spell1 = spell1
      spell2 = spell2  
      win = win
      kills = kills
      deaths = deaths
      assists = assists
      gold = gold
      minions = minions
      $.get("/admin/match/id/"+matchid, function(){
        console.log("Checking for data");
      }).then(function(data){
        console.log(data)       
        if(data.results){
        let gameMode = data.results.object.matchMode
        let subType = data.results.object.matchType
        let duration = data.results.object.matchDuration
        let matchId = data.results.object.matchId
        cb2(gameMode, subType, win, kills, deaths, assists, gold, minions, duration, champ, spell1, spell2, matchId)   
        }else{
          cb1(object, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, insertGame)
        }
      })
    }
// Post matches into the database
    function postMatch(object, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, cb){
     console.log(minions)
      var gameMode;
      var subType;
      var duration;
      var matchId;
      matchid = object.matchId;
      champ = champ
      spell1 = spell1
      spell2 = spell2  
      win = win
      kills = kills
      deaths = deaths
      assists = assists
      gold = gold
      minions = minions            
      $.post("/admin/match", {object}, function(){
        console.log("Adding to server")
      }).then(function(data){
        console.log(data.results);
        console.log(data.results.object);
        console.log(data.results.object.analysis);
        let gameMode = data.results.object.matchMode
        let subType = data.results.object.matchType
        let duration = data.results.object.matchDuration
        let matchId = data.results.object.matchId
        cb(gameMode, subType, win, kills, deaths, assists, gold, minions, duration, champ, spell1, spell2, matchId)
      });
    }
  // Create the match history list 
  function insertGame(gameMode, subType, win, kills, deaths, assists, gold, minions, duration, champ, spell1, spell2, matchid){
    if (gameMode == "CLASSIC"){
      if (subType == "NORMAL" || subType == "RANKED_FLEX_SR" || subType =="RANKED_SOLO_5x5" || subType == "MATCHED_GAME"){
        $("#data").append("<span>"+ gameMode +" </span>");
        $("#data").append("<span>"+ subType+ " </span>");
        $("#data").append("<span> Win: "+win+" </span>");
        $("#data").append("<span> KDA : "+ kills + "/" + deaths + "/"+ assists + "</span>");
        $("#data").append("<span> Gold: "+ gold + " k <img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/gold.png'> </span>");
        $("#data").append("<span> Minions : "+ minions + "<img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png'> </span>");
        $("#data").append("<span> Game Duration : "+ duration+ " mins</span>");
        $("#data").append("<button data-champid="+champ+" data.matchid="+matchid+" class ='match-analysis'> Analyze </button> <br>")                        
      }else{
        console.log( "Cannot be analyzed");
      }
      }else{
        console.log( "Cannot be analyzed");                  
      }       
  }
  function searchMatch(event){
    event.preventDefault();
    var champid = $(this).attr("data-champid");
    var matchid = $(this).attr("data-matchid");
    console.log(matchid);
    $.ajax({
      url: "/data/details/"+ matchid,
      method: "GET"
    }).done(function(data){
      console.log(data);
    })
  }
});