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
        console.log("pinging the server")
      }).then(function(data){
      console.log(data) 
    });
        //============= 
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