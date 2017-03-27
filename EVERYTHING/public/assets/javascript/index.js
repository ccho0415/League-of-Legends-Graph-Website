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
      $.ajax({
          url: "https://na.api.riotgames.com/api/lol/NA/v1.4/summoner/by-name/"+summoner+"?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
          method: "GET"
      }).done(function(data){
          console.log(data);
          $.each(data, function(){
            console.log(this)
            $("#result").append(
            "<h3>"+this.name+"</h3><br>"+
            "<span>"+this.id+"</span><br>"+
           "<img src = 'http://ddragon.leagueoflegends.com/cdn/7.6.1/img/profileicon/"+this.profileIconId+".png'>" )            
              $.ajax({
                url: "https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/"+this.id+"/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
                method: "GET"
              }).done(function(data){
                console.log(data)
                $.each(data, function(){
                  $.each(this, function(){
                        // Match Duration Code
                        // $.ajax({
                        //   url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/"+this.gameId+"?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
                        //   method: "GET"
                        // }).done(function(data){
                        //   $("#data").append("<span>"+data.matchDuration+"</span> <br>")
                        // })
                    if(this.gameMode == "CLASSIC" && this.gameType =="MATCHED_GAME"){
                      $("#data").append("<span>"+ this.gameMode +" </span>");
                      $("#data").append("<span>"+ this.subType+ " </span>");
                      let stat = this.stats
                      $("#data").append("<span> Win: "+ stat.win+"</span>")
                      $("#data").append("<span> KDA: "+stat.championsKilled+"/"+stat.numDeaths+"/"+stat.assists+"</button>");         
                      $("#data").append("<span> Gold: "+stat.goldEarned+" k</span>");
                      $("#data").append("<span> Minions: "+stat.minionsKilled+"</span>");
                      $("#data").append("<button data-champid = "+this.championId+" data-matchid="+this.gameId+" class='detail'>Details</button><br>")
                    }else{
                      $("#data").append("NOT SR CANT ANALAYZE <br>")
                    }
                  });
                });                
              })
            })        
        }).fail(function(){
          alert("Could not find summoner "+ summoner);
        });      
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