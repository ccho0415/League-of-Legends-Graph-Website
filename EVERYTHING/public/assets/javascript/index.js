// Test summoner ID : 20278955

$(document).ready(function(){

// Dependencies

// Button Functions
  $("body").on("click", ".detail", searchMatch); 
  $("#searchSumName").on("click", function(event){
      searchSummoner(event, recentGames)
  });

// Searching Summoner Name
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
        console.log(data)
          if (data == "Not a summoner"){
            alert(summoner+" is not a summoner")
          }else{
            $("#result").append("<h3>"+data.name+"</h3><br>"+
            "<img src = 'http://ddragon.leagueoflegends.com/cdn/7.6.1/img/profileicon/"+data.icon+".png'>" )

            cb(data.id, gameDuration);
          }
    });
        //============= 
      }
  }
  function recentGames(id, cb){
    $.post("/data/recentgames/"+id, function(){
      console.log("Getting the match history")
    }).then(function(data){
      console.log(data)
      data.forEach(function callback(value, index, data){
        let gameid = value.gameid;
        console.log(gameid);    
        setTimeout(function(){cb(data[index], insertGame)},4000)
      })        
       
    })
  }
  function gameDuration(data, cb){
    console.log(data.gameid)
    console.log(data.subtype)
    var duration = data.duration
    var mastery;
    console.log(data);
    $.ajax({
      url: "/data/gameduration/"+ data.gameid,
      method: "POST",
      async: false,
      complete: function(dat){
        var dat = dat.responseJSON;
        var duration = Math.floor(parseInt(dat)/ 60);
        console.log(duration);
        if(duration !==0){
          cb(data.gamemode, data.subtype, data.win, data.kills, data.deaths, data.assists, data.gold, data.minions, duration, data.champ, data.gameid)   
        }           
      },
      error: function(err){
        console.log(err);
      }
    });

   
  
  }
  function insertGame(gameMode, subType, wins, kills, deaths, assists, gold, minions, duration, champ, matchid){
    if (gameMode == "CLASSIC"){
      if (subType == "NORMAL" || subType == "RANKED_FLEX_SR" || subType =="RANKED_SOLO_5x5"){
        $("#data").append("<span>"+ gameMode +" </span>");
        $("#data").append("<span>"+ subType+ " </span>");
        $("#data").append("<span> Win: "+wins+" </span>");
        $("#data").append("<span> KDA : "+ kills + "/" + deaths + "/"+ assists + "</span>");
        $("#data").append("<span> Gold: "+ gold + " k <img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/gold.png'> </span>");
        $("#data").append("<span> Minions : "+ minions + "<img src = 'http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png'> </span>");
        $("#data").append("<span> Game Duration : "+ duration+ " mins</span>");
        $("#data").append("<button data-champid="+champ+" data.matchid="+matchid+"> Analyze </button> <br>")                        
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