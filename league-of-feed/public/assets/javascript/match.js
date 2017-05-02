var parts = [];
var champStaticData = [];
var timeline;
var matchDuration;
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
$("#timesubmit").on("click", function(e){
	timeHandler(e, frameRequest)
});
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
function getData(){
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
		matchDuration = data.results.object.matchDuration
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


function timeHandler(e, cb){
	e.preventDefault();
	let timestamp = $("#timestamp").val()
	cb(timestamp, frameAppend)
}


function frameRequest(timestamp, cb){
	const allframes = timeline.frames
	console.log(allframes)
	var timeRequested = timestamp
	var frame = $("#frame")
	var event;
	var events = [];
	var objectProcessor;	
	for(i=0; i < allframes.length; i++){
		var events = allframes[i].events
		if(allframes[i].events){
			for(j=0; j<events.length; j++){
				event = events[j]
				eventType = event.eventType
				timestamp = parseInt(event.timestamp)
				item = parseInt(event.itemId)
				itemb4= parseInt(event.itemBefore)
				itema4= parseInt(event.itemAfter)
				partId = parseInt(event.participantId)
				victim = parseInt(event.victimId)			
				switch(partId){
					case 1: 
			  		objectProcessor = partOneObject
			  		break;
					case 2: 
			  		objectProcessor = partTwoObject			  		
			  		break;
					case 3: 
			  		objectProcessor = partThreeObject			  		
			  		break;
					case 4: 
			  		objectProcessor = partFourObject			  		
			  		break;
					case 5: 
			  		objectProcessor = partFiveObject			  		
			  		break;
					case 6: 
			  		objectProcessor = partSixObject			  		
			  		break;
					case 7: 
			  		objectProcessor = partSevenObject			  		
			  		break;
					case 8: 
			  		objectProcessor = partEightObject			  		
			  		break;
					case 9: 
			  		objectProcessor = partNineObject			  		
			  		break;
					case 10: 
			  		objectProcessor = partTenObject			  		
			  		break;
					default:
			  		objectProcessor = temmie	  			  			  			  
				}
				if(eventType == "ITEM_SOLD" || eventType == "ITEM_PURCHASED" || eventType == "ITEM_DESTROYED"){
					if (timestamp < timeRequested){					
						cb(event, eventType, timestamp, item, partId, frame, objectProcessor)
					}else{
						// console.log("Greater")
					}	
				}else if (eventType == "ITEM_UNDO"){
					if (timestamp < timeRequested){					
						cb(event, eventType, timestamp, "0", partId, frame, objectProcessor)
					}else{
						// console.log("Greater")
					}						
				}else{
					// console.log("Not a Item Event")
				}					



			}
		} else{
			// console.log("No Event Frames")
		}
	}
}
function temmie(){
	console.log("I AM TEMMIE")

}
$(document).ready(function () {
	getData();

})
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
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
	Position: ""
}
function frameAppend(event, eventType, timestamp, item, partId, frame, cb){
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
function partOneObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ1Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ1Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item1 == "0"){
		champ1Obj.Item1 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item2 == "0"){
		champ1Obj.Item2 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item3 == "0"){
		champ1Obj.Item3 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item4 == "0"){
		champ1Obj.Item4 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item5 == "0"){
		champ1Obj.Item5 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item6 == "0"){
		champ1Obj.Item6 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item7 == "0"){
		champ1Obj.Item7 = item
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ1Obj.Item1 == item){
		champ1Obj.Item1 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item2 == item){
		champ1Obj.Item2 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item3 == item){
		champ1Obj.Item3 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item4 == item){
		champ1Obj.Item4 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item5 == item){
		champ1Obj.Item5 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item6 == item){
		champ1Obj.Item6 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item7 == item){
		champ1Obj.Item7 = "0"
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ1Obj.Item1 == event.itemBefore){
		champ1Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item2 == event.itemBefore){
		champ1Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item3 == event.itemBefore){
		champ1Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item4 == event.itemBefore){
		champ1Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item5 == event.itemBefore){
		champ1Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item6 == event.itemBefore){
		champ1Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv

		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item7 == event.itemBefore){
		champ1Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv

		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}

}
function partTwoObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ2Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ2Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item1 == "0"){
		champ2Obj.Item1 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item2 == "0"){
		champ2Obj.Item2 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item3 == "0"){
		champ2Obj.Item3 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item4 == "0"){
		champ2Obj.Item4 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item5 == "0"){
		champ2Obj.Item5 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item6 == "0"){
		champ2Obj.Item6 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item7 == "0"){
		champ2Obj.Item7 = item
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ2Obj.Item1 == item){
		champ2Obj.Item1 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item2 == item){
		champ2Obj.Item2 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item3 == item){
		champ2Obj.Item3 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item4 == item){
		champ2Obj.Item4 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item5 == item){
		champ2Obj.Item5 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item6 == item){
		champ2Obj.Item6 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item7 == item){
		champ2Obj.Item7 = "0"
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if(eventType == "ITEM_UNDO" && champ2Obj.Item1 == event.itemBefore){
		champ2Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item2 == event.itemBefore){
		champ2Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item3 == event.itemBefore){
		champ2Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item4 == event.itemBefore){
		champ2Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item5 == event.itemBefore){
		champ2Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item6 == event.itemBefore){
		champ2Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item7 == event.itemBefore){
		champ2Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}		
}
function partThreeObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ3Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ3Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item1 == "0"){
		champ3Obj.Item1 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item2 == "0"){
		champ3Obj.Item2 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item3 == "0"){
		champ3Obj.Item3 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item4 == "0"){
		champ3Obj.Item4 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item5 == "0"){
		champ3Obj.Item5 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item6 == "0"){
		champ3Obj.Item6 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item7 == "0"){
		champ3Obj.Item7 = item
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ3Obj.Item1 == item){
		champ3Obj.Item1 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item2 == item){
		champ3Obj.Item2 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item3 == item){
		champ3Obj.Item3 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item4 == item){
		champ3Obj.Item4 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item5 == item){
		champ3Obj.Item5 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item6 == item){
		champ3Obj.Item6 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item7 == item){
		champ3Obj.Item7 = "0"
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ3Obj.Item1 == event.itemBefore){
		champ3Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item2 == event.itemBefore){
		champ3Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item3 == event.itemBefore){
		champ3Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item4 == event.itemBefore){
		champ3Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item5 == event.itemBefore){
		champ3Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item6 == event.itemBefore){
		champ3Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item7 == event.itemBefore){
		champ3Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}
}
function partFourObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	 var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ4Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ4Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item1 == "0"){
		champ4Obj.Item1 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item2 == "0"){
		champ4Obj.Item2 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item3 == "0"){
		champ4Obj.Item3 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item4 == "0"){
		champ4Obj.Item4 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item5 == "0"){
		champ4Obj.Item5 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item6 == "0"){
		champ4Obj.Item6 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item7 == "0"){
		champ4Obj.Item7 = item
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ4Obj.Item1 == item){
		champ4Obj.Item1 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item2 == item){
		champ4Obj.Item2 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item3 == item){
		champ4Obj.Item3 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item4 == item){
		champ4Obj.Item4 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item5 == item){
		champ4Obj.Item5 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item6 == item){
		champ4Obj.Item6 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item7 == item){
		champ4Obj.Item7 = "0"
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ4Obj.Item1 == event.itemBefore){
		champ4Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item2 == event.itemBefore){
		champ4Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item3 == event.itemBefore){
		champ4Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item4 == event.itemBefore){
		champ4Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item5 == event.itemBefore){
		champ4Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item6 == event.itemBefore){
		champ4Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item7 == event.itemBefore){
		champ4Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}	
}
function partFiveObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = ""
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ5Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ5Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item1 == "0"){
		champ5Obj.Item1 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});		
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item2 == "0"){
		champ5Obj.Item2 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});	
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item3 == "0"){
		champ5Obj.Item3 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item4 == "0"){
		champ5Obj.Item4 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item5 == "0"){
		champ5Obj.Item5 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item6 == "0"){
		champ5Obj.Item6 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item7 == "0"){
		champ5Obj.Item7 = item
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")		
	}else if(eventType == "ITEM_DESTROYED" && champ5Obj.Item1 == item){
		champ5Obj.Item1 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item2 == item){
		champ5Obj.Item2 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item3 == item){
		champ5Obj.Item3 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item4 == item){
		champ5Obj.Item4 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item5 == item){
		champ5Obj.Item5 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item6 == item){
		champ5Obj.Item6 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item7 == item){
		champ5Obj.Item7 = "0"
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ5Obj.Item1 == event.itemBefore){
		champ5Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item2 == event.itemBefore){
		champ5Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
		return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item3 == event.itemBefore){
		champ5Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item4 == event.itemBefore){
		champ5Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item5 == event.itemBefore){
		champ5Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item6 == event.itemBefore){
		champ5Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item7 == event.itemBefore){
		champ5Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}
}
function partSixObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ6Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ6Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item1 == "0"){
		champ6Obj.Item1 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item2 == "0"){
		champ6Obj.Item2 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item3 == "0"){
		champ6Obj.Item3 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item4 == "0"){
		champ6Obj.Item4 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item5 == "0"){
		champ6Obj.Item5 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item6 == "0"){
		champ6Obj.Item6 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item7 == "0"){
		champ6Obj.Item7 = item
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ6Obj.Item1 == item){
		champ6Obj.Item1 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item2 == item){
		champ6Obj.Item2 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item3 == item){
		champ6Obj.Item3 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item4 == item){
		champ6Obj.Item4 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item5 == item){
		champ6Obj.Item5 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item6 == item){
		champ6Obj.Item6 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item7 == item){
		champ6Obj.Item7 = "0"
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ6Obj.Item1 == event.itemBefore){
		champ6Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item2 == event.itemBefore){
		champ6Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item3 == event.itemBefore){
		champ6Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item4 == event.itemBefore){
		champ6Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item5 == event.itemBefore){
		champ6Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item6 == event.itemBefore){
		champ6Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item7 == event.itemBefore){
		champ6Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}
}
function partSevenObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ7Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ7Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item1 == "0"){
		champ7Obj.Item1 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item2 == "0"){
		champ7Obj.Item2 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item3 == "0"){
		champ7Obj.Item3 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item4 == "0"){
		champ7Obj.Item4 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item5 == "0"){
		champ7Obj.Item5 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item6 == "0"){
		champ7Obj.Item6 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item7 == "0"){
		champ7Obj.Item7 = item
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ7Obj.Item1 == item){
		champ7Obj.Item1 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item2 == item){
		champ7Obj.Item2 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item3 == item){
		champ7Obj.Item3 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item4 == item){
		champ7Obj.Item4 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item5 == item){
		champ7Obj.Item5 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item6 == item){
		champ7Obj.Item6 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item7 == item){
		champ7Obj.Item7 = "0"
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ7Obj.Item1 == event.itemBefore){
		champ7Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item2 == event.itemBefore){
		champ7Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item3 == event.itemBefore){
		champ7Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item4 == event.itemBefore){
		champ7Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item5 == event.itemBefore){
		champ7Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item6 == event.itemBefore){
		champ7Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item7 == event.itemBefore){
		champ7Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}
}
function partEightObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ8Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ8Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item1 == "0"){
		champ8Obj.Item1 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item2 == "0"){
		champ8Obj.Item2 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item3 == "0"){
		champ8Obj.Item3 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item4 == "0"){
		champ8Obj.Item4 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item5 == "0"){
		champ8Obj.Item5 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item6 == "0"){
		champ8Obj.Item6 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item7 == "0"){
		champ8Obj.Item7 = item
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ8Obj.Item1 == item){
		champ8Obj.Item1 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item2 == item){
		champ8Obj.Item2 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item3 == item){
		champ8Obj.Item3 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item4 == item){
		champ8Obj.Item4 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item5 == item){
		champ8Obj.Item5 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item6 == item){
		champ8Obj.Item6 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item7 == item){
		champ8Obj.Item7 = "0"
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ8Obj.Item1 == event.itemBefore){
		champ8Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item2 == event.itemBefore){
		champ8Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item3 == event.itemBefore){
		champ8Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item4 == event.itemBefore){
		champ8Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item5 == event.itemBefore){
		champ8Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item6 == event.itemBefore){
		champ8Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item7 == event.itemBefore){
		champ8Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}

}
function partNineObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ9Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ9Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item1 == "0"){
		champ9Obj.Item1 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item2 == "0"){
		champ9Obj.Item2 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item3 == "0"){
		champ9Obj.Item3 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item4 == "0"){
		champ9Obj.Item4 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item5 == "0"){
		champ9Obj.Item5 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item6 == "0"){
		champ9Obj.Item6 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item7 == "0"){
		champ9Obj.Item7 = item
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ9Obj.Item1 == item){
		champ9Obj.Item1 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item2 == item){
		champ9Obj.Item2 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item3 == item){
		champ9Obj.Item3 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item4 == item){
		champ9Obj.Item4 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item5 == item){
		champ9Obj.Item5 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item6 == item){
		champ9Obj.Item6 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item7 == item){
		champ9Obj.Item7 = "0"
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ9Obj.Item1 == event.itemBefore){
		champ9Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item2 == event.itemBefore){
		champ9Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item3 == event.itemBefore){
		champ9Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item4 == event.itemBefore){
		champ9Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item5 == event.itemBefore){
		champ9Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item6 == event.itemBefore){
		champ9Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item7 == event.itemBefore){
		champ9Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}

}
function partTenObject(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	var inventorydiv = "";
	 if(event.itemBefore == 0){
	 	console.log(event)
	 	return
	 }	
	if(eventType == "ITEM_PURCHASED" && consumable.indexOf(item)!== -1){
		champ10Obj.Consumable.push(item)
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ10Obj.ItemTrinket = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item1 == "0"){
		champ10Obj.Item1 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item2 == "0"){
		champ10Obj.Item2 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item3 == "0"){
		champ10Obj.Item3 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item4 == "0"){
		champ10Obj.Item4 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item5 == "0"){
		champ10Obj.Item5 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item6 == "0"){
		champ10Obj.Item6 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item7 == "0"){
		champ10Obj.Item7 = item
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ10Obj.Item1 == item){
		champ10Obj.Item1 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item2 == item){
		champ10Obj.Item2 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item3 == item){
		champ10Obj.Item3 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item4 == item){
		champ10Obj.Item4 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item5 == item){
		champ10Obj.Item5 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item6 == item){
		champ10Obj.Item6 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item7 == item){
		champ10Obj.Item7 = "0"
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ10Obj.Item1 == event.itemBefore){
		champ10Obj.Item1 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item2 == event.itemBefore){
		champ10Obj.Item2 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item3 == event.itemBefore){
		champ10Obj.Item3 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item4 == event.itemBefore){
		champ10Obj.Item4 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item5 == event.itemBefore){
		champ10Obj.Item5 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item6 == event.itemBefore){
		champ10Obj.Item6 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item7 == event.itemBefore){
		champ10Obj.Item7 = event.itemAfter
		console.log(partId)
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.8.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}
}