var parts = [];
var champStaticData = [];
var timeline;
var matchDuration;
var loopBreak = false;
$(document).ready(function () {
	getData(temButtons);

})
function timeconvertseconds(millis) {
  var minutes = Math.floor(millis / 60);
  var seconds = ((millis % 60) / 1).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}
function timeconvertmilseconds(millis){
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;	
}  
$("body").on("click", ".objectiveButton", function(e){
	var timestamp = $(this).attr("data-timestamp")
	temButtonHandler(timestamp, timeHandler)
})
function champObj(name, id, patch, ad, adper, armor, armorper, asoff, asper, crit, critper, hp, hpper, hpreg, hpregper, movespeed, mp, mpper, mpreg, mpregper, range, spellblock, spellblockper, q, w, e, r){
	this.name = name;
	this.id = id;
	this.patch =patch;
	this.ad= ad;
	this.adper= adper;
	this.armor = armor;
	this.armorper = armorper;
	this.asoff = asoff; 
	this.asper = asper; 
	this.crit = crit;
	this.critper= critper;
	this.hp = hp;
	this.hpper = hpper;
	this.hpreg = hpreg;
	this.hpregper = hpregper;
	this.movespeed = movespeed;
	this.mp = mp;
	this.mpper = mpper; 
	this.mpreg= mpreg;
	this.mpregper = mpregper;
	this.range = range;
	this.spellblock = spellblock;
	this.spellblockper = spellblockper;

}
function particpiantObj(partid, champ, lane, role, team){
	this.partid= partid;
	this.champ= champ;
	this.lane= lane;
	this.role= role;
	this.team= team;
}
function getData(cb){
	let match = $("#matchId").data("match")	
	$.ajax({
		url:"/admin/match/id/"+match,
		method:"GET"
	}).done(function(data){
		console.log(data)
		data = data;
		var participants = data.results.object.participants		
		loadParticipants(participants, createChampObj)
		timeline = data.results.object.timeline
		cb(timeline)		
	})

}
function loadParticipants(participants, cb){
	var result;
	for (i=0; i<participants.length; i++){
		let id = participants[i].participantId
		let champ = participants[i].championId
		let lane = participants[i].timeline.lane
		let role = participants[i].timeline.role
		let team = participants[i].teamId
		var currentpart = new particpiantObj(id, champ, lane, role, team);
		parts.push(currentpart);
	}
	for(i=0; i <parts.length; i++){
		$.ajax({
			url:"/admin/champion/id/"+parts[i].champ
		}).done(function(champdata){
			result = champdata.results
			cb(result, appendChampObj)
		})
	}
}
function createChampObj(static, cb){
	var name = static.champName
	var id = static.id
	var patch = static.patch
	var ad = static.ad
	var adper = static.adPer
	var armor = static.armor
	var armorper = static.armorPer
	var asoff = static.asOff
	var asper = static.asPer
	var crit = static.crit
	var critper = static.critPer
	var hp = static.hp
	var hpper = static.hpPer
	var hpreg = static.hpReg
	var hpregper = static.hpRegPer
	var movespeed = static.movespeed
	var mp = static.mp
	var mpper = static.mpPer
	var mpreg = static.mpReg
	var mpregper = static.mpRegPer
	var range = static.range
	var spellblock = static.spellblock
	var spellblockper = static.spellblockPer
	var q = static.Q
	var w = static.W
	var e = static.E
	var r = static.R
	var currentchamp = new champObj(name, id, patch, ad, adper, armor, armorper, asoff, asper, crit, critper, hp, hpper, hpreg, hpregper, movespeed, mp, mpper, mpreg, mpregper, range, spellblock, spellblockper, q, w, e, r);
	champStaticData.push(currentchamp);	
	cb(currentchamp, appendChampDiv)
}
function appendChampObj(current, cb){
	for(i=0; i < parts.length; i++){
		if(parts[i].champ == current.id){
			console.log("Match! Champ Name : "+ current.name)
			console.log("Their Participant Id is : "+ parts[i].partid)
			console.log("Lane : "+ parts[i].lane)
			console.log("Role : "+ parts[i].role)				
			console.log("Team : "+ parts[i].team)
			parts[i].champname = current.name
			let imgname = current.name.split(' ').join('');
			parts[i].imgurl = "http://ddragon.leagueoflegends.com/cdn/7.8.1/img/champion/"+imgname+".png";										
		}
	}
	cb(parts)
}
function appendChampDiv(parts){
	for(i=0; i<parts.length; i++){
		let participantId = parts[i].partid
		let champname = parts[i].champname
		let imgurl = parts[i].imgurl
		let lane = parts[i].lane
		let role = parts[i].role
		let team = parts[i].team			
		if(team == 100 && lane == "TOP"){
			$("#t1top").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+				
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		}else if(team == 100 && lane == "JUNGLE"){
			$("#t1jung").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		}else if(team == 100 && lane == "MIDDLE"){
			$("#t1mid").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		} else if(team == 100 && lane == "BOTTOM" && role == "DUO_CARRY"){
			$("#t1bot").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		} else if(team == 100 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
			$("#t1sup").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		} else if(team == 200 && lane == "TOP"){
			$("#t2top").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		}else if(team == 200 && lane == "JUNGLE"){
			$("#t2jung").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		}else if(team == 200 && lane == "MIDDLE"){
			$("#t2mid").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		} else if(team == 200 && lane == "BOTTOM" && role == "DUO_CARRY"){
			$("#t2bot").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		} else if (team == 200 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
			$("#t2sup").html(
				"<h5 class = 'champname'>"+champname+"</h5>"+
				"<img class = 'champimg' src ='"+imgurl+"'>"+
				"<div class = 'champinvetory' id='part"+participantId+"inventory'></div>"+					
				"<div class='partid' id = part"+participantId+" data-participant="+participantId+" style='display: none;'>"		
			)
		}
	}

}
function timeHandler(timestamp, cb){
	champ1Obj.Item1 = "0"
	champ1Obj.Item2 = "0"
	champ1Obj.Item3 = "0"
	champ1Obj.Item4 = "0"
	champ1Obj.Item5 = "0"
	champ1Obj.Item6 = "0"
	champ1Obj.Item7 = "0"	
	champ1Obj.ItemTrinket = "0"
	champ1Obj.Consumable = []
	champ1Obj.Alive = ""
	champ1Obj.Position = ""	
	champ1Obj.Q = 0
	champ1Obj.W = 0
	champ1Obj.E = 0
	champ1Obj.R = 0
	champ2Obj.Item1 = "0"
	champ2Obj.Item2 = "0"
	champ2Obj.Item3 = "0"
	champ2Obj.Item4 = "0"
	champ2Obj.Item5 = "0"
	champ2Obj.Item6 = "0"
	champ2Obj.Item7 = "0"	
	champ2Obj.ItemTrinket = "0"
	champ2Obj.Consumable = []
	champ2Obj.Alive = ""
	champ2Obj.Position = ""		
	champ2Obj.Q = 0
	champ2Obj.W = 0
	champ2Obj.E = 0
	champ2Obj.R = 0
	champ3Obj.Item1 = "0"
	champ3Obj.Item2 = "0"
	champ3Obj.Item3 = "0"
	champ3Obj.Item4 = "0"
	champ3Obj.Item5 = "0"
	champ3Obj.Item6 = "0"
	champ3Obj.Item7 = "0"	
	champ3Obj.ItemTrinket = "0"
	champ3Obj.Consumable = []
	champ3Obj.Alive = ""
	champ3Obj.Position = ""		
	champ3Obj.Q = 0
	champ3Obj.W = 0
	champ3Obj.E = 0
	champ3Obj.R = 0
	champ4Obj.Item1 = "0"
	champ4Obj.Item2 = "0"
	champ4Obj.Item3 = "0"
	champ4Obj.Item4 = "0"
	champ4Obj.Item5 = "0"
	champ4Obj.Item6 = "0"
	champ4Obj.Item7 = "0"	
	champ4Obj.ItemTrinket = "0"
	champ4Obj.Consumable = []
	champ4Obj.Alive = ""
	champ4Obj.Position = ""		
	champ4Obj.Q = 0
	champ4Obj.W = 0
	champ4Obj.E = 0
	champ4Obj.R = 0
	champ5Obj.Item1 = "0"
	champ5Obj.Item2 = "0"
	champ5Obj.Item3 = "0"
	champ5Obj.Item4 = "0"
	champ5Obj.Item5 = "0"
	champ5Obj.Item6 = "0"
	champ5Obj.Item7 = "0"	
	champ5Obj.ItemTrinket = "0"
	champ5Obj.Consumable = []
	champ5Obj.Alive = ""
	champ5Obj.Position = ""		
	champ5Obj.Q = 0
	champ5Obj.W = 0
	champ5Obj.E = 0
	champ5Obj.R = 0	
	champ6Obj.Item1 = "0"
	champ6Obj.Item2 = "0"
	champ6Obj.Item3 = "0"
	champ6Obj.Item4 = "0"
	champ6Obj.Item5 = "0"
	champ6Obj.Item6 = "0"
	champ6Obj.Item7 = "0"	
	champ6Obj.ItemTrinket = "0"
	champ6Obj.Consumable = []
	champ6Obj.Alive = ""
	champ6Obj.Position = ""		
	champ6Obj.Q = 0
	champ6Obj.W = 0
	champ6Obj.E = 0
	champ6Obj.R = 0
	champ7Obj.Item1 = "0"
	champ7Obj.Item2 = "0"
	champ7Obj.Item3 = "0"
	champ7Obj.Item4 = "0"
	champ7Obj.Item5 = "0"
	champ7Obj.Item6 = "0"
	champ7Obj.Item7 = "0"	
	champ7Obj.ItemTrinket = "0"
	champ7Obj.Consumable = []
	champ7Obj.Alive = ""
	champ7Obj.Position = ""		
	champ7Obj.Q = 0
	champ7Obj.W = 0
	champ7Obj.E = 0
	champ7Obj.R = 0
	champ8Obj.Item1 = "0"
	champ8Obj.Item2 = "0"
	champ8Obj.Item3 = "0"
	champ8Obj.Item4 = "0"
	champ8Obj.Item5 = "0"
	champ8Obj.Item6 = "0"
	champ8Obj.Item7 = "0"	
	champ8Obj.ItemTrinket = "0"
	champ8Obj.Consumable = []
	champ8Obj.Alive = ""
	champ8Obj.Position = ""		
	champ8Obj.Q = 0
	champ8Obj.W = 0
	champ8Obj.E = 0
	champ8Obj.R = 0
	champ9Obj.Item1 = "0"
	champ9Obj.Item2 = "0"
	champ9Obj.Item3 = "0"
	champ9Obj.Item4 = "0"
	champ9Obj.Item5 = "0"
	champ9Obj.Item6 = "0"
	champ9Obj.Item7 = "0"	
	champ9Obj.ItemTrinket = "0"
	champ9Obj.Consumable = []
	champ9Obj.Alive = ""
	champ9Obj.Position = ""		
	champ9Obj.Q = 0
	champ9Obj.W = 0
	champ9Obj.E = 0
	champ9Obj.R = 0
	champ10Obj.Item1 = "0"
	champ10Obj.Item2 = "0"
	champ10Obj.Item3 = "0"
	champ10Obj.Item4 = "0"
	champ10Obj.Item5 = "0"
	champ10Obj.Item6 = "0"
	champ10Obj.Item7 = "0"	
	champ10Obj.ItemTrinket = "0"
	champ10Obj.Consumable = []
	champ10Obj.Alive = ""
	champ10Obj.Position = ""		
	champ10Obj.Q = 0
	champ10Obj.W = 0
	champ10Obj.E = 0
	champ10Obj.R = 0					
	$("#part1inventory").empty()
	$("#part2inventory").empty()	
	$("#part3inventory").empty()	
	$("#part4inventory").empty()	
	$("#part5inventory").empty()
	$("#part6inventory").empty()
	$("#part7inventory").empty()	
	$("#part8inventory").empty()	
	$("#part9inventory").empty()	
	$("#part10inventory").empty()

	cb(timestamp, timeProcessor, temDmg)
}
function frameRequest(timestamp, cb, cb2){
	const allframes = timeline.frames
	console.log(allframes)
	var timeRequested = timestamp
	var event;
	var events = [];
	var itemProcessor;	
	var skillProcessor; 
	for(i=1; i < allframes.length; i++){
		var events = allframes[i].events
			for(j=0; j<events.length; j++){
				event = events[j]
				eventType = event.eventType
				timeProcessor(event, eventType, timeRequested, eventProcessor)
				console.log(event.timestamp)
				console.log(loopBreak);
				if(loopBreak){
					cb2();
					return false;
				}
			}
		console.log("meow "+i)	
	}
}
function timeProcessor(event, eventType, timeRequested, cb){
	var event = event
	timestamp = parseInt(event.timestamp)
	if(timestamp <= timeRequested){			
		cb(event, eventType, itemAppend, skillAppend)
	}else{
		loopBreak = true
		return false;

	}	
}
function eventProcessor(event, eventType, cb1, cb2){
	var event = event
	partId = parseInt(event.participantId)
	switch(partId){
		case 1: 
				itemProcessor = partOneItemObject
				skillProcessor = partOneSkillObject
				break;
		case 2: 
				itemProcessor = partTwoItemObject
				skillProcessor = partTwoSkillObject			  		
				break;
		case 3: 
				itemProcessor = partThreeItemObject
				skillProcessor = partThreeSkillObject			  		
				break;
		case 4: 
				itemProcessor = partFourItemObject
				skillProcessor = partFourSkillObject			  		
				break;
		case 5: 
				itemProcessor = partFiveItemObject
				skillProcessor = partFiveSkillObject			  		
				break;
		case 6: 
				itemProcessor = partSixItemObject
				skillProcessor = partSixSkillObject			  		
				break;
		case 7: 
				itemProcessor = partSevenItemObject
				skillProcessor = partSevenSkillObject			  		
				break;
		case 8: 
				itemProcessor = partEightItemObject
				skillProcessor = partEightSkillObject			  		
				break;
		case 9: 
				itemProcessor = partNineItemObject
				skillProcessor = partNineSkillObject			  		
				break;
		case 10: 
				itemProcessor = partTenItemObject
				skillProcessor = partTenSkillObject			  		
				break;
		default:
				itemProcessor = temmie
				skillProcessor = temmie	  			  			  			  
	}		
	if(eventType == "ITEM_SOLD" || eventType == "ITEM_PURCHASED" || eventType == "ITEM_DESTROYED"){	
		item = parseInt(event.itemId)				
		cb1(event, eventType, timestamp, item, partId, itemProcessor)
	}else if (eventType == "ITEM_UNDO"){					
		cb1(event, eventType, timestamp, "0", partId, itemProcessor)						
	}else if (eventType == "SKILL_LEVEL_UP"){
		skillSlot = event.skillSlot
		levelUpType = event.levelUpType			
		cb2(event, eventType, timestamp, partId, skillSlot, levelUpType, skillProcessor)
	}


}
function skillAppend(event, eventType, timestamp, partId, skillSlot, levelUpType, cb){
	console.log("I AM TEMMIE")
	if(levelUpType == "NORMAL"){
		cb(event, eventType, timestamp, skillSlot, partId, levelUpType)
	}else{
		console.log(event)
	}
}
function temmie(){
	console.log("I AM TEMMIE")


}
function temDmg(){
	console.log("AWJROAW")
}
function temButtons(timeline){
	console.log("I AM TEMMIE")
	const allframes = timeline.frames
	console.log(allframes)
	var timeRequested = timestamp
	var event;
	var events = [];
	var itemProcessor;	
	var skillProcessor;
	var container = $("#buttoncontainer")
	for(i=0; i < allframes.length; i++){
		var events = allframes[i].events
		if(allframes[i].events){
			for(j=0; j<events.length; j++){
				event = events[j]
				eventType = event.eventType
				levelUpType = event.levelUpType
				timestamp = parseInt(event.timestamp)
				partId = parseInt(event.participantId)
				victim = parseInt(event.victimId)
				if(eventType == "CHAMPION_KILL"){
					container.append("<button class='objectiveButton' data-timestamp="+timestamp+" type='button' style= 'background-image:url('http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305')'/>")

				}else if (eventType == "BUILDING_KILL"){
					container.append("<button class='objectiveButton' data-timestamp="+timestamp+" type='button' style= 'background-image:url('http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305')'/>")

				}else if (eventType == "ELITE_MONSTER_KILL"){
					container.append("<button class='objectiveButton' data-timestamp="+timestamp+" type='button' style= 'background-image:url('http://vignette1.wikia.nocookie.net/leagueoflegends/images/0/0b/Ahri_Poro_Icon.png/revision/latest?cb=20150214173305')'/>")

				}
			}
		}	
	}
}
function temButtonHandler(timestamp, cb){
	cb(timestamp, frameRequest)

}
var champ1Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0
}
var champ2Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ3Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ4Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ5Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ6Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ7Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: ""
}
var champ8Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ9Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
var champ10Obj = {
	Item1: "0",
	Item2: "0",
	Item3: "0",
	Item4: "0",
	Item5: "0",
	Item6: "0",
	Item7: "0",	
	ItemTrinket: "0",
	Consumable: [],
	Alive: "",
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0	
}
function itemAppend(event, eventType, timestamp, item, partId, cb){
	if (eventType == "ITEM_SOLD") {					

	cb(event, eventType, timestamp, item, partId)		
	}else if (eventType == "ITEM_PURCHASED") {						

	cb(event, eventType, timestamp, item, partId)				
	}else if (eventType == "ITEM_DESTROYED") {						

	cb(event, eventType, timestamp, item, partId)				
	}else if (eventType == "ITEM_UNDO"){

	cb(event, eventType, timestamp, 0 , partId)
	}
}
function partOneSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ1Obj.Q)
		var newskill = skill + 1
		champ1Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ1Obj.W)
		var newskill = skill + 1
		champ1Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ1Obj.E)
		var newskill = skill + 1
		champ1Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ1Obj.R)
		var newskill = skill + 1
		champ1Obj.R = newskill
	}
}
function partTwoSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ2Obj.Q)
		var newskill = skill + 1
		champ2Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ2Obj.W)
		var newskill = skill + 1
		champ2Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ2Obj.E)
		var newskill = skill + 1
		champ2Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ2Obj.R)
		var newskill = skill + 1
		champ2Obj.R = newskill
	}
}
function partThreeSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ3Obj.Q)
		var newskill = skill + 1
		champ3Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ3Obj.W)
		var newskill = skill + 1
		champ3Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ3Obj.E)
		var newskill = skill + 1
		champ3Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ3Obj.R)
		var newskill = skill + 1
		champ3Obj.R = newskill
	}
}
function partFourSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ4Obj.Q)
		var newskill = skill + 1
		champ4Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ4Obj.W)
		var newskill = skill + 1
		champ4Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ4Obj.E)
		var newskill = skill + 1
		champ4Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ4Obj.R)
		var newskill = skill + 1
		champ4Obj.R = newskill
	}
}
function partFiveSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ5Obj.Q)
		var newskill = skill + 1
		champ5Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ5Obj.W)
		var newskill = skill + 1
		champ5Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ5Obj.E)
		var newskill = skill + 1
		champ5Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ5Obj.R)
		var newskill = skill + 1
		champ5Obj.R = newskill
	}
}
function partSixSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ6Obj.Q)
		var newskill = skill + 1
		champ6Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ6Obj.W)
		var newskill = skill + 1
		champ6Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ6Obj.E)
		var newskill = skill + 1
		champ6Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ6Obj.R)
		var newskill = skill + 1
		champ6Obj.R = newskill
	}
}
function partSevenSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ7Obj.Q)
		var newskill = skill + 1
		champ7Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ7Obj.W)
		var newskill = skill + 1
		champ7Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ7Obj.E)
		var newskill = skill + 1
		champ7Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ7Obj.R)
		var newskill = skill + 1
		champ7Obj.R = newskill
	}
}
function partEightSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ8Obj.Q)
		var newskill = skill + 1
		champ8Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ8Obj.W)
		var newskill = skill + 1
		champ8Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ8Obj.E)
		var newskill = skill + 1
		champ8Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ8Obj.R)
		var newskill = skill + 1
		champ8Obj.R = newskill
	}
}
function partNineSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ9Obj.Q)
		var newskill = skill + 1
		champ9Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ9Obj.W)
		var newskill = skill + 1
		champ9Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ9Obj.E)
		var newskill = skill + 1
		champ9Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ9Obj.R)
		var newskill = skill + 1
		champ9Obj.R = newskill
	}
}
function partTenSkillObject(event, eventType, timestamp, skillSlot, partId, levelUpType){
	if(eventType == "SKILL_LEVEL_UP" && skillSlot == 1){
		var skill = parseInt(champ10Obj.Q)
		var newskill = skill + 1
		champ10Obj.Q = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 2){
		var skill = parseInt(champ10Obj.W)
		var newskill = skill + 1
		champ10Obj.W = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 3){
		var skill = parseInt(champ10Obj.E)
		var newskill = skill + 1
		champ10Obj.E = newskill
	}else if(eventType == "SKILL_LEVEL_UP" && skillSlot == 4){
		var skill = parseInt(champ10Obj.R)
		var newskill = skill + 1
		champ10Obj.R = newskill
	}
}

function partOneItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ1Obj.Consumable.push(item)
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ1Obj.ItemTrinket = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item1 == "0"){
		champ1Obj.Item1 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item2 == "0"){
		champ1Obj.Item2 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item3 == "0"){
		champ1Obj.Item3 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item4 == "0"){
		champ1Obj.Item4 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item5 == "0"){
		champ1Obj.Item5 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item6 == "0"){
		champ1Obj.Item6 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item7 == "0"){
		champ1Obj.Item7 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ1Obj.Item1 == item){
		champ1Obj.Item1 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item2 == item){
		champ1Obj.Item2 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item3 == item){
		champ1Obj.Item3 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item4 == item){
		champ1Obj.Item4 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item5 == item){
		champ1Obj.Item5 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item6 == item){
		champ1Obj.Item6 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item7 == item){
		champ1Obj.Item7 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ1Obj.Item1 == event.itemBefore){
		champ1Obj.Item1 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item2 == event.itemBefore){
		champ1Obj.Item2 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item3 == event.itemBefore){
		champ1Obj.Item3 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item4 == event.itemBefore){
		champ1Obj.Item4 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item5 == event.itemBefore){
		champ1Obj.Item5 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item6 == event.itemBefore){
		champ1Obj.Item6 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv

		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item7 == event.itemBefore){
		champ1Obj.Item7 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv

		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}

}
function partTwoItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ2Obj.Consumable.push(item)
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ2Obj.ItemTrinket = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item1 == "0"){
		champ2Obj.Item1 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item2 == "0"){
		champ2Obj.Item2 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item3 == "0"){
		champ2Obj.Item3 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item4 == "0"){
		champ2Obj.Item4 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item5 == "0"){
		champ2Obj.Item5 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item6 == "0"){
		champ2Obj.Item6 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item7 == "0"){
		champ2Obj.Item7 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ2Obj.Item1 == item){
		champ2Obj.Item1 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item2 == item){
		champ2Obj.Item2 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item3 == item){
		champ2Obj.Item3 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item4 == item){
		champ2Obj.Item4 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item5 == item){
		champ2Obj.Item5 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item6 == item){
		champ2Obj.Item6 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item7 == item){
		champ2Obj.Item7 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if(eventType == "ITEM_UNDO" && champ2Obj.Item1 == event.itemBefore){
		champ2Obj.Item1 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item2 == event.itemBefore){
		champ2Obj.Item2 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item3 == event.itemBefore){
		champ2Obj.Item3 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item4 == event.itemBefore){
		champ2Obj.Item4 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item5 == event.itemBefore){
		champ2Obj.Item5 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item6 == event.itemBefore){
		champ2Obj.Item6 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item7 == event.itemBefore){
		champ2Obj.Item7 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}		
}
function partThreeItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ3Obj.Consumable.push(item)
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ3Obj.ItemTrinket = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item1 == "0"){
		champ3Obj.Item1 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item2 == "0"){
		champ3Obj.Item2 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item3 == "0"){
		champ3Obj.Item3 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item4 == "0"){
		champ3Obj.Item4 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item5 == "0"){
		champ3Obj.Item5 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item6 == "0"){
		champ3Obj.Item6 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item7 == "0"){
		champ3Obj.Item7 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ3Obj.Item1 == item){
		champ3Obj.Item1 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item2 == item){
		champ3Obj.Item2 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item3 == item){
		champ3Obj.Item3 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item4 == item){
		champ3Obj.Item4 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item5 == item){
		champ3Obj.Item5 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item6 == item){
		champ3Obj.Item6 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item7 == item){
		champ3Obj.Item7 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ3Obj.Item1 == event.itemBefore){
		champ3Obj.Item1 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item2 == event.itemBefore){
		champ3Obj.Item2 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item3 == event.itemBefore){
		champ3Obj.Item3 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item4 == event.itemBefore){
		champ3Obj.Item4 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item5 == event.itemBefore){
		champ3Obj.Item5 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item6 == event.itemBefore){
		champ3Obj.Item6 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item7 == event.itemBefore){
		champ3Obj.Item7 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}
}
function partFourItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	 var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ4Obj.Consumable.push(item)
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ4Obj.ItemTrinket = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item1 == "0"){
		champ4Obj.Item1 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item2 == "0"){
		champ4Obj.Item2 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item3 == "0"){
		champ4Obj.Item3 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item4 == "0"){
		champ4Obj.Item4 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item5 == "0"){
		champ4Obj.Item5 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item6 == "0"){
		champ4Obj.Item6 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item7 == "0"){
		champ4Obj.Item7 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ4Obj.Item1 == item){
		champ4Obj.Item1 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item2 == item){
		champ4Obj.Item2 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item3 == item){
		champ4Obj.Item3 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item4 == item){
		champ4Obj.Item4 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item5 == item){
		champ4Obj.Item5 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item6 == item){
		champ4Obj.Item6 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item7 == item){
		champ4Obj.Item7 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ4Obj.Item1 == event.itemBefore){
		champ4Obj.Item1 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item2 == event.itemBefore){
		champ4Obj.Item2 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item3 == event.itemBefore){
		champ4Obj.Item3 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item4 == event.itemBefore){
		champ4Obj.Item4 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item5 == event.itemBefore){
		champ4Obj.Item5 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item6 == event.itemBefore){
		champ4Obj.Item6 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item7 == event.itemBefore){
		champ4Obj.Item7 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}	
}
function partFiveItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = ""
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ5Obj.Consumable.push(item)
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ5Obj.ItemTrinket = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item1 == "0"){
		champ5Obj.Item1 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});		
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item2 == "0"){
		champ5Obj.Item2 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});	
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item3 == "0"){
		champ5Obj.Item3 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item4 == "0"){
		champ5Obj.Item4 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item5 == "0"){
		champ5Obj.Item5 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item6 == "0"){
		champ5Obj.Item6 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item7 == "0"){
		champ5Obj.Item7 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")		
	}else if(eventType == "ITEM_DESTROYED" && champ5Obj.Item1 == item){
		champ5Obj.Item1 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item2 == item){
		champ5Obj.Item2 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item3 == item){
		champ5Obj.Item3 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item4 == item){
		champ5Obj.Item4 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item5 == item){
		champ5Obj.Item5 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item6 == item){
		champ5Obj.Item6 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item7 == item){
		champ5Obj.Item7 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ5Obj.Item1 == event.itemBefore){
		champ5Obj.Item1 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item2 == event.itemBefore){
		champ5Obj.Item2 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
		return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item3 == event.itemBefore){
		champ5Obj.Item3 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item4 == event.itemBefore){
		champ5Obj.Item4 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item5 == event.itemBefore){
		champ5Obj.Item5 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item6 == event.itemBefore){
		champ5Obj.Item6 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item7 == event.itemBefore){
		champ5Obj.Item7 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}
}
function partSixItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ6Obj.Consumable.push(item)
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ6Obj.ItemTrinket = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item1 == "0"){
		champ6Obj.Item1 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item2 == "0"){
		champ6Obj.Item2 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item3 == "0"){
		champ6Obj.Item3 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item4 == "0"){
		champ6Obj.Item4 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item5 == "0"){
		champ6Obj.Item5 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item6 == "0"){
		champ6Obj.Item6 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item7 == "0"){
		champ6Obj.Item7 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ6Obj.Item1 == item){
		champ6Obj.Item1 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item2 == item){
		champ6Obj.Item2 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item3 == item){
		champ6Obj.Item3 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item4 == item){
		champ6Obj.Item4 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item5 == item){
		champ6Obj.Item5 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item6 == item){
		champ6Obj.Item6 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item7 == item){
		champ6Obj.Item7 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ6Obj.Item1 == event.itemBefore){
		champ6Obj.Item1 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item2 == event.itemBefore){
		champ6Obj.Item2 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item3 == event.itemBefore){
		champ6Obj.Item3 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item4 == event.itemBefore){
		champ6Obj.Item4 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item5 == event.itemBefore){
		champ6Obj.Item5 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item6 == event.itemBefore){
		champ6Obj.Item6 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item7 == event.itemBefore){
		champ6Obj.Item7 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}
}
function partSevenItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ7Obj.Consumable.push(item)
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ7Obj.ItemTrinket = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item1 == "0"){
		champ7Obj.Item1 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item2 == "0"){
		champ7Obj.Item2 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item3 == "0"){
		champ7Obj.Item3 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item4 == "0"){
		champ7Obj.Item4 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item5 == "0"){
		champ7Obj.Item5 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item6 == "0"){
		champ7Obj.Item6 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item7 == "0"){
		champ7Obj.Item7 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ7Obj.Item1 == item){
		champ7Obj.Item1 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item2 == item){
		champ7Obj.Item2 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item3 == item){
		champ7Obj.Item3 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item4 == item){
		champ7Obj.Item4 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item5 == item){
		champ7Obj.Item5 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item6 == item){
		champ7Obj.Item6 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item7 == item){
		champ7Obj.Item7 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ7Obj.Item1 == event.itemBefore){
		champ7Obj.Item1 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item2 == event.itemBefore){
		champ7Obj.Item2 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item3 == event.itemBefore){
		champ7Obj.Item3 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item4 == event.itemBefore){
		champ7Obj.Item4 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item5 == event.itemBefore){
		champ7Obj.Item5 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item6 == event.itemBefore){
		champ7Obj.Item6 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item7 == event.itemBefore){
		champ7Obj.Item7 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}
}
function partEightItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ8Obj.Consumable.push(item)
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ8Obj.ItemTrinket = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item1 == "0"){
		champ8Obj.Item1 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item2 == "0"){
		champ8Obj.Item2 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item3 == "0"){
		champ8Obj.Item3 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item4 == "0"){
		champ8Obj.Item4 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item5 == "0"){
		champ8Obj.Item5 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item6 == "0"){
		champ8Obj.Item6 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item7 == "0"){
		champ8Obj.Item7 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ8Obj.Item1 == item){
		champ8Obj.Item1 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item2 == item){
		champ8Obj.Item2 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item3 == item){
		champ8Obj.Item3 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item4 == item){
		champ8Obj.Item4 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item5 == item){
		champ8Obj.Item5 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item6 == item){
		champ8Obj.Item6 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item7 == item){
		champ8Obj.Item7 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ8Obj.Item1 == event.itemBefore){
		champ8Obj.Item1 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item2 == event.itemBefore){
		champ8Obj.Item2 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item3 == event.itemBefore){
		champ8Obj.Item3 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item4 == event.itemBefore){
		champ8Obj.Item4 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item5 == event.itemBefore){
		champ8Obj.Item5 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item6 == event.itemBefore){
		champ8Obj.Item6 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item7 == event.itemBefore){
		champ8Obj.Item7 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}

}
function partNineItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ9Obj.Consumable.push(item)
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ9Obj.ItemTrinket = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item1 == "0"){
		champ9Obj.Item1 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item2 == "0"){
		champ9Obj.Item2 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item3 == "0"){
		champ9Obj.Item3 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item4 == "0"){
		champ9Obj.Item4 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item5 == "0"){
		champ9Obj.Item5 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item6 == "0"){
		champ9Obj.Item6 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item7 == "0"){
		champ9Obj.Item7 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ9Obj.Item1 == item){
		champ9Obj.Item1 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item2 == item){
		champ9Obj.Item2 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item3 == item){
		champ9Obj.Item3 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item4 == item){
		champ9Obj.Item4 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item5 == item){
		champ9Obj.Item5 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item6 == item){
		champ9Obj.Item6 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item7 == item){
		champ9Obj.Item7 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ9Obj.Item1 == event.itemBefore){
		champ9Obj.Item1 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item2 == event.itemBefore){
		champ9Obj.Item2 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item3 == event.itemBefore){
		champ9Obj.Item3 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item4 == event.itemBefore){
		champ9Obj.Item4 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item5 == event.itemBefore){
		champ9Obj.Item5 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item6 == event.itemBefore){
		champ9Obj.Item6 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item7 == event.itemBefore){
		champ9Obj.Item7 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}

}
function partTenItemObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ10Obj.Consumable.push(item)
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ10Obj.ItemTrinket = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item1 == "0"){
		champ10Obj.Item1 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item2 == "0"){
		champ10Obj.Item2 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item3 == "0"){
		champ10Obj.Item3 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item4 == "0"){
		champ10Obj.Item4 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item5 == "0"){
		champ10Obj.Item5 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item6 == "0"){
		champ10Obj.Item6 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item7 == "0"){
		champ10Obj.Item7 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ10Obj.Item1 == item){
		champ10Obj.Item1 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item2 == item){
		champ10Obj.Item2 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item3 == item){
		champ10Obj.Item3 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item4 == item){
		champ10Obj.Item4 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item5 == item){
		champ10Obj.Item5 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item6 == item){
		champ10Obj.Item6 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item7 == item){
		champ10Obj.Item7 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ10Obj.Item1 == event.itemBefore){
		champ10Obj.Item1 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item2 == event.itemBefore){
		champ10Obj.Item2 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item3 == event.itemBefore){
		champ10Obj.Item3 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item4 == event.itemBefore){
		champ10Obj.Item4 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item5 == event.itemBefore){
		champ10Obj.Item5 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item6 == event.itemBefore){
		champ10Obj.Item6 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item7 == event.itemBefore){
		champ10Obj.Item7 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}
}