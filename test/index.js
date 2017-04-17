$("body").on("click", ".ahri", timeModal)

function timeModal() {
	console.log("I am ahri!")
	var children = $(this).children()[1];
	var state = $(children).attr("data-role")	
	if (state == "hidden"){
		$(children).attr("data-role", "graph");
	}else{
		$(children).attr("data-role", "hidden")
	}

}
// Time Function
function timeconvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
var parts = []
function particpiantObj(partid, champ, lane, role, team){
	this.partid= partid;
	this.champ= champ;
	this.lane= lane;
	this.role= role;
	this.team= team;
	// this.user= user;
}
// Match Data Call Start =========================================================================
$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2471298550?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
	console.log(results)
// Roles and Champ Start ====================================================================================
let summonerarr=  results.participants

for (i=0; i<summonerarr.length; i++){
	let id = summonerarr[i].participantId
	let champ = summonerarr[i].championId
	let lane = summonerarr[i].timeline.lane
	let role = summonerarr[i].timeline.role
	let team = summonerarr[i].teamId
	var currentpart = new particpiantObj(id, champ, lane, role, team);
	parts.push(currentpart);
}
console.log(parts)
// Roles and Champ End ===================================================================================
// console.log(parts)
// Champion Img Url Start===============================================================================================
$.ajax({
  url: "https://na1.api.riotgames.com/lol/static-data/v3/champions?champData=all&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(result) {
 champobj = result.keys
for(i=0; i< parts.length; i++){
	let index = parseInt(parts[i].champ)
	// console.log(index)
	// console.log("Champ Id:"+index+ " Champ Name: "+champobj[index])
	parts[i].champname = champobj[index]
	let imgname = champobj[index].split(' ').join('');
	console.log(imgname)
	parts[i].imgurl = "http://ddragon.leagueoflegends.com/cdn/7.7.1/img/champion/"+imgname+".png";
	console.log(parts[i])
}
// Graph 2 
for(i=0; i<parts.length; i++){
	let particpiantId = parts[i].partid
	let champname = parts[i].champname
	let imgurl = parts[i].imgurl
	let lane = parts[i].lane
	let role = parts[i].role
	let team = parts[i].team

	if(team == 100 && lane == "TOP"){
		$("#t1top").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 100 && lane == "JUNGLE"){
		$("#t1jung").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 100 && lane == "MIDDLE"){
		$("#t1mid").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 100 && lane == "BOTTOM" && role == "DUO_CARRY"){
		$("#t1bot").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 100 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
		$("#t1sup").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 200 && lane == "TOP"){
		$("#t2top").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 200 && lane == "JUNGLE"){
		$("#t2jung").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 200 && lane == "MIDDLE"){
		$("#t2mid").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 200 && lane == "BOTTOM" && role == "DUO_CARRY"){
		$("#t2bot").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if (team == 200 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
		$("#t2sup").append(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}

}
// Graph 1
// Use this image for data points for now http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305
const allframes = results.timeline.frames
let champimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
let creatorimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
let killerimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
let victimimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
// console.log(parts[0].imgurl)
for(i=1; i<allframes.length; i++){
	events = allframes[i].events
	events.forEach(function(element){
		eventType = element.eventType
		timestamp = timeconvert(element.timestamp)
		item = element.itemId
		itemb4= element.itemBefore
		itema4= element.itemAfter
		partId = element.participantId
		skill = element.skillSlot
		levelType = element.levelUpType
		ward = element.wardType
		creatorId = element.creatorId
		killer = element.killerId
		monType = element.monsterType
		monSub = element.monsterSubType
		laneType = element.laneType
		buildingType = element.buildingType
		team = element.teamId
		towerType = element.towerType
		var assists;
			if(element.assistingParticipantIds){
				assists = element.assistingParticipantIds
			}else{
   				assists = "Nobody, Forever Alone"
			}
		position = JSON.stringify(element.position, null, 2)
		victim = element.victimId
		switch(partId){
			case 1: 
			  champimg = parts[0].imgurl;
			  break;
			case 2: 
			  champimg = parts[1].imgurl;
			  break;
			case 3: 
			  champimg = parts[2].imgurl;
			  break;
			case 4: 
			  champimg = parts[3].imgurl;
			  break;
			case 5: 
			  champimg = parts[4].imgurl;
			  break;
			case 6: 
			  champimg = parts[5].imgurl;
			  break;
			case 7: 
			  champimg = parts[6].imgurl;
			  break;
			case 8: 
			  champimg = parts[7].imgurl;
			  break;
			case 9: 
			  champimg = parts[8].imgurl;
			  break;
			case 10: 
			  champimg = parts[9].imgurl;
			  break;
			default:
			  champimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(creatorId){
			case 1: 
			  creatorimg = parts[0].imgurl;
			  break;
			case 2: 
			  creatorimg = parts[1].imgurl;
			  break;
			case 3: 
			  creatorimg = parts[2].imgurl;
			  break;
			case 4: 
			  creatorimg = parts[3].imgurl;
			  break;
			case 5: 
			  creatorimg = parts[4].imgurl;
			  break;
			case 6: 
			  creatorimg = parts[5].imgurl;
			  break;
			case 7: 
			  creatorimg = parts[6].imgurl;
			  break;
			case 8: 
			  creatorimg = parts[7].imgurl;
			  break;
			case 9: 
			  creatorimg = parts[8].imgurl;
			  break;
			case 10: 
			  creatorimg = parts[9].imgurl;
			  break;
			default:
			  creatorimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(killer){
			case 0:
			  killerimg = "https://i.ytimg.com/vi/3MpdGYdEjng/hqdefault.jpg";
			  break;
			case 1: 
			  killerimg = parts[0].imgurl;
			  break;
			case 2: 
			  killerimg = parts[1].imgurl;
			  break;
			case 3: 
			  killerimg = parts[2].imgurl;
			  break;
			case 4: 
			  killerimg = parts[3].imgurl;
			  break;
			case 5: 
			  killerimg = parts[4].imgurl;
			  break;
			case 6: 
			  killerimg = parts[5].imgurl;
			  break;
			case 7: 
			  killerimg = parts[6].imgurl;
			  break;
			case 8: 
			  killerimg = parts[7].imgurl;
			  break;
			case 9: 
			  killerimg = parts[8].imgurl;
			  break;
			case 10: 
			  killerimg = parts[9].imgurl;
			  break;
			default:
			  killerimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(victim){
			case 1: 
			  victimimg = parts[0].imgurl;
			  break;
			case 2: 
			  victimimg = parts[1].imgurl;
			  break;
			case 3: 
			  victimimg = parts[2].imgurl;
			  break;
			case 4: 
			  victimimg = parts[3].imgurl;
			  break;
			case 5: 
			  victimimg = parts[4].imgurl;
			  break;
			case 6: 
			  victimimg = parts[5].imgurl;
			  break;
			case 7: 
			  victimimg = parts[6].imgurl;
			  break;
			case 8: 
			  victimimg = parts[7].imgurl;
			  break;
			case 9: 
			  victimimg = parts[8].imgurl;
			  break;
			case 10: 
			  victimimg = parts[9].imgurl;
			  break;
			default:
			  victimimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
			if(eventType == "CHAMPION_KILL"){
				var graphdiv = $("<ul class = 'ahri'>"+
				"<img  height= 150px; width= auto src='http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305'>"+
				"<div data-role = 'hidden' class = 'eventframe kill col-md-3'>"+
					"<ul>"+eventType+"</ul>"+
					"<ul> Time: "+timestamp+"</ul>"+			
					"<ul> Killer: "+killer+"</ul><img src = "+killerimg+"> "+
					"<ul> Assistants: "+assists+"</ul>"+			
					"<ul> Position : "+position+"</ul>"+
					"<ul> Victim: "+victim+"</ul><img src = "+victimimg+">"+
				"</div></ul>")
			$("#eventgraph").append(graphdiv)			
			}
			if(eventType == "ELITE_MONSTER_KILL"){	
				var graphdiv = $("<ul class = 'ahri'>"+
				"<img height= 150px; width= auto src='http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305'>"+
				"<div data-role = 'hidden' class = 'eventframe kill col-md-3'>"+
					"<ul>"+eventType+"</ul>"+
					"<ul> Time: "+timestamp+"</ul>"+			
					"<ul> Killer: "+killer+"</ul><img src = "+killerimg+">"+
					"<ul> Monster Type :"+monType+"</ul>"+
					"<ul> Monster Sub Type :"+monSub+"</ul>"+			
					"<ul> Position : "+position+"</ul>"+
				"</div></ul>")	
			$("#eventgraph").append(graphdiv)			
			}
			if(eventType == "BUILDING_KILL"){
				var graphdiv = $("<ul class = 'ahri'>"+
			"<img  height= 150px; width= auto src='http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305'>"+
			"<div data-role = 'hidden' class = 'eventframe kill col-md-3'>"+
				"<ul>"+eventType+"</ul>"+
				"<ul> Time: "+timestamp+"</ul>"+			
				"<ul> Killer: "+killer+"</ul> <img src = "+killerimg+">"+
				"<ul> Assistants: "+assists+"</ul>"+			
				"<ul> Lane Type :"+laneType+"</ul>"+
				"<ul> Tower Type :"+towerType+"</ul>"+			
				"<ul> Building Type :"+buildingType+"</ul>"+			
				"<ul> Belongs To :"+team+"</ul>"+			
				"<ul> Position : "+position+"</ul>"+
				"</div></ul>")			
			$("#eventgraph").append(graphdiv)			
			}					
	});
}
// Frames Events  and Participants Start ====================================================================================
// const allframes = results.timeline.frames
// let champimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
// let creatorimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
// let killerimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
// let victimimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
// console.log(parts[0].imgurl)
for(i=1; i<allframes.length; i++){
	events = allframes[i].events
	events.forEach(function(element){
		eventType = element.eventType
		timestamp = timeconvert(element.timestamp)
		item = element.itemId
		itemb4= element.itemBefore
		itema4= element.itemAfter
		partId = element.participantId
		skill = element.skillSlot
		levelType = element.levelUpType
		ward = element.wardType
		creatorId = element.creatorId
		killer = element.killerId
		monType = element.monsterType
		monSub = element.monsterSubType
		laneType = element.laneType
		buildingType = element.buildingType
		team = element.teamId
		towerType = element.towerType
		var assists;
			if(element.assistingParticipantIds){
				assists = element.assistingParticipantIds
			}else{
   				assists = "Nobody, Forever Alone"
			}
		position = JSON.stringify(element.position, null, 2)
		victim = element.victimId
		switch(partId){
			case 1: 
			  champimg = parts[0].imgurl;
			  break;
			case 2: 
			  champimg = parts[1].imgurl;
			  break;
			case 3: 
			  champimg = parts[2].imgurl;
			  break;
			case 4: 
			  champimg = parts[3].imgurl;
			  break;
			case 5: 
			  champimg = parts[4].imgurl;
			  break;
			case 6: 
			  champimg = parts[5].imgurl;
			  break;
			case 7: 
			  champimg = parts[6].imgurl;
			  break;
			case 8: 
			  champimg = parts[7].imgurl;
			  break;
			case 9: 
			  champimg = parts[8].imgurl;
			  break;
			case 10: 
			  champimg = parts[9].imgurl;
			  break;
			default:
			  champimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(creatorId){
			case 1: 
			  creatorimg = parts[0].imgurl;
			  break;
			case 2: 
			  creatorimg = parts[1].imgurl;
			  break;
			case 3: 
			  creatorimg = parts[2].imgurl;
			  break;
			case 4: 
			  creatorimg = parts[3].imgurl;
			  break;
			case 5: 
			  creatorimg = parts[4].imgurl;
			  break;
			case 6: 
			  creatorimg = parts[5].imgurl;
			  break;
			case 7: 
			  creatorimg = parts[6].imgurl;
			  break;
			case 8: 
			  creatorimg = parts[7].imgurl;
			  break;
			case 9: 
			  creatorimg = parts[8].imgurl;
			  break;
			case 10: 
			  creatorimg = parts[9].imgurl;
			  break;
			default:
			  creatorimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(killer){
			case 0:
			  killerimg = "https://i.ytimg.com/vi/3MpdGYdEjng/hqdefault.jpg";
			  break;
			case 1: 
			  killerimg = parts[0].imgurl;
			  break;
			case 2: 
			  killerimg = parts[1].imgurl;
			  break;
			case 3: 
			  killerimg = parts[2].imgurl;
			  break;
			case 4: 
			  killerimg = parts[3].imgurl;
			  break;
			case 5: 
			  killerimg = parts[4].imgurl;
			  break;
			case 6: 
			  killerimg = parts[5].imgurl;
			  break;
			case 7: 
			  killerimg = parts[6].imgurl;
			  break;
			case 8: 
			  killerimg = parts[7].imgurl;
			  break;
			case 9: 
			  killerimg = parts[8].imgurl;
			  break;
			case 10: 
			  killerimg = parts[9].imgurl;
			  break;
			default:
			  killerimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		switch(victim){
			case 1: 
			  victimimg = parts[0].imgurl;
			  break;
			case 2: 
			  victimimg = parts[1].imgurl;
			  break;
			case 3: 
			  victimimg = parts[2].imgurl;
			  break;
			case 4: 
			  victimimg = parts[3].imgurl;
			  break;
			case 5: 
			  victimimg = parts[4].imgurl;
			  break;
			case 6: 
			  victimimg = parts[5].imgurl;
			  break;
			case 7: 
			  victimimg = parts[6].imgurl;
			  break;
			case 8: 
			  victimimg = parts[7].imgurl;
			  break;
			case 9: 
			  victimimg = parts[8].imgurl;
			  break;
			case 10: 
			  victimimg = parts[9].imgurl;
			  break;
			default:
			  victimimg = "http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"			  			  			  			  
		}
		if(partId == 0){
			// console.log("MINIONS")
			// console.log(element)
		}
		else{

			// This can probably written as cases 
			if (eventType == "ITEM_PURCHASED") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
			"<ul> Participant : "+partId+"</ul><img src = "+champimg+"></div>");		
			}
			if (eventType == "ITEM_DESTROYED") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
			"<ul> Participant : "+partId+"</ul><img src = "+champimg+"></div>");		
			}		
			if(eventType == "SKILL_LEVEL_UP"){
			$("#edit").append("<div class = 'eventframe skill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul>"+skill+"</ul>"+
			"<ul>"+levelType+"</ul>"+
			"<ul> Participant : "+partId+"</ul><img src = "+champimg+"></div>");		
			}
			if (eventType == "WARD_PLACED"){
			$("#edit").append("<div class = 'eventframe ward col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul>"+ward+"</ul>"+
			"<ul> Participant: "+creatorId+"</ul><img src = "+creatorimg+"></div>")
			}
			if(eventType =="CHAMPION_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul> <img src = "+killerimg+">"+
			"<ul> Assistants: "+assists+"</ul>"+			
			"<ul> Position : "+position+"</ul>"+
			"<ul> Victim: "+victim+"</ul><img src = "+victimimg+"></div>")			
			}
			if (eventType == "ITEM_UNDO") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"Item Before: <img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+itemb4+".png>"+
			"Item After: <img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+itema4+".png>"+			
			"<ul> Participant : "+partId+"</ul><img src = "+champimg+"></div>");		
			}
			if(eventType == "WARD_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul> <img src = "+killerimg+">"+
			"<ul> Ward Type: "+ward+"</ul></div>")			
			}
			if(eventType == "ELITE_MONSTER_KILL"){		
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul> <img src = "+killerimg+">"+
			"<ul> Monster Type :"+monType+"</ul>"+
			"<ul> Monster Sub Type :"+monSub+"</ul>"+			
			"<ul> Position : "+position+"</ul></div>")			
			}
			if(eventType =="BUILDING_KILL"){
			console.log(element)				
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul> <img src = "+killerimg+">"+
			"<ul> Assistants: "+assists+"</ul>"+			
			"<ul> Lane Type :"+laneType+"</ul>"+
			"<ul> Tower Type :"+towerType+"</ul>"+			
			"<ul> Building Type :"+buildingType+"</ul>"+			
			"<ul> Belongs To :"+team+"</ul>"+			
			"<ul> Position : "+position+"</ul></div>")			
			}
			if (eventType == "ITEM_SOLD") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"Item  : <img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+		
			"<ul> Participant : "+partId+"</ul><img src = "+champimg+"></div>");		
			}											
		}

	})
	partFrames = allframes[i].participantFrames
	// console.log(partFrames)

	$.each(partFrames, function(index, value) {
    let valueprint = JSON.stringify(value, null, 2)
    $("#edit").append("<li>"+valueprint+"</li>")
    // console.log(value.totalGold)
	}); 												
  $("#edit").append("<hr>")		
}
// Frames Events and Participants End =========================================================================

// Champion Img Url End=================================================================================
});

// Team Data Start =============================================================================================
// console.log(results.teams[0])
// console.log(results.teams[1])
// Team Data End ===================================================================================================

});

// Match Data Call End =========================================================================
