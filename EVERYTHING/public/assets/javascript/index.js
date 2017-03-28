// Test summoner ID : 20278955

$(document).ready(function(){

// Dependencies

// Button Functions
  $("body").on("click", ".detail", searchMatch); 
  $("#searchSumName").on("click", searchSummoner);
// Searching Summoner Name
  function searchSummoner(event){
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
        console.log(data)
          if (data == "Not a summoner"){
            alert(summoner+" is not a summoner")
          }else{
            $("#result").append("<h3>"+data.name+"</h3><br>"+
            "<img src = 'http://ddragon.leagueoflegends.com/cdn/7.6.1/img/profileicon/"+data.icon+".png'>" )
            recentGames(data.id);           
          }
    });
        //============= 
      }
  }
  function recentGames(id){
    $.post("/data/recentgames/"+id, function(){
      console.log("Getting the match history")
    }).then(function(data){
      console.log(data)
      data.forEach(function callback(value, index, data){
        let gameid = value.gameid;
        let gamemode= value.gamemode;
        let subtype = value.subtype;
        let win = value.win;
        let kills = value.kills;
        let deaths = value.deaths;
        let assists = value.assists;
        let gold = value.gold;
        let minions = value.minions;
        let champ = value.champ;
        console.log(gameid);
        setTimeout(function(){
          gameDuration(gameid, gamemode, subtype, win, kills, deaths, assists, gold, minions)
        }, 500);
      })        
       
    })
  }
  function gameDuration(gameid, gamemode, subtype, win, kills, deaths, assists, gold, minions){
    $.post("/data/gameduration/"+ gameid, function(){
      console.log("Searching for game duration of "+ gameid + " game");
    }).done(function(data){
      console.log(data);
      var duration = parseInt(data) / 60;
      console.log(duration)
      insertGame(gamemode,subtype, win, kills, deaths, assists, gold, minions, duration)
    }).catch(function(error){
      console.log(error);
     });
  }
  function insertGame(gameMode, subType, wins, kills, deaths, assists, gold, minions, duration){
    if (gameMode == "CLASSIC"){
      if (subType == "NORMAL" || subType == "RANKED_FLEX_SR" || subType =="RANKED_SOLO_5x5"){
        $("#data").append("<span>"+ gameMode +" </span>");
        $("#data").append("<span>"+ subType+ " </span>");
        $("#data").append("<span> Win: "+wins+" </span>");
        $("#data").append("<span> KDA : "+ kills + "/" + deaths + "/"+ assists + "</span>");
        $("#data").append("<span> Gold: "+ gold + " k <img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/gold.png'> </span>");
        $("#data").append("<span> Minions : "+ minions + "<img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png'> </span>");
        $("#data").append("<span> Game Duration : "+ duration+ "</span> <br>")                        
      }else{
        console.log( "Cannot be analyzed");
      }
      }else{
        console.log( "Cannot be analyzed");                  
      }       
  }
  function searchMatch(event){
    var champid = $.parseJSON($(this).attr("data-champid"));
    var matchid = $.parseJSON($(this).attr("data-matchid"))
    $.ajax({
      url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/"+matchid+"?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
      method: "GET"
    }).done(function(data){
      console.log(data);
      $.each(data, function(){
        $.each(this, function(){
          if (champid == this.championId){
            $("#match").append("<span>"+this.championId+" "+ this.participantId+" </span>")
          };
        })
      })
    })
  }
});