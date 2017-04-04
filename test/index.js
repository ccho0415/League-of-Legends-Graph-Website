// Time Function
function timeconvert(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
// Time function Ends
// Static Data Call Start ===========================================================================
$.ajax({
  url: "https://global.api.riotgames.com/api/lol/static-data/NA/v1.2/champion?champData=all&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(result) {
// Champ Id to Name Section Start ==================================================================
const champobj = result.keys
const champarr = Object.entries(champobj)
for(i=0; i< champarr.length; i++){
	let champ = champarr[i]
	// console.log("Champ Id:"+champ[0]+ " Champ Name: "+champ[1])
}
// Champ Id to Name Section End ======================================================================

// Champ Stat  Section Start ======================================================================
const champstatobj = result.data
const champstatarr = Object.entries(champstatobj)
for (i=0; i<champstatarr.length; i++) {
	let champ = champstatarr[i]
	let champstat = champ[1].stats 
	// console.log("Champ Name: "+ champ[0])
	// console.log("Armor: "+champstat.armor);
	// console.log("Armor Per: "+champstat.armorperlevel);
	// console.log("AD: "+champstat.attackdamage);
	// console.log("AD: "+champstat.attackdamageperlevel);
	// console.log("Range: "+champstat.attackrange);
	// console.log("AS Offset: "+champstat.attackspeedoffset);
	// console.log("AS Per: "+champstat.attackspeedoffset);	
	// console.log("Crit: "+champstat.crit);
	// console.log("Crit Per: "+champstat.critperlevel);
	// console.log("HP: "+champstat.hp);
	// console.log("HP Per: "+champstat.hpperlevel);
	// console.log("HP Reg: "+champstat.hpregen);
	// console.log("HP Reg Per: "+champstat.hpregenperlevel);
	// console.log("Movespeed: "+champstat.movespeed);
	// console.log("MP: "+champstat.hpregenperlevel);
	// console.log("MP Per: "+champstat.mpperlevel);
	// console.log("MP Regen: "+champstat.mpregen);
	// console.log("MP Regen Per: "+champstat.mpregenperlevel);
	// console.log("Spellblock: "+champstat.spellblock);
	// console.log("Spellblock: "+champstat.spellblockperlevel);																														
}
// Champ Stat Section End
// Champ Spell Section Start ================================================================================
// const champstatobj = result.data
// const champstatarr = Object.entries(champstatobj)
// for (i=0; i < champstatarr.length; i++){
	let champ = champstatarr[0]
	let champspells = champ[1].spells
	// console.log("Champ Name: "+ champ[0])
 //    console.log("Q : ")		
	// console.log(champspells[0])
	// console.log(champspells[0].cooldown)	
 //    console.log("W : ")		
	// console.log(champspells[1])
 //    console.log("E : ")		 
	// console.log(champspells[2])
 //    console.log("R : ")		 
	// console.log(champspells[3]) 			 
// }
});
// Static Data Call End ===========================================================================
// Match Data Call Start =========================================================================
$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2466226913?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
	console.log(results)
// CS Per Min Section Start ====================================================================================================================
let summonerarr = results.participants 

for(i=0; i<summonerarr.length; i++){
	let timeline = summonerarr[i].timeline
	// console.log(timeline.creepsPerMinDeltas)
}
// CS Per Min Section End ====================================================================================================================
// Mastery Section Start
// let summonerarr = results.participants 
for(i=0; i< summonerarr.length; i++){
// console.log("Masteries of Summoner "+ [i])
// console.log(summonerarr[i].masteries);	
}

// Mastery Section End
// Runes Section Start  ========================================================================================
// let summonerarr = results.participants
for (i=0; i<summonerarr.length; i++){
	const runes = summonerarr[i].runes
	// console.log("Runes of Summoner " +[i]);
	for (j =0; j <runes.length; j++){
	// console.log(runes[j]);		
	}


}
// Runes Section End ========================================================================================
// Roles and Champ Start ====================================================================================
// let summonerarr=  results.participants

for (i=0; i<summonerarr.length; i++){
	const id = summonerarr[i].participantId
	const champ = summonerarr[i].championId
	const lane = summonerarr[i].timeline.lane
	const role = summonerarr[i].timeline.role
	const team = summonerarr[i].teamId
	console.log(id, champ, lane, role, team)
}

// Roles and Champ End ===================================================================================
// Team Data Start =============================================================================================
// console.log(results.teams[0])
// console.log(results.teams[1])
// Team Data End ===================================================================================================
// Frames Start ====================================================================================
const allframes = results.timeline.frames
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
		position = JSON.stringify(element.position, null, 2)
		victim = element.victimId
		if(partId == 0){
			console.log("MINIONS")
			console.log(element)
		}
		else{
		if (eventType == "ITEM_PURCHASED") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.6.1/img/item/"+item+".png>"+
			"<ul> Participant : "+partId+"</ul></div>");		
		}
		if (eventType == "ITEM_DESTROYED") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.6.1/img/item/"+item+".png>"+
			"<ul> Participant : "+partId+"</ul></div>");		
		}		
		if(eventType == "SKILL_LEVEL_UP"){
			$("#edit").append("<div class = 'eventframe skill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul>"+skill+"</ul>"+
			"<ul>"+levelType+"</ul>"+
			"<ul> Participant : "+partId+"</ul></div>");		
		}
		if (eventType == "WARD_PLACED"){
			$("#edit").append("<div class = 'eventframe ward col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul>"+ward+"</ul>"+
			"<ul> Participant: "+creatorId+"</ul></div>")
		}
		if(eventType =="CHAMPION_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul>"+
			"<ul> Position : "+position+"</ul>"+
			"<ul> Victim: "+victim+"</ul></div>")			
		}
		if (eventType == "ITEM_UNDO") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"Item Before: <img src = http://ddragon.leagueoflegends.com/cdn/7.6.1/img/item/"+itemb4+".png>"+
			"Item After: <img src = http://ddragon.leagueoflegends.com/cdn/7.6.1/img/item/"+itema4+".png>"+			
			"<ul> Participant : "+partId+"</ul></div>");		
		}
		if(eventType =="WARD_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul>"+
			"<ul> Ward Type: "+ward+"</ul></div>")			
		}
		if(eventType =="ELITE_MONSTER_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul>"+
			"<ul> Monster Type :"+monType+"</ul>"+
			"<ul> Monster Sub Type :"+monSub+"</ul>"+			
			"<ul> Position : "+position+"</ul></div>")			
		}
		if(eventType =="BUILDING_KILL"){
			$("#edit").append("<div class = 'eventframe kill col-md-3''><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<ul> Killer: "+killer+"</ul>"+
			"<ul> Lane Type :"+laneType+"</ul>"+
			"<ul> Tower Type :"+towerType+"</ul>"+			
			"<ul> Building Type :"+buildingType+"</ul>"+			
			"<ul> Belongs To :"+team+"</ul>"+			
			"<ul> Position : "+position+"</ul></div>")			
		}
		if (eventType == "ITEM_SOLD") {
			$("#edit").append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"Item  : <img src = http://ddragon.leagueoflegends.com/cdn/7.6.1/img/item/"+item+".png>"+		
			"<ul> Participant : "+partId+"</ul></div>");		
		}											
	}
	})
}
// Frames End =========================================================================
});

// Match Data Call End =========================================================================