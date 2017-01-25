// Test summoner ID : 20278955
$(document).ready(function(){
	$.ajax({
  		url: "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/20278955/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
  		method: "GET"
	}).done(function(data) {
   		console.log(data);
   		$.each(data, function(){
   			$.each(this, function(){
   				$("#data").append("<p>"+JSON.stringify(this, null, 2)+"</p>");
   			});
   		});
   		
	});
	$.ajax({
		url: "https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
		method: "GET"
	}).done(function(data){
		console.log(data);
	})
});
