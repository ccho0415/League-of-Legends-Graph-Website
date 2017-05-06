var parts = [];
var allitems = [];
var itemStaticData = [];
var champStaticData = [];
var allrunes = [];
var runeStaticData = [];
var allmastery = [];
var masteryStaticData = [];
var timeline;
var matchDuration;
var loopBreak = false;
var formulas = {
	Vayne:{
		Q:{
			One  :{
				ratio: 0.3				
			},
			Two :{
				ratio: 0.35
			},
			Three :{
				ratio: 0.4
			},
			Four :{
				ratio: 0.45
			},
			Five :{
				ratio: 0.5
			}
		},
		W:{
			One:{
				ratio: 0.06
			},
			Two:{
				ratio: 0.075
			},
			Three:{
				ratio: 0.09
			},
			Four:{
				ratio: 0.105
			},
			Five:{
				ratio: 0.12
			}
		},
		E:{
			One:{
				base: 45
			},
			Two:{
				base: 80
			},
			Three:{
				base: 115
			},
			Four:{
				base: 150
			},
			Five:{
				base: 185
			}
		},
		R:{
			One:{
				bonus: 30
			},
			Two:{
				bonus: 50
			},
			Three:{
				bonus: 70
			}
		}
	},
	Lux:{
		Q:{
			One:{
				base: 50
			},
			Two:{
				base: 100
			},
			Three:{
				base: 150
			},
			Four: {
				base: 200
			},
			Five:{
				base: 250
			}
		},
		E:{
			One:{
				base: 60
			},
			Two:{
				base: 105
			},
			Three: {
				base: 150
			},
			Four :{
				base: 195
			},
			Five :{
				base: 240
			}
		},
		R:{
			One:{
				base: 300
			},
			Two:{
				base: 400
			},
			Three:{
				base: 500
			}
		}
	},
	Maokai:{
		Q:{
			One:{
				base: 70
			},
			Two:{
				base: 115
			},
			Three: {
				base: 160
			},
			Four : {
				base: 205
			},
			Five: {
				base: 250
			}
		},
		W:{
			One:{
				base: 50
			},
			Two:{
				base: 75
			},
			Three:{
				base: 100
			},
			Four:{
				base: 125
			},
			Five:{
				base: 150
			}
		},
		E:{
			One:{
				base: 90,
				ratio: .12
			},
			Two:{
				base: 140,
				ratio: .13
			},
			Three: {
				base: 190,
				ratio: .14
			},
			Four:{
				base:240,
				ratio: .15
			},
			Five:{
				base: 290,
				ratio: .16
			}
		},
		R:{
			One:{
				base: 150
			},
			Two:{
				base: 225
			},
			Three:{
				base: 300
			}
		}
	},
	Janna :{
		Q:{
			One :{
				base: 105
			},
			Two:{
				base: 145
			},
			Three:{
				base: 185
			},
			Four:{
				base: 225
			},
			Five:{
				base: 265
			}


		},
		W:{
			One :{
				base: 60
			},
			Two:{
				base: 115
			},
			Three:{
				base: 170
			},
			Four:{
				base: 225
			},
			Five:{
				base: 280
			}
		},
		E:{
			One :{
				base: 10
			},
			Two:{
				base: 17.5
			},
			Three:{
				base: 25
			},
			Four:{
				base: 32.5
			},
			Five:{
				base: 40
			}
		},
		R:{

		}
	},
	Gragas:{
		Q:{
			One :{
				base: 80
			},
			Two:{
				base: 120
			},
			Three:{
				base: 160
			},
			Four:{
				base: 200
			},
			Five:{
				base: 240
			}

		},
		W:{
			One :{
				base: 20
			},
			Two:{
				base: 50
			},
			Three:{
				base: 80
			},
			Four:{
				base: 110
			},
			Five:{
				base: 140
			}

		},
		E:{
			One :{
				base: 80
			},
			Two:{
				base: 130
			},
			Three:{
				base: 180
			},
			Four:{
				base: 230
			},
			Five:{
				base: 280
			}

		},
		R:{
			One :{
				base: 200
			},
			Two:{
				base: 300
			},
			Three:{
				base: 400
			}

		}
	},
	Cassiopeia:{
		Q:{
			One :{
				base: 25
			},
			Two:{
				base: 40
			},
			Three:{
				base: 55
			},
			Four:{
				base: 70
			},
			Five:{
				base: 85
			}

		},
		W:{
			One :{
				base: 20
			},
			Two:{
				base: 35
			},
			Three:{
				base: 50
			},
			Four:{
				base: 65
			},
			Five:{
				base: 80
			}

		},
		E:{
			One :{
				baseone:52,
				basetwo:10
			},
			Two:{
				baseone:68,
				basetwo:40
			},
			Three:{
				baseone:88,
				basetwo:70
			},
			Four:{
				baseone:100,
				basetwo:100
			},
			Five:{
				baseone:120,
				basetwo:130
			}

		},
		R:{
			One :{
				base: 150
			},
			Two:{
				base: 250
			},
			Three:{
				base: 350
			}
		}
	},
	Caitlyn:{
		Q:{
			One :{
				base: 30,
				ratio: 1.3
			},
			Two:{
				base: 70,
				ratio: 1.4
			},
			Three:{
				base: 110,
				ratio: 1.5
			},
			Four:{
				base: 150,
				ratio: 1.6
			},
			Five:{
				base: 190,
				ratio: 1.7
			}

		},
		W:{
			One :{
				base: 30
			},
			Two:{
				base: 70
			},
			Three:{
				base: 110
			},
			Four:{
				base: 150
			},
			Five:{
				base: 190
			}

		},
		E:{
			One :{
				base: 70
			},
			Two:{
				base: 110
			},
			Three:{
				base: 150
			},
			Four:{
				base: 190
			},
			Five:{
				base: 230
			}

		},
		R:{
			One :{
				base: 250
			},
			Two:{
				base: 475
			},
			Three:{
				base: 700
			}

		}
	},
	Rakan:{
		Q:{
			One :{
				base: 70
			},
			Two:{
				base: 115
			},
			Three:{
				base: 160
			},
			Four:{
				base: 205
			},
			Five:{
				base: 250
			}

		},
		W:{
			One :{
				base: 70
			},
			Two:{
				base: 110
			},
			Three:{
				base: 150
			},
			Four:{
				base: 190
			},
			Five:{
				base: 230
			}

		},
		R:{
			One :{
				base: 100
			},
			Two:{
				base: 200
			},
			Three:{
				base: 300
			}

		}
	},
	Tryndamere:{
		E:{
			One :{
				base: 70
			},
			Two:{
				base: 100
			},
			Three:{
				base: 130
			},
			Four:{
				base: 160
			},
			Five:{
				base: 190
			}

		}
	},
	DrMundo:{
		W:{
			One :{
				base: 17.5
			},
			Two:{
				base: 25
			},
			Three:{
				base: 32.5
			},
			Four:{
				base: 40
			},
			Five:{
				base: 47.5
			}

		},
		E:{
			One :{
				base: 60,
				ratio: 0.03
			},
			Two:{
				base: 100,
				ratio: 0.035
			},
			Three:{
				base: 140,
				ratio: 0.04
			},
			Four:{
				base: 180,
				ratio: 0.045
			},
			Five:{
				base: 220,
				ratio:0.05
			}

		}
	}
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	Position: "",
	Q: 0,
	W: 0,
	E: 0,
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
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
	R: 0,
	AP: 0,
	AD: 0,
	armor: 0,
	HP: 0,
	attackspeed : 0,
	critchance : 0,
	spellblock : 0,
	cd: 0,
	apPen: 0,
	adPen: 0,
	critdmg: 0			
}
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
function particpiantObj(partid, champ, lane, role, team, runes, masteries){
	this.partid= partid;
	this.champ= champ;
	this.lane= lane;
	this.role= role;
	this.team= team;
	this.runes = runes;
	this.masteries = masteries;
}
function itemObj(id, name, stats, description, plaintext){
	this.id = id;
	this.name = name;
	this.stats = stats;
	this.description = description;
	this.plaintext = plaintext;
}
function runeObj(id, name, stats, description){
	this.id = id;
	this.name = name;
	this.stats = stats;
	this.description = description;
}
function masteryObj(id, name, description){
	this.id = id;
	this.name = name;
	this.description = description;
}
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
$(document).ready(function () {
	getData(temButtons, temItem);

})
function getData(cb, cb2){
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
		cb2(timeline, getItems)		
	})

} 
//========================= Handling Participant and Champion Base Information Data ==================================
function loadParticipants(participants, cb){
	var result;
	for (i=0; i<participants.length; i++){
		let id = participants[i].participantId
		let champ = participants[i].championId
		let lane = participants[i].timeline.lane
		let role = participants[i].timeline.role
		let team = participants[i].teamId
		let runes = participants[i].runes
		let masteries = participants[i].masteries
		var currentpart = new particpiantObj(id, champ, lane, role, team, runes, masteries);
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
	cb(currentchamp, appendChampDiv, temRunes, temMasteries)
}

function appendChampObj(current, cb, cb2, cb3){
	var count = 0;
	for(i=0; i < parts.length; i++){
		count++		
		if(parts[i].champ == current.id){			
			console.log("Match! Champ Name : "+ current.name)
			console.log("Their Participant Id is : "+ parts[i].partid)
			console.log("Lane : "+ parts[i].lane)
			console.log("Role : "+ parts[i].role)				
			console.log("Team : "+ parts[i].team)
			parts[i].champname = current.name
			let imgname = current.name.split(' ').join('');
			parts[i].imgurl = "http://ddragon.leagueoflegends.com/cdn/7.9.1/img/champion/"+imgname+".png";	
					
		}else if(count == 10){
			return
		}

	}

	cb(parts)
	cb2(getRunes)
	cb3(getMasteries)
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
//========================= End Handling Participant and Champion Base Information Data ================================
// =========================Handling Event Buttons ======================================================================
function temButtons(timeline){
	const allframes = timeline.frames
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
//========================================= Creating Objects for Static Rune Data==============================================
function temRunes(cb){
	const allparticipants = parts
	for(i=0; i<allparticipants.length; i++){
		let runeobj = parts[i].runes
		runeobj.forEach(function(value){
			let rune = value.runeId
			if(allrunes.indexOf(rune) ==-1){
				allrunes.push(rune)
				cb(rune, createRuneObj)
			}else{

			}

		})
	}
}
function getRunes(rune, cb){
	$.ajax({
		url:"/admin/rune/id/"+rune,
		method:"GET"
	}).done(function(data){
		var runeobj = data.results	
		cb(runeobj, temmie)
	})
}
function createRuneObj(static, cb){
	let id = static.id
	let name = static.name
	let stats = static.stats
	let description = static.description
	var currentrune = new runeObj(id, name, stats, description)
	runeStaticData.push(currentrune)
}
//======================================= Creating Objects for Static Mastery Data=================================================
function temMasteries(cb){
	const allparticipants = parts
	for(i=0; i<allparticipants.length; i++){
		let masteryarr = parts[i].masteries
		for(j=0; j<masteryarr.length; j++){
			let mastery = masteryarr[j].masteryId
			if(allmastery.indexOf(mastery) ==-1){
				allmastery.push(mastery)
				cb(mastery, createMasteryObj)
			}
		}
	}
}
function getMasteries(mastery, cb){
	$.ajax({
		url:"/admin/mastery/id/"+mastery,
		method:"GET"
	}).done(function(data){
		var masteryobj = data.results	
		cb(masteryobj, temmie)
	})
}
function createMasteryObj(static, cb){
	let id = static.id
	let name = static.name
	let description = static.description
	var currentmastery = new masteryObj(id, name, description)
	masteryStaticData.push(currentmastery)
}
// ========================================= Creating Objects for Static Item Data ======================================
function temItem(timeline, cb){
	const allframes = timeline.frames
	for(i=0; i < allframes.length; i++){
		var events = allframes[i].events
		if(events){
			for(j=0; j< events.length; j++){
				event = events[j]
				eventType = event.eventType
				if(eventType == "ITEM_PURCHASED" ){
					if(allitems.indexOf(event.itemId) == -1){
						allitems.push(event.itemId)
						cb(event.itemId, createItemObj)	
					}else{
						
					}

				}else{

				}
			}
		}
	}

}
function getItems(item, cb){
	$.ajax({
		url:"/admin/item/id/"+item,
		method:"GET"
	}).done(function(data){
		var itemobj = data.results	
		cb(itemobj, temmie)
	})
}
function createItemObj(static, cb){
	let id = static.id
	let name = static.name
	let stats = static.stats
	let description = static.description
	let plaintext = static.plaintext
	var currentitem = new itemObj (id, name, stats, description, plaintext)
	itemStaticData.push(currentitem)
}
// =========================================== Event Listener =================================================================
$("body").on("click", ".objectiveButton", function(e){
	var timestamp = $(this).attr("data-timestamp")
	temButtonHandler(timestamp, timeHandler)
});

function temButtonHandler(timestamp, cb){
	cb(timestamp, frameRequest)
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
	champ1Obj.AP = 0
	champ1Obj.AD = 0	
	champ1Obj.armor = 0
	champ1Obj.HP = 0
	champ1Obj.attackspeed = 0
	champ1Obj.critchance = 0
	champ1Obj.spellblock = 0
	champ1Obj.cd = 0
	champ1Obj.apPen = 0
	champ1Obj.adPen = 0
	champ1Obj.critdmg = 0	
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
	champ2Obj.AP = 0
	champ2Obj.AD = 0
	champ2Obj.armor = 0	
	champ2Obj.HP = 0
	champ2Obj.attackspeed = 0
	champ2Obj.critchance = 0
	champ2Obj.spellblock = 0
	champ2Obj.cd = 0
	champ2Obj.apPen = 0
	champ2Obj.adPen = 0
	champ2Obj.critdmg = 0				
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
	champ3Obj.AP = 0
	champ3Obj.AD = 0
	champ3Obj.armor = 0
	champ3Obj.HP = 0
	champ3Obj.attackspeed = 0
	champ3Obj.critchance = 0
	champ3Obj.spellblock = 0
	champ3Obj.cd = 0
	champ3Obj.apPen = 0
	champ3Obj.adPen = 0
	champ3Obj.critdmg = 0						
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
	champ4Obj.AP = 0
	champ4Obj.AD = 0
	champ4Obj.armor = 0
	champ4Obj.HP = 0
	champ4Obj.attackspeed = 0
	champ4Obj.critchance = 0
	champ4Obj.spellblock = 0
	champ4Obj.cd = 0
	champ4Obj.apPen = 0
	champ4Obj.adPen = 0
	champ4Obj.critdmg = 0					
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
	champ5Obj.AP = 0
	champ5Obj.AD = 0
	champ5Obj.armor = 0
	champ5Obj.HP = 0
	champ5Obj.attackspeed = 0
	champ5Obj.critchance = 0
	champ5Obj.spellblock = 0
	champ5Obj.cd = 0
	champ5Obj.apPen = 0
	champ5Obj.adPen = 0
	champ5Obj.critdmg = 0						
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
	champ6Obj.AP = 0
	champ6Obj.AD = 0
	champ6Obj.armor = 0	
	champ6Obj.HP = 0
	champ6Obj.attackspeed = 0
	champ6Obj.critchance = 0
	champ6Obj.spellblock = 0
	champ6Obj.cd = 0
	champ6Obj.apPen = 0
	champ6Obj.adPen = 0
	champ6Obj.critdmg = 0					
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
	champ7Obj.AP = 0
	champ7Obj.AD = 0
	champ7Obj.armor = 0
	champ7Obj.HP = 0
	champ7Obj.attackspeed = 0
	champ7Obj.critchance = 0
	champ7Obj.spellblock = 0
	champ7Obj.cd = 0
	champ7Obj.apPen = 0
	champ7Obj.adPen = 0
	champ7Obj.critdmg = 0						
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
	champ8Obj.AP = 0
	champ8Obj.AD = 0
	champ8Obj.armor = 0
	champ8Obj.HP = 0
	champ8Obj.attackspeed = 0
	champ8Obj.critchance = 0
	champ8Obj.spellblock = 0
	champ8Obj.cd = 0
	champ8Obj.apPen = 0
	champ8Obj.adPen = 0
	champ8Obj.critdmg = 0						
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
	champ9Obj.AP = 0
	champ9Obj.AD = 0
	champ9Obj.armor = 0
	champ9Obj.HP = 0
	champ9Obj.attackspeed = 0
	champ9Obj.critchance = 0
	champ9Obj.spellblock = 0
	champ9Obj.cd = 0
	champ9Obj.apPen = 0
	champ9Obj.adPen = 0
	champ9Obj.critdmg = 0					
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
	champ10Obj.AP = 0
	champ10Obj.AD = 0
	champ10Obj.armor = 0
	champ10Obj.HP = 0
	champ10Obj.attackspeed = 0
	champ10Obj.critchance = 0
	champ10Obj.spellblock = 0
	champ10Obj.cd = 0
	champ10Obj.apPen = 0
	champ10Obj.adPen = 0
	champ10Obj.critdmg = 0											
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
	cb(timestamp, timeProcessor, temItemStats)
}
function frameRequest(timeRequested, cb, cb2){
	const allframes = timeline.frames
	var timeRequested = parseInt(timeRequested)
	var event;
	var events = [];
	var itemProcessor;	
	var skillProcessor;
	partProcessor(temmie)	 
	for(i=1; i < allframes.length; i++){
		var events = allframes[i].events
			for(j=0; j<events.length; j++){
				event = events[j]
				eventType = event.eventType
				timestamp = event.timestamp
				timeProcessor(event, eventType, timestamp, timeRequested, eventProcessor)
				if(loopBreak){
					cb2(temDmgCalc);
					return false;
				}
			}
	}
}
function partProcessor(cb){
	var cb = cb
	var runeProcessor;
	var masteryProcessor;
	var baseProcessor;
	for(i=0; i<parts.length; i++){
		var participant = parts[i].partid
		var participant = parseInt(participant)
		switch (participant){
			case 1:
					cb = champ1Processor
					runeProcessor = champ1RuneProcessor
					masteryProcessor = champ1MasteryProcessor
					baseProcessor = champ1BaseProcessor
					break;
			case 2:
					cb = champ2Processor
					runeProcessor = champ2RuneProcessor
					masteryProcessor = champ2MasteryProcessor
					baseProcessor = champ2BaseProcessor
					break;
			case 3:
					cb = champ3Processor
					runeProcessor = champ3RuneProcessor
					masteryProcessor = champ3MasteryProcessor
					baseProcessor = champ3BaseProcessor
					break;
			case 4:
					cb = champ4Processor
					runeProcessor = champ4RuneProcessor
					masteryProcessor = champ4MasteryProcessor
					baseProcessor = champ4BaseProcessor
					break;
			case 5:
					cb = champ5Processor
					runeProcessor = champ5RuneProcessor
					masteryProcessor = champ5MasteryProcessor
					baseProcessor = champ5BaseProcessor
					break;
			case 6:
					cb = champ6Processor
					runeProcessor = champ6RuneProcessor
					masteryProcessor = champ6MasteryProcessor
					baseProcessor = champ6BaseProcessor
					break;
			case 7:
					cb = champ7Processor
					runeProcessor = champ7RuneProcessor
					masteryProcessor = champ7MasteryProcessor
					baseProcessor = champ7BaseProcessor
					break;
			case 8:
					cb = champ8Processor
					runeProcessor = champ8RuneProcessor
					masteryProcessor = champ8MasteryProcessor
					baseProcessor = champ8BaseProcessor
					break;
			case 9:
					cb = champ9Processor
					runeProcessor = champ9RuneProcessor
					masteryProcessor = champ9MasteryProcessor
					baseProcessor = champ9BaseProcessor
					break;
			case 10:
					cb = champ10Processor
					runeProcessor = champ10RuneProcessor
					masteryProcessor = champ10MasteryProcessor
					baseProcessor = champ10BaseProcessor
					break;
			default:
					cb = temmie
					break;
		}
		cb(parts[i], runeProcessor, masteryProcessor, baseProcessor)
	}
}
function champ1Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, champMasteryAppend)
	cb3(participant, champBaseAppend)
}
function champ2Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)	
}
function champ3Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ4Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ5Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ6Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ7Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ8Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ9Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}
function champ10Processor(participant, cb1, cb2, cb3){
	var participant = participant
	var runes = participant.runes
	var masteries = participant.masteries
	cb1(runes, champRuneAppend)
	cb2(masteries, temmie)
}

function champ1RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ1Obj, temmie)
	})
}
function champ1MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ1Obj, temmie)
	})
}
function champ1BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ1Obj)
		}
	})
}
function champ2RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ2Obj, temmie)

	})
}
function champ2MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ2Obj, temmie)
	})	
}
function champ2BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ2Obj)
		}
	})
}
function champ3RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ3Obj, temmie)

	})
}
function champ3MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ3Obj, temmie)
	})	
}
function champ3BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ3Obj)
		}
	})	
}
function champ4RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ4Obj, temmie)

	})
}
function champ4MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ4Obj, temmie)
	})	
}
function champ4BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ4Obj)
		}
	})		
}
function champ5RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ5Obj, temmie)

	})
}
function champ5MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ5Obj, temmie)
	})	
}
function champ5BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ5Obj)
		}
	})		
}
function champ6RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ6Obj, temmie)

	})
}
function champ6MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ6Obj, temmie)
	})	
}
function champ6BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ6Obj)
		}
	})		
}
function champ7RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ7Obj, temmie)

	})
}
function champ7MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ7Obj, temmie)
	})	
}
function champ7BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ7Obj)
		}
	})		
}
function champ8RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ8Obj, temmie)

	})
}
function champ8MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ8Obj, temmie)
	})	
}
function champ8BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ8Obj)
		}
	})		
}
function champ9RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ9Obj, temmie)

	})
}
function champ9MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ9Obj, temmie)
	})	
}
function champ9BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ9Obj)
		}
	})		
}
function champ10RuneProcessor(runes, cb){
	var runes = runes
	runes.forEach(function(value){
		var multiplier = parseInt(value.rank)
		var runeId = value.runeId
		cb(runeId, multiplier, champ10Obj, temmie)

	})
}
function champ10MasteryProcessor(masteries, cb){
	var masteries = masteries
	masteries.forEach(function(value){
		var rank = value.rank
		var masteryId = value.masteryId
		cb(masteryId, rank, champ10Obj, temmie)
	})	
}
function champ10BaseProcessor(participant, cb){
	var participant = parseInt(participant.champ)
	$.each(champStaticData, function(key, value){
		var champStaticObj =value
		var id = champStaticObj.id
		if(participant == id){
			cb(champStaticObj, champ10Obj)
		}
	})		
}
function champRuneAppend(runeId, multiplier, champObj, cb){
	var runeToSearch = parseInt(runeId)
	var multiplier = parseInt(multiplier)
	var champObj = champObj
	$.each(runeStaticData, function(key, value){
		var runeobj = value
		if(runeobj.id == runeToSearch){
			if(runeobj.stats){
				runedata= runeobj.stats
				$.each(runedata, function(key, value){
					if (key == "FlatPhysicalDamageMod"){
						let AD = parseFloat(value) * multiplier
						let newAD = parseFloat(champObj.AD) + AD
						champObj.AD = newAD
					} else if(key == "FlatSpellBlockMod"){
						let spellblock = parseFloat(value) * multiplier
						let newspellblock = parseFloat(champObj.spellblock) + spellblock
						champObj.spellblock = newspellblock						
					} else if(key == "PercentAttackSpeedMod"){
						let attackspeed = parseFloat(value) * multiplier
						let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
						champObj.attackspeed = newattackspeed
					} else if (key == "rFlatMagicPenetrationMod"){
						let apPen = parseFloat(value) * multiplier
						let newapPen = parseFloat(champObj.apPen) + apPen
						champObj.apPen = newapPen
					} else if (key == "FlatMagicDamageMod"){
						let AP = parseFloat(value) * multiplier
						let newAP = parseFloat(champObj.AP) + AP
						champObj.AP = newAP						
					} else if (key == "FlatCritChanceMod"){
						let critchance = parseFloat(value) * multiplier
						let newcritchance = parseFloat(champObj.critchance) + critchance
						champObj.critchance = newcritchance							
					} else if (key == "FlatCritDamageMod"){
						let critdamage = parseFloat(value) * multiplier
						let newcritdamage = parseFloat(champObj.critdamage) + critdamage
						champObj.critdamage = newcritdamage							
					} else if (key == "FlatArmorMod"){
						let armor = parseFloat(value) * multiplier
						let newarmor = parseFloat(champObj.armor) + armor
						champObj.armor = newarmor						
					}
				})
			}
		}
	})

}
function champMasteryAppend(masteryId, rank, champObj, cb){
	var masteryToCompare = parseInt(masteryId)
	var rank = rank
	var champObj = champObj
	if(masteryToCompare == 6111){
		if(rank == 1){
			let attackspeed = 0.008
			let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
			champObj.attackspeed = newattackspeed
		}else if(rank ==2){
			let attackspeed = 0.016
			let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
			champObj.attackspeed = newattackspeed
		}else if(rank ==3){
			let attackspeed = 0.024
			let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
			champObj.attackspeed = newattackspeed
		}else if(rank ==4){
			let attackspeed = 0.032
			let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
			champObj.attackspeed = newattackspeed
		}else if(rank ==5){
			let attackspeed = 0.04
			let newattackspeed = parseFloat(champObj.attackspeed) + attackspeed
			champObj.attackspeed = newattackspeed
		}
	}else if (masteryToCompare == 6352){
		if(rank == 1){
			let cd = -0.01
			let newcd = parseFloat(champObj.cd) + cd
			champObj.cd = newcd
		}else if(rank ==2){
			let cd = -0.02
			let newcd = parseFloat(champObj.cd) + cd
			champObj.cd = newcd
		}else if(rank ==3){
			let cd = -0.03
			let newcd = parseFloat(champObj.cd) + cd
			champObj.cd = newcd
		}else if(rank ==4){
			let cd = -0.04
			let newcd = parseFloat(champObj.cd) + cd
			champObj.cd = newcd
		}else if(rank ==5){
			let cd = -0.05
			let newcd = parseFloat(champObj.cd) + cd
			champObj.cd = newcd
		}
	}else if(masteryToCompare == 6232){
		if(rank == 1){
			let hp = -0.01
			let newhp = parseFloat(champObj.hp) + hp
			champObj.hp = newhp
		}else if(rank ==2){
			let hp = -0.02
			let newhp = parseFloat(champObj.hp) + hp
			champObj.hp = newhp
		}else if(rank ==3){
			let hp = -0.03
			let newhp = parseFloat(champObj.hp) + hp
			champObj.hp = newhp
		}else if(rank ==4){
			let hp = -0.04
			let newhp = parseFloat(champObj.hp) + hp
			champObj.hp = newhp
		}else if(rank ==5){
			let hp = -0.05
			let newhp = parseFloat(champObj.hp) + hp
			champObj.hp = newhp
		}		
	}

}
function champBaseAppend(champStaticObj, champObj){
	var staticAd = champStaticObj.ad
	var staticArmor = champStaticObj.armor
	var staticHp = champStaticObj.hp
	var staticSpellblock = champStaticObj.spellblock
	let AD = parseFloat(staticAd)
	let newAD = parseFloat(champObj.AD) + AD
	champObj.AD = newAD
	let armor = parseFloat(staticArmor)
	let newArmor = parseFloat(champObj.armor) + armor
	champObj.armor = newArmor
	let HP = parseFloat(staticHp)
	let newHP = parseFloat(champObj.HP)+ HP
	champObj.HP = newHP
	let spellBlock = parseFloat(staticSpellblock)
	let newSpellBlock = parseFloat(champObj.spellblock) + spellBlock
	champObj.spellblock = newSpellBlock
	console.log(champObj)
}
function timeProcessor(event, eventType, timestamp, timeRequested, cb){
	var event = event
	timestamp = parseInt(event.timestamp)
	if(timestamp < timeRequested){			
		cb(event, eventType, itemAppend, skillAppend)
	}else if( timestamp == timeRequested){
		cb(event, eventType, itemAppend, skillAppend)
		loopBreak = true
		return false;
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
// =================================Dynamic Item Tracker=========================================================================================
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ1Obj.ItemTrinket = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item1 == "0"){
		champ1Obj.Item1 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item2 == "0"){
		champ1Obj.Item2 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item3 == "0"){
		champ1Obj.Item3 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item4 == "0"){
		champ1Obj.Item4 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item5 == "0"){
		champ1Obj.Item5 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item6 == "0"){
		champ1Obj.Item6 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_PURCHASED" && champ1Obj.Item7 == "0"){
		champ1Obj.Item7 = item
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ1Obj.Item1 == item){
		champ1Obj.Item1 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item2 == item){
		champ1Obj.Item2 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item3 == item){
		champ1Obj.Item3 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item4 == item){
		champ1Obj.Item4 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item5 == item){
		champ1Obj.Item5 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item6 == item){
		champ1Obj.Item6 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ1Obj.Item7 == item){
		champ1Obj.Item7 = "0"
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ1Obj.Item1 == event.itemBefore){
		champ1Obj.Item1 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item2 == event.itemBefore){
		champ1Obj.Item2 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item3 == event.itemBefore){
		champ1Obj.Item3 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item4 == event.itemBefore){
		champ1Obj.Item4 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item5 == event.itemBefore){
		champ1Obj.Item5 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part1inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item6 == event.itemBefore){
		champ1Obj.Item6 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv

		$("#part1inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ1Obj.Item7 == event.itemBefore){
		champ1Obj.Item7 = event.itemAfter
		
		$.each(champ1Obj, function(key, value){
			inventorydiv = inventorydiv +"<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ2Obj.ItemTrinket = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item1 == "0"){
		champ2Obj.Item1 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item2 == "0"){
		champ2Obj.Item2 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item3 == "0"){
		champ2Obj.Item3 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item4 == "0"){
		champ2Obj.Item4 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item5 == "0"){
		champ2Obj.Item5 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item6 == "0"){
		champ2Obj.Item6 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ2Obj.Item7 == "0"){
		champ2Obj.Item7 = item
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ2Obj.Item1 == item){
		champ2Obj.Item1 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item2 == item){
		champ2Obj.Item2 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item3 == item){
		champ2Obj.Item3 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item4 == item){
		champ2Obj.Item4 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item5 == item){
		champ2Obj.Item5 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item6 == item){
		champ2Obj.Item6 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ2Obj.Item7 == item){
		champ2Obj.Item7 = "0"
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")						
			return
	}else if(eventType == "ITEM_UNDO" && champ2Obj.Item1 == event.itemBefore){
		champ2Obj.Item1 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item2 == event.itemBefore){
		champ2Obj.Item2 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item3 == event.itemBefore){
		champ2Obj.Item3 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item4 == event.itemBefore){
		champ2Obj.Item4 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item5 == event.itemBefore){
		champ2Obj.Item5 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item6 == event.itemBefore){
		champ2Obj.Item6 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part2inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ2Obj.Item7 == event.itemBefore){
		champ2Obj.Item7 = event.itemAfter
		
		$.each(champ2Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ3Obj.ItemTrinket = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item1 == "0"){
		champ3Obj.Item1 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item2 == "0"){
		champ3Obj.Item2 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item3 == "0"){
		champ3Obj.Item3 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item4 == "0"){
		champ3Obj.Item4 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item5 == "0"){
		champ3Obj.Item5 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item6 == "0"){
		champ3Obj.Item6 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ3Obj.Item7 == "0"){
		champ3Obj.Item7 = item
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ3Obj.Item1 == item){
		champ3Obj.Item1 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item2 == item){
		champ3Obj.Item2 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item3 == item){
		champ3Obj.Item3 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item4 == item){
		champ3Obj.Item4 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item5 == item){
		champ3Obj.Item5 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item6 == item){
		champ3Obj.Item6 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ3Obj.Item7 == item){
		champ3Obj.Item7 = "0"
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ3Obj.Item1 == event.itemBefore){
		champ3Obj.Item1 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item2 == event.itemBefore){
		champ3Obj.Item2 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item3 == event.itemBefore){
		champ3Obj.Item3 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item4 == event.itemBefore){
		champ3Obj.Item4 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item5 == event.itemBefore){
		champ3Obj.Item5 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item6 == event.itemBefore){
		champ3Obj.Item6 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part3inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ3Obj.Item7 == event.itemBefore){
		champ3Obj.Item7 = event.itemAfter
		
		$.each(champ3Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ4Obj.ItemTrinket = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item1 == "0"){
		champ4Obj.Item1 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item2 == "0"){
		champ4Obj.Item2 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item3 == "0"){
		champ4Obj.Item3 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item4 == "0"){
		champ4Obj.Item4 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item5 == "0"){
		champ4Obj.Item5 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item6 == "0"){
		champ4Obj.Item6 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ4Obj.Item7 == "0"){
		champ4Obj.Item7 = item
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ4Obj.Item1 == item){
		champ4Obj.Item1 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item2 == item){
		champ4Obj.Item2 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item3 == item){
		champ4Obj.Item3 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item4 == item){
		champ4Obj.Item4 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item5 == item){
		champ4Obj.Item5 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item6 == item){
		champ4Obj.Item6 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ4Obj.Item7 == item){
		champ4Obj.Item7 = "0"
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if(eventType == "ITEM_UNDO" && champ4Obj.Item1 == event.itemBefore){
		champ4Obj.Item1 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item2 == event.itemBefore){
		champ4Obj.Item2 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item3 == event.itemBefore){
		champ4Obj.Item3 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item4 == event.itemBefore){
		champ4Obj.Item4 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item5 == event.itemBefore){
		champ4Obj.Item5 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item6 == event.itemBefore){
		champ4Obj.Item6 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part4inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ4Obj.Item7 == event.itemBefore){
		champ4Obj.Item7 = event.itemAfter
		
		$.each(champ4Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ5Obj.ItemTrinket = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item1 == "0"){
		champ5Obj.Item1 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});		
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item2 == "0"){
		champ5Obj.Item2 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});	
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")					
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item3 == "0"){
		champ5Obj.Item3 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item4 == "0"){
		champ5Obj.Item4 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item5 == "0"){
		champ5Obj.Item5 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item6 == "0"){
		champ5Obj.Item6 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_PURCHASED" && champ5Obj.Item7 == "0"){
		champ5Obj.Item7 = item
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")		
	}else if(eventType == "ITEM_DESTROYED" && champ5Obj.Item1 == item){
		champ5Obj.Item1 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item2 == item){
		champ5Obj.Item2 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item3 == item){
		champ5Obj.Item3 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item4 == item){
		champ5Obj.Item4 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item5 == item){
		champ5Obj.Item5 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item6 == item){
		champ5Obj.Item6 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if (eventType == "ITEM_DESTROYED" && champ5Obj.Item7 == item){
		champ5Obj.Item7 = "0"
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")							
			return
	}else if(eventType == "ITEM_UNDO" && champ5Obj.Item1 == event.itemBefore){
		champ5Obj.Item1 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item2 == event.itemBefore){
		champ5Obj.Item2 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
		return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item3 == event.itemBefore){
		champ5Obj.Item3 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return 
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item4 == event.itemBefore){
		champ5Obj.Item4 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item5 == event.itemBefore){
		champ5Obj.Item5 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item6 == event.itemBefore){
		champ5Obj.Item6 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part5inventory").html("<div>"+print+"</div>")						
			return
	}else if (eventType == "ITEM_UNDO" && champ5Obj.Item7 == event.itemBefore){
		champ5Obj.Item7 = event.itemAfter
		
		$.each(champ5Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ6Obj.ItemTrinket = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item1 == "0"){
		champ6Obj.Item1 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item2 == "0"){
		champ6Obj.Item2 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item3 == "0"){
		champ6Obj.Item3 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item4 == "0"){
		champ6Obj.Item4 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item5 == "0"){
		champ6Obj.Item5 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item6 == "0"){
		champ6Obj.Item6 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ6Obj.Item7 == "0"){
		champ6Obj.Item7 = item
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ6Obj.Item1 == item){
		champ6Obj.Item1 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item2 == item){
		champ6Obj.Item2 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")					
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item3 == item){
		champ6Obj.Item3 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item4 == item){
		champ6Obj.Item4 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item5 == item){
		champ6Obj.Item5 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item6 == item){
		champ6Obj.Item6 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ6Obj.Item7 == item){
		champ6Obj.Item7 = "0"
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ6Obj.Item1 == event.itemBefore){
		champ6Obj.Item1 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item2 == event.itemBefore){
		champ6Obj.Item2 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item3 == event.itemBefore){
		champ6Obj.Item3 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item4 == event.itemBefore){
		champ6Obj.Item4 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item5 == event.itemBefore){
		champ6Obj.Item5 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item6 == event.itemBefore){
		champ6Obj.Item6 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part6inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ6Obj.Item7 == event.itemBefore){
		champ6Obj.Item7 = event.itemAfter
		
		$.each(champ6Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ7Obj.ItemTrinket = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item1 == "0"){
		champ7Obj.Item1 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item2 == "0"){
		champ7Obj.Item2 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item3 == "0"){
		champ7Obj.Item3 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item4 == "0"){
		champ7Obj.Item4 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item5 == "0"){
		champ7Obj.Item5 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item6 == "0"){
		champ7Obj.Item6 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ7Obj.Item7 == "0"){
		champ7Obj.Item7 = item
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ7Obj.Item1 == item){
		champ7Obj.Item1 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item2 == item){
		champ7Obj.Item2 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item3 == item){
		champ7Obj.Item3 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item4 == item){
		champ7Obj.Item4 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item5 == item){
		champ7Obj.Item5 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item6 == item){
		champ7Obj.Item6 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ7Obj.Item7 == item){
		champ7Obj.Item7 = "0"
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ7Obj.Item1 == event.itemBefore){
		champ7Obj.Item1 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item2 == event.itemBefore){
		champ7Obj.Item2 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item3 == event.itemBefore){
		champ7Obj.Item3 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item4 == event.itemBefore){
		champ7Obj.Item4 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item5 == event.itemBefore){
		champ7Obj.Item5 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item6 == event.itemBefore){
		champ7Obj.Item6 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part7inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ7Obj.Item7 == event.itemBefore){
		champ7Obj.Item7 = event.itemAfter
		
		$.each(champ7Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ8Obj.ItemTrinket = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")		
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item1 == "0"){
		champ8Obj.Item1 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item2 == "0"){
		champ8Obj.Item2 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item3 == "0"){
		champ8Obj.Item3 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item4 == "0"){
		champ8Obj.Item4 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item5 == "0"){
		champ8Obj.Item5 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item6 == "0"){
		champ8Obj.Item6 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ8Obj.Item7 == "0"){
		champ8Obj.Item7 = item
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ8Obj.Item1 == item){
		champ8Obj.Item1 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item2 == item){
		champ8Obj.Item2 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item3 == item){
		champ8Obj.Item3 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item4 == item){
		champ8Obj.Item4 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item5 == item){
		champ8Obj.Item5 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item6 == item){
		champ8Obj.Item6 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ8Obj.Item7 == item){
		champ8Obj.Item7 = "0"
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ8Obj.Item1 == event.itemBefore){
		champ8Obj.Item1 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item2 == event.itemBefore){
		champ8Obj.Item2 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
		return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item3 == event.itemBefore){
		champ8Obj.Item3 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item4 == event.itemBefore){
		champ8Obj.Item4 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item5 == event.itemBefore){
		champ8Obj.Item5 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item6 == event.itemBefore){
		champ8Obj.Item6 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part8inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ8Obj.Item7 == event.itemBefore){
		champ8Obj.Item7 = event.itemAfter
		
		$.each(champ8Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ9Obj.ItemTrinket = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item1 == "0"){
		champ9Obj.Item1 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item2 == "0"){
		champ9Obj.Item2 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item3 == "0"){
		champ9Obj.Item3 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item4 == "0"){
		champ9Obj.Item4 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item5 == "0"){
		champ9Obj.Item5 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item6 == "0"){
		champ9Obj.Item6 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_PURCHASED" && champ9Obj.Item7 == "0"){
		champ9Obj.Item7 = item
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if(eventType == "ITEM_DESTROYED" && champ9Obj.Item1 == item){
		champ9Obj.Item1 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item2 == item){
		champ9Obj.Item2 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item3 == item){
		champ9Obj.Item3 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item4 == item){
		champ9Obj.Item4 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item5 == item){
		champ9Obj.Item5 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item6 == item){
		champ9Obj.Item6 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ9Obj.Item7 == item){
		champ9Obj.Item7 = "0"
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ9Obj.Item1 == event.itemBefore){
		champ9Obj.Item1 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item2 == event.itemBefore){
		champ9Obj.Item2 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item3 == event.itemBefore){
		champ9Obj.Item3 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return 
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item4 == event.itemBefore){
		champ9Obj.Item4 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item5 == event.itemBefore){
		champ9Obj.Item5 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item6 == event.itemBefore){
		champ9Obj.Item6 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part9inventory").html("<div>"+print+"</div>")			
			return
	}else if (eventType == "ITEM_UNDO" && champ9Obj.Item7 == event.itemBefore){
		champ9Obj.Item7 = event.itemAfter
		
		$.each(champ9Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
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
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && trinket.indexOf(item) !== -1){
		champ10Obj.ItemTrinket = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return			
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item1 == "0"){
		champ10Obj.Item1 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item2 == "0"){
		champ10Obj.Item2 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item3 == "0"){
		champ10Obj.Item3 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item4 == "0"){
		champ10Obj.Item4 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return		
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item5 == "0"){
		champ10Obj.Item5 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item6 == "0"){
		champ10Obj.Item6 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_PURCHASED" && champ10Obj.Item7 == "0"){
		champ10Obj.Item7 = item
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_DESTROYED" && champ10Obj.Item1 == item){
		champ10Obj.Item1 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item2 == item){
		champ10Obj.Item2 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item3 == item){
		champ10Obj.Item3 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return 
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item4 == item){
		champ10Obj.Item4 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item5 == item){
		champ10Obj.Item5 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")					
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item6 == item){
		champ10Obj.Item6 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_DESTROYED" && champ10Obj.Item7 == item){
		champ10Obj.Item7 = "0"
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if(eventType == "ITEM_UNDO" && champ10Obj.Item1 == event.itemBefore){
		champ10Obj.Item1 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item2 == event.itemBefore){
		champ10Obj.Item2 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
		return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item3 == event.itemBefore){
		champ10Obj.Item3 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return 
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item4 == event.itemBefore){
		champ10Obj.Item4 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item5 == event.itemBefore){
		champ10Obj.Item5 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item6 == event.itemBefore){
		champ10Obj.Item6 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}else if (eventType == "ITEM_UNDO" && champ10Obj.Item7 == event.itemBefore){
		champ10Obj.Item7 = event.itemAfter
		
		$.each(champ10Obj, function(key, value){
			inventorydiv = inventorydiv + "<span>"+key + "</span> Value: <img src = http://ddragon.leagueoflegends.com/cdn/7.9.1/img/item/"+value+".png>";
		});
		var print = inventorydiv
		$("#part10inventory").html("<div>"+print+"</div>")				
			return
	}
}
//============================================ Dynamic skill Point Tracker==============================================================================
function skillAppend(event, eventType, timestamp, partId, skillSlot, levelUpType, cb){
	console.log("I AM TEMMIE")
	if(levelUpType == "NORMAL"){
		cb(event, eventType, timestamp, skillSlot, partId, levelUpType)
	}else{
		console.log(event)
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
// ============================================= Adding Stats from Items ================================================================================
function temItemStats(cb){
	loopBreak = false
	if(champ1Obj.Item1 !== "0"){
		var id = champ1Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item2 !== "0"){
		var id = champ1Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item3 !== "0"){
		var id = champ1Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item4 !== "0"){
		var id = champ1Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item5 !== "0"){
		var id = champ1Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item6 !== "0"){
		var id = champ1Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ1Obj.Item7 !== "0"){
		var id = champ1Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ1Obj.AP) + parseFloat(AP)
							champ1Obj.AP = newAP
		
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ1Obj.AD) + parseFloat(AD)
							champ1Obj.AD = newAD
		
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ1Obj.armor) + parseFloat(armor)
							champ1Obj.armor = newArmor
		
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ1Obj.HP) + parseFloat(hp)
							champ1Obj.HP = newHP
		
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ1Obj.spellblock) + parseFloat(spellblock)
							champ1Obj.spellblock = newSpellblock
		
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ1Obj.attackspeed) + parseFloat(attackspeed)
							champ1Obj.attackspeed = newAttackSpeed
		
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ1Obj.critchance) + parseFloat(critchance)
							champ1Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}

	if(champ2Obj.Item1 !== "0"){
		var id = champ2Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item2 !== "0"){
		var id = champ2Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item3 !== "0"){
		var id = champ2Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item4 !== "0"){
		var id = champ2Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item5 !== "0"){
		var id = champ2Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item6 !== "0"){
		var id = champ2Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ2Obj.Item7 !== "0"){
		var id = champ2Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ2Obj.AP) + parseFloat(AP)
							champ2Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ2Obj.AD) + parseFloat(AD)
							champ2Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ2Obj.armor) + parseFloat(armor)
							champ2Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ2Obj.HP) + parseFloat(hp)
							champ2Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ2Obj.spellblock) + parseFloat(spellblock)
							champ2Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ2Obj.attackspeed) + parseFloat(attackspeed)
							champ2Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ2Obj.critchance) + parseFloat(critchance)
							champ2Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item1 !== "0"){
		var id = champ3Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item2 !== "0"){
		var id = champ3Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item3 !== "0"){
		var id = champ3Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item4 !== "0"){
		var id = champ3Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item5 !== "0"){
		var id = champ3Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item6 !== "0"){
		var id = champ3Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ3Obj.Item7 !== "0"){
		var id = champ3Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ3Obj.AP) + parseFloat(AP)
							champ3Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ3Obj.AD) + parseFloat(AD)
							champ3Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ3Obj.armor) + parseFloat(armor)
							champ3Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ3Obj.HP) + parseFloat(hp)
							champ3Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ3Obj.spellblock) + parseFloat(spellblock)
							champ3Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ3Obj.attackspeed) + parseFloat(attackspeed)
							champ3Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ3Obj.critchance) + parseFloat(critchance)
							champ3Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item1 !== "0"){
		var id = champ4Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item2 !== "0"){
		var id = champ4Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item3 !== "0"){
		var id = champ4Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item4 !== "0"){
		var id = champ4Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item5 !== "0"){
		var id = champ4Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item6 !== "0"){
		var id = champ4Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ4Obj.Item7 !== "0"){
		var id = champ4Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ4Obj.AP) + parseFloat(AP)
							champ4Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ4Obj.AD) + parseFloat(AD)
							champ4Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ4Obj.armor) + parseFloat(armor)
							champ4Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ4Obj.HP) + parseFloat(hp)
							champ4Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ4Obj.spellblock) + parseFloat(spellblock)
							champ4Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ4Obj.attackspeed) + parseFloat(attackspeed)
							champ4Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ4Obj.critchance) + parseFloat(critchance)
							champ4Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item1 !== "0"){
		var id = champ5Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item2 !== "0"){
		var id = champ5Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item3 !== "0"){
		var id = champ5Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item4 !== "0"){
		var id = champ5Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item5 !== "0"){
		var id = champ5Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item6 !== "0"){
		var id = champ5Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ5Obj.Item7 !== "0"){
		var id = champ5Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ5Obj.AP) + parseFloat(AP)
							champ5Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ5Obj.AD) + parseFloat(AD)
							champ5Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ5Obj.armor) + parseFloat(armor)
							champ5Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ5Obj.HP) + parseFloat(hp)
							champ5Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ5Obj.spellblock) + parseFloat(spellblock)
							champ5Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ5Obj.attackspeed) + parseFloat(attackspeed)
							champ5Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ5Obj.critchance) + parseFloat(critchance)
							champ5Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item1 !== "0"){
		var id = champ6Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item2 !== "0"){
		var id = champ6Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item3 !== "0"){
		var id = champ6Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item4 !== "0"){
		var id = champ6Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item5 !== "0"){
		var id = champ6Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item6 !== "0"){
		var id = champ6Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ6Obj.Item7 !== "0"){
		var id = champ6Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ6Obj.AP) + parseFloat(AP)
							champ6Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ6Obj.AD) + parseFloat(AD)
							champ6Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ6Obj.armor) + parseFloat(armor)
							champ6Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ6Obj.HP) + parseFloat(hp)
							champ6Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ6Obj.spellblock) + parseFloat(spellblock)
							champ6Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ6Obj.attackspeed) + parseFloat(attackspeed)
							champ6Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ6Obj.critchance) + parseFloat(critchance)
							champ6Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item1 !== "0"){
		var id = champ7Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item2 !== "0"){
		var id = champ7Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item3 !== "0"){
		var id = champ7Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item4 !== "0"){
		var id = champ7Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item5 !== "0"){
		var id = champ7Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item6 !== "0"){
		var id = champ7Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ7Obj.Item7 !== "0"){
		var id = champ7Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ7Obj.AP) + parseFloat(AP)
							champ7Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ7Obj.AD) + parseFloat(AD)
							champ7Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ7Obj.armor) + parseFloat(armor)
							champ7Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ7Obj.HP) + parseFloat(hp)
							champ7Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ7Obj.spellblock) + parseFloat(spellblock)
							champ7Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ7Obj.attackspeed) + parseFloat(attackspeed)
							champ7Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ7Obj.critchance) + parseFloat(critchance)
							champ7Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item1 !== "0"){
		var id = champ8Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
							console.log(champ8Obj)
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
							console.log(champ8Obj)
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
							console.log(champ8Obj)
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
							console.log(champ8Obj)
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
							console.log(champ8Obj)
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
							console.log(champ8Obj)
						}else if (key == "FlatCritChanceMod"){
							console.log("True")
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							console.log(parseFloat(critchance))
							champ8Obj.critchance = newCritChance
							console.log(champ8Obj)
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item2 !== "0"){
		var id = champ8Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item3 !== "0"){
		var id = champ8Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item4 !== "0"){
		var id = champ8Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item5 !== "0"){
		var id = champ8Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item6 !== "0"){
		var id = champ8Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ8Obj.Item7 !== "0"){
		var id = champ8Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ8Obj.AP) + parseFloat(AP)
							champ8Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ8Obj.AD) + parseFloat(AD)
							champ8Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ8Obj.armor) + parseFloat(armor)
							champ8Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ8Obj.HP) + parseFloat(hp)
							champ8Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ8Obj.spellblock) + parseFloat(spellblock)
							champ8Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ8Obj.attackspeed) + parseFloat(attackspeed)
							champ8Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ8Obj.critchance) + parseFloat(critchance)
							champ8Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item1 !== "0"){
		var id = champ9Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item2 !== "0"){
		var id = champ9Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item3 !== "0"){
		var id = champ9Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item4 !== "0"){
		var id = champ9Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item5 !== "0"){
		var id = champ9Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item6 !== "0"){
		var id = champ9Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ9Obj.Item7 !== "0"){
		var id = champ9Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ9Obj.AP) + parseFloat(AP)
							champ9Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ9Obj.AD) + parseFloat(AD)
							champ9Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ9Obj.armor) + parseFloat(armor)
							champ9Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ9Obj.HP) + parseFloat(hp)
							champ9Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ9Obj.spellblock) + parseFloat(spellblock)
							champ9Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ9Obj.attackspeed) + parseFloat(attackspeed)
							champ9Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ9Obj.critchance) + parseFloat(critchance)
							champ9Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}

	if(champ10Obj.Item1 !== "0"){
		var id = champ10Obj.Item1
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item2 !== "0"){
		var id = champ10Obj.Item2
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item3 !== "0"){
		var id = champ10Obj.Item3
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item4 !== "0"){
		var id = champ10Obj.Item4
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item5 !== "0"){
		var id = champ10Obj.Item5
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item6 !== "0"){
		var id = champ10Obj.Item6
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	if(champ10Obj.Item7 !== "0"){
		var id = champ10Obj.Item7
		for(i=0; i< itemStaticData.length; i++){
			if(itemStaticData[i].id == id){
				var itemdata = itemStaticData[i]
				if(itemdata.stats){
					itemdata = itemdata.stats
					$.each(itemdata, function(key, value){
						if(key == "FlatMagicDamageMod"){
							let AP = value
							let newAP = parseFloat(champ10Obj.AP) + parseFloat(AP)
							champ10Obj.AP = newAP
						}else if (key == "FlatPhysicalDamageMod"){
							let AD = value
							let newAD = parseFloat(champ10Obj.AD) + parseFloat(AD)
							champ10Obj.AD = newAD
						}else if (key == "FlatArmorMod"){
							let armor = value
							let newArmor = parseFloat(champ10Obj.armor) + parseFloat(armor)
							champ10Obj.armor = newArmor
						}else if (key == "FlatHPPoolMod"){
							let hp = value
							let newHP= parseFloat(champ10Obj.HP) + parseFloat(hp)
							champ10Obj.HP = newHP
						}else if (key == "FlatSpellBlockMod"){
							let spellblock = value
							let newSpellblock = parseFloat(champ10Obj.spellblock) + parseFloat(spellblock)
							champ10Obj.spellblock = newSpellblock
						}else if (key == "PercentAttackSpeedMod"){
							let attackspeed = value
							let newAttackSpeed = parseFloat(champ10Obj.attackspeed) + parseFloat(attackspeed)
							champ10Obj.attackspeed = newAttackSpeed
						}else if (key == "FlatCritChanceMod"){
							let critchance = value
							let newCritChance = parseFloat(champ10Obj.critchance) + parseFloat(critchance)
							champ10Obj.critchance = newCritChance
						}
						
					})					
				}
			}
		}
	}
	cb(temmie)	
}
//  ============================================= Adding Stats from Runes ================================================================================
function temDmgCalc(cb){
	$.each(parts, function(key, value){
		console.log(value)
		if(value.partid == "1"){
			cb = temDmgCalcPart1
			cb(value.champ, appendDmgCalc)
		} else if(value.partid == "2"){
			cb = temDmgCalcPart2
			cb(value.champ, appendDmgCalc)
		} else if(value.partid == "3"){
			cb = temDmgCalcPart3
			cb(value.champ, appendDmgCalc)
		}else if(value.partid == "4"){
			cb = temDmgCalcPart4
			cb(value.champ, appendDmgCalc)
		}else if(value.partid =="5"){
			cb = temDmgCalcPart5
			cb(value.champ, appendDmgCalc)
		}else if(value.partid =="6"){
			cb = temDmgCalcPart6
			cb(value.champ, appendDmgCalc)
		}else if(value.partid == "7"){
			cb = temDmgCalcPart7
			cb(value.champ, appendDmgCalc)
		}else if(value.partid == "8"){
			cb = temDmgCalcPart8
			cb(value.champ, appendDmgCalc)
		}else if(value.partid == "9"){
			cb = temDmgCalcPart9
			cb(value.champ, appendDmgCalc)
		}else if(value.partid == "10"){
			cb = temDmgCalcPart10
			cb(value.champ, appendDmgCalc)
		}
	})	
}

function temDmgCalcPart1(champid, cb){
	let QLevel = champ1Obj.Q
	var QDmg;
	let WLevel = champ1Obj.W
	var WDmg;
	let ELevel = champ1Obj.E
	var EDmg;
	let RLevel = champ1Obj.R
	var RDmg = 0
	let AP = parseFloat(champ1Obj.AP)
	let AD = parseFloat(champ1Obj.AD)
	let armor = parseFloat(champ1Obj.armor)
	let HP = parseFloat(champ1Obj.HP)
	let attackspeed = parseFloat(champ1Obj.attackspeed)
	let critchance = parseFloat(champ1Obj.critchance)
	let spellblock = parseFloat(champ1Obj.spellblock)
	let cd = parseFloat(champ1Obj.cd)
	let apPen = parseFloat(champ1Obj.apPen)
	let adPen = parseFloat(champ1Obj.adPen)
	let critdmg = parseFloat(champ1Obj.critdmg)
	if(QLevel == 1){
		let QRatio = formulas.Vayne.Q.One.ratio
		let ratio = parseFloat(QRatio)
		let dmg = (AD + (ratio * AD))*(1+(critchance*(1+critdmg))) * (100/ (100 + (100-adPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let QRatio = formulas.Vayne.Q.Two.ratio
		let ratio = parseFloat(QRatio)
		let dmg = (AD + (ratio * AD))*(1+(critchance*(1+critdmg))) * (100/ (100 + (100-adPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let QRatio = formulas.Vayne.Q.Three.ratio
		let ratio = parseFloat(QRatio)
		let dmg = (AD + (ratio * AD))*(1+(critchance*(1+critdmg))) * (100/ (100 + (100-adPen)))
		QDmg = dmg
	}else if(QLevel == 4){
		let QRatio = formulas.Vayne.Q.Four.ratio
		let ratio = parseFloat(QRatio)
		let dmg = (AD + (ratio * AD))*(1+(critchance*(1+critdmg))) * (100/ (100 + (100-adPen)))
		QDmg = dmg
	}else if(QLevel == 5){
		let QRatio = formulas.Vayne.Q.Five.ratio
		let ratio = parseFloat(QRatio)
		let dmg = (AD + (ratio * AD))*(1+(critchance*(1+critdmg))) * (100/ (100 + (100-adPen)))
		QDmg = dmg
	}
	if(WLevel == 1){
		let WRatio = formulas.Vayne.W.One.ratio
		let ratio = parseFloat(WRatio)
		let dmg = WRatio*10000
		WDmg = dmg
	}else if(WLevel == 2){
		let WRatio = formulas.Vayne.W.Two.ratio
		let ratio = parseFloat(WRatio)
		let dmg = WRatio*10000
		WDmg = dmg
	}else if(WLevel == 3){
		let WRatio = formulas.Vayne.W.Three.ratio
		let ratio = parseFloat(WRatio)
		let dmg = WRatio*10000
		WDmg = dmg
	}else if(WLevel == 4){
		let WRatio = formulas.Vayne.W.Four.ratio
		let ratio = parseFloat(WRatio)
		let dmg = WRatio*10000
		WDmg = dmg
	}else if(WLevel == 5){
		let WRatio = formulas.Vayne.W.Five.ratio
		let ratio = parseFloat(WRatio)
		let dmg = WRatio*10000
		WDmg = dmg
	}
	if(ELevel == 1){
		let stringbase = formulas.Vayne.E.One.base
		let base = parseFloat(stringbase)
		let dmg = (base + (0.5*AD)) * (100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.Vayne.E.Two.base
		let base = parseFloat(stringbase)
		let dmg =  (base + (0.5*AD)) * (100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.Vayne.E.Three.base
		let base = parseFloat(stringbase)
		let dmg =  (base + (0.5*AD)) * (100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 4){
		let stringbase = formulas.Vayne.E.Four.base
		let base = parseFloat(stringbase)
		let dmg =  (base + (0.5*AD)) * (100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 5){
		let stringbase = formulas.Vayne.E.Five.base
		let base = parseFloat(stringbase)
		let dmg =  (base + (0.5*AD)) * (100/(100+(100-adPen)))
		EDmg = dmg
	}	
cb(QDmg, WDmg, EDmg, RDmg, champ1Obj)
}
function temDmgCalcPart2(champid, cb){
	let QLevel = champ2Obj.Q
	var QDmg;
	let WLevel = champ2Obj.W
	var WDmg = 0
	let ELevel = champ2Obj.E
	var EDmg;
	let RLevel = champ2Obj.R
	var RDmg;
	let AP = parseFloat(champ2Obj.AP)
	let AD = parseFloat(champ2Obj.AD)
	let armor = parseFloat(champ2Obj.armor)
	let HP = parseFloat(champ2Obj.HP)
	let attackspeed = parseFloat(champ2Obj.attackspeed)
	let critchance = parseFloat(champ2Obj.critchance)
	let spellblock = parseFloat(champ2Obj.spellblock)
	let cd = parseFloat(champ2Obj.cd)
	let apPen = parseFloat(champ2Obj.apPen)
	let adPen = parseFloat(champ2Obj.adPen)
	let critdmg = parseFloat(champ2Obj.critdmg)	
	if(QLevel == 1){
		let stringbase = formulas.Lux.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.7))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Lux.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.7))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Lux.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.7))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 4){
		let stringbase = formulas.Lux.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.7))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel ==5){
		let stringbase = formulas.Lux.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.7))*(100/(100+(100-apPen)))
		QDmg = dmg
	}
	if(ELevel == 1){
		let stringbase = formulas.Lux.E.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.6))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.Lux.E.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.6))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.Lux.E.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.6))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 4){
		let stringbase = formulas.Lux.E.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.6))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel ==5){
		let stringbase = formulas.Lux.E.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.6))*(100/(100+(100-apPen)))
		EDmg = dmg
	}
	if(RLevel == 1){
		let stringbase = formulas.Lux.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.75))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 2){
		let stringbase = formulas.Lux.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.75))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 3){
		let stringbase = formulas.Lux.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (AP*0.75))*(100/(100+(100-apPen)))
		RDmg = dmg
	}
cb(QDmg, WDmg, EDmg, RDmg, champ2Obj)		
}
function temDmgCalcPart3(champid, cb){
	let QLevel = champ3Obj.Q
	var QDmg;
	let WLevel = champ3Obj.W
	var WDmg;
	let ELevel = champ3Obj.E
	var EDmg = 0;
	let RLevel = champ3Obj.R
	var RDmg;
	let AP = parseFloat(champ3Obj.AP)
	let AD = parseFloat(champ3Obj.AD)
	let armor = parseFloat(champ3Obj.armor)
	let HP = parseFloat(champ3Obj.HP)
	let attackspeed = parseFloat(champ3Obj.attackspeed)
	let critchance = parseFloat(champ3Obj.critchance)
	let spellblock = parseFloat(champ3Obj.spellblock)
	let cd = parseFloat(champ3Obj.cd)
	let apPen = parseFloat(champ3Obj.apPen)
	let adPen = parseFloat(champ3Obj.adPen)
	let critdmg = parseFloat(champ3Obj.critdmg)	
	if(QLevel == 1)	{
		let stringbase = formulas.Maokai.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Maokai.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 3){
		let stringbase = formulas.Maokai.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		QDmg = dmg

	}else if(QLevel == 4){
		let stringbase = formulas.Maokai.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Maokai.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}
	if(WLevel == 1)	{
		let stringbase = formulas.Maokai.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		WDmg = dmg	
	}else if(WLevel == 2){
		let stringbase = formulas.Maokai.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		WDmg = dmg			
	}else if(WLevel == 3){
		let stringbase = formulas.Maokai.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		WDmg = dmg			
	}else if(WLevel == 4){
		let stringbase = formulas.Maokai.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		WDmg = dmg			
	}else if(WLevel == 5){
		let stringbase = formulas.Maokai.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.4*AP))*(100/(100+(100-apPen)))
		WDmg = dmg			
	}
	// if(ELevel == 1)	{
	// 	let stringbase = formulas.Maokai.E.One.base
	// 	let base = parseFloat(stringbase)
	// 	let stringratio = formulas.Maokai.E.One.ratio
	// 	let ratio = parseFloat(stringratio)
	// 	let dmg = (base + ((ratio+(4*(AP/10000)))*10000))*(100/(100+(100-apPen)))
	// 	let EDmg = dmg
	// }else if(ELevel == 2){
	// 	let stringbase = formulas.Maokai.E.Two.base
	// 	let base = parseFloat(stringbase)
	// 	let stringratio = formulas.Maokai.E.Two.ratio
	// 	let ratio = parseFloat(stringratio)
	// 	let dmg = (base + ((ratio+(4*(AP/10000)))*10000))*(100/(100+(100-apPen)))
	// 	let EDmg = dmg
	// }else if(ELevel == 3){
	// 	let stringbase = formulas.Maokai.E.Three.base
	// 	let base = parseFloat(stringbase)
	// 	let stringratio = formulas.Maokai.E.Four.ratio
	// 	let ratio = parseFloat(stringratio)
	// 	console.log(ratio)
	// 	let dmg = ratio+( 4*(AP/10000))
	// 	let EDmg = dmg
	// }else if(ELevel == 4){
	// 	let stringbase = formulas.Maokai.E.Four.base
	// 	let base = parseFloat(stringbase)
	// 	let stringratio = formulas.Maokai.E.Four.ratio
	// 	let ratio = parseFloat(stringratio)
	// 	console.log(AP)
	// 	let dmg = (AP/10000)
	// 	let EDmg = dmg
	// }else if(ELevel == 5){
	// 	let stringbase = formulas.Maokai.E.Five.base
	// 	let base = parseFloat(stringbase)
	// 	let stringratio = formulas.Maokai.E.Five.ratio
	// 	let ratio = parseFloat(stringratio)
	// 	let dmg = (base + ((ratio+(4*(AP/10000)))*10000))*(100/(100+(100-apPen)))
	// 	let EDmg = dmg
	// }
	if(RLevel == 1)	{
		let stringbase = formulas.Maokai.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.75*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}else if(RLevel == 2){
		let stringbase = formulas.Maokai.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.75*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}else if(RLevel == 3){
		let stringbase = formulas.Maokai.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+ (.75*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}
	console.log(QDmg)
	console.log(WDmg)
	console.log(EDmg)
	console.log(RDmg)
cb(QDmg, WDmg, EDmg, RDmg, champ3Obj)		
}
function temDmgCalcPart4(champid, cb){
	let QLevel = champ4Obj.Q
	var QDmg;
	let WLevel = champ4Obj.W
	var WDmg;
	let ELevel = champ4Obj.E
	var EDmg = 0;
	let RLevel = champ4Obj.R
	var RDmg = 0;
	let AP = parseFloat(champ4Obj.AP)
	let AD = parseFloat(champ4Obj.AD)
	let armor = parseFloat(champ4Obj.armor)
	let HP = parseFloat(champ4Obj.HP)
	let attackspeed = parseFloat(champ4Obj.attackspeed)
	let critchance = parseFloat(champ4Obj.critchance)
	let spellblock = parseFloat(champ4Obj.spellblock)
	let cd = parseFloat(champ4Obj.cd)
	let apPen = parseFloat(champ4Obj.apPen)
	let adPen = parseFloat(champ4Obj.adPen)
	let critdmg = parseFloat(champ4Obj.critdmg)	
	if(QLevel ==1){
		let stringbase = formulas.Janna.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.65*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Janna.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.65*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Janna.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.65*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 4){
		let stringbase = formulas.Janna.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.65*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Janna.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.65*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}
	if(WLevel ==1){
		let stringbase = formulas.Janna.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.Janna.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.Janna.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.Janna.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.Janna.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}
cb(QDmg, WDmg, EDmg, RDmg, champ4Obj)	
}
function temDmgCalcPart5(champid, cb){
	let QLevel = champ5Obj.Q
	var QDmg;
	let WLevel = champ5Obj.W
	var WDmg;
	let ELevel = champ5Obj.E
	var EDmg 
	let RLevel = champ5Obj.R
	var RDmg 
	let AP = parseFloat(champ5Obj.AP)
	let AD = parseFloat(champ5Obj.AD)
	let armor = parseFloat(champ5Obj.armor)
	let HP = parseFloat(champ5Obj.HP)
	let attackspeed = parseFloat(champ5Obj.attackspeed)
	let critchance = parseFloat(champ5Obj.critchance)
	let spellblock = parseFloat(champ5Obj.spellblock)
	let cd = parseFloat(champ5Obj.cd)
	let apPen = parseFloat(champ5Obj.apPen)
	let adPen = parseFloat(champ5Obj.adPen)
	let critdmg = parseFloat(champ5Obj.critdmg)	
	if(QLevel ==1){
		let stringbase = formulas.Gragas.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))*1.5
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Gragas.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))*1.5
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Gragas.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))*1.5
		QDmg = dmg		
	}else if(QLevel == 4){
		let stringbase = formulas.Gragas.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))*1.5
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Gragas.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))*1.5
		QDmg = dmg		
	}
	if(WLevel ==1){
		let stringbase = formulas.Gragas.W.One.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(.08*10000))+(.3*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.Gragas.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(.08*10000))+(.3*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.Gragas.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(.08*10000))+(.3*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.Gragas.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(.08*10000))+(.3*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.Gragas.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(.08*10000))+(.3*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}
	if(ELevel ==1){
		let stringbase = formulas.Gragas.E.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.Gragas.E.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.Gragas.E.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 4){
		let stringbase = formulas.Gragas.E.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 5){
		let stringbase = formulas.Gragas.E.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.6*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}	
	if(RLevel ==1){
		let stringbase = formulas.Gragas.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 2){
		let stringbase = formulas.Gragas.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 3){
		let stringbase = formulas.Gragas.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}
cb(QDmg, WDmg, EDmg, RDmg, champ5Obj)	
}
function temDmgCalcPart6(champid, cb){
	let QLevel = champ6Obj.Q
	var QDmg;
	let WLevel = champ6Obj.W
	var WDmg;
	let ELevel = champ6Obj.E
	var EDmg 
	let RLevel = champ6Obj.R
	var RDmg 
	let AP = parseFloat(champ6Obj.AP)
	let AD = parseFloat(champ6Obj.AD)
	let armor = parseFloat(champ6Obj.armor)
	let HP = parseFloat(champ6Obj.HP)
	let attackspeed = parseFloat(champ6Obj.attackspeed)
	let critchance = parseFloat(champ6Obj.critchance)
	let spellblock = parseFloat(champ6Obj.spellblock)
	let cd = parseFloat(champ6Obj.cd)
	let apPen = parseFloat(champ6Obj.apPen)
	let adPen = parseFloat(champ6Obj.adPen)
	let critdmg = parseFloat(champ6Obj.critdmg)
	if(QLevel ==1){
		let stringbase = formulas.Cassiopeia.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.233*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Cassiopeia.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.233*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Cassiopeia.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.233*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 4){
		let stringbase = formulas.Cassiopeia.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.233*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Cassiopeia.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.233*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}

	if(WLevel ==1){
		let stringbase = formulas.Cassiopeia.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.15*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.Cassiopeia.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.15*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.Cassiopeia.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.15*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.Cassiopeia.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.15*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.Cassiopeia.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.15*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}

	if(ELevel ==1){
		let stringbaseone = formulas.Cassiopeia.E.One.baseone
		let baseone = parseFloat(stringbaseone)
		let stringbasetwo = formulas.Cassiopeia.E.One.basetwo
		let basetwo = parseFloat(stringbasetwo)		
		let dmg = (baseone+(.6*AP))*(100/(100+(100-apPen)))+ (basetwo+(.35*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbaseone = formulas.Cassiopeia.E.Two.baseone
		let baseone = parseFloat(stringbaseone)
		let stringbasetwo = formulas.Cassiopeia.E.Two.basetwo
		let basetwo = parseFloat(stringbasetwo)
		let dmg = (baseone+(.1*AP))*(100/(100+(100-apPen))) + (basetwo+(.35*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbaseone = formulas.Cassiopeia.E.Three.baseone
		let baseone = parseFloat(stringbaseone)
		let stringbasetwo = formulas.Cassiopeia.E.Three.basetwo
		let basetwo = parseFloat(stringbasetwo)
		let dmg = (baseone+(.1*AP))*(100/(100+(100-apPen)))+ (basetwo+(.35*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 4){
		let stringbaseone = formulas.Cassiopeia.E.Four.baseone
		let baseone = parseFloat(stringbaseone)
		let stringbasetwo = formulas.Cassiopeia.E.Four.basetwo
		let basetwo = parseFloat(stringbasetwo)
		let dmg = (baseone+(.1*AP))*(100/(100+(100-apPen)))+ (basetwo+(.35*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 5){
		let stringbaseone = formulas.Cassiopeia.E.Five.baseone
		let baseone = parseFloat(stringbaseone)
		let stringbasetwo = formulas.Cassiopeia.E.Five.basetwo
		let basetwo = parseFloat(stringbasetwo)
		let dmg = (baseone+(.1*AP))*(100/(100+(100-apPen)))+ (basetwo+(.35*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}
	if(RLevel ==1){
		let stringbase = formulas.Cassiopeia.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 2){
		let stringbase = formulas.Cassiopeia.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 3){
		let stringbase = formulas.Cassiopeia.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}
cb(QDmg, WDmg, EDmg, RDmg, champ6Obj)	
}
function temDmgCalcPart7(champid, cb){
	let QLevel = champ7Obj.Q
	var QDmg;
	let WLevel = champ7Obj.W
	var WDmg;
	let ELevel = champ7Obj.E
	var EDmg 
	let RLevel = champ7Obj.R
	var RDmg 
	let AP = parseFloat(champ7Obj.AP)
	let AD = parseFloat(champ7Obj.AD)
	let armor = parseFloat(champ7Obj.armor)
	let HP = parseFloat(champ7Obj.HP)
	let attackspeed = parseFloat(champ7Obj.attackspeed)
	let critchance = parseFloat(champ7Obj.critchance)
	let spellblock = parseFloat(champ7Obj.spellblock)
	let cd = parseFloat(champ7Obj.cd)
	let apPen = parseFloat(champ7Obj.apPen)
	let adPen = parseFloat(champ7Obj.adPen)
	let critdmg = parseFloat(champ7Obj.critdmg)	
	if(QLevel ==1){
		let stringbase = formulas.Caitlyn.Q.One.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.Caitlyn.Q.One.ratio
		let ratio = parseFloat(stringratio)
		let dmg = (base+(ratio*AD))*(100/(100+(100-adPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Caitlyn.Q.Two.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.Caitlyn.Q.One.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (base+(ratio*AD))*(100/(100+(100-adPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Caitlyn.Q.Three.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.Caitlyn.Q.One.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (base+(ratio*AD))*(100/(100+(100-adPen)))
		QDmg = dmg		
	}else if(QLevel == 4){
		let stringbase = formulas.Caitlyn.Q.Four.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.Caitlyn.Q.One.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (base+(ratio*AD))*(100/(100+(100-adPen)))
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Caitlyn.Q.Five.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.Caitlyn.Q.One.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (base+(ratio*AD))*(100/(100+(100-adPen)))
		QDmg = dmg		
	}
	if(WLevel ==1){
		let stringbase = formulas.Caitlyn.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AD))*(100/(100+(100-adPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.Caitlyn.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AD))*(100/(100+(100-adPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.Caitlyn.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AD))*(100/(100+(100-adPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.Caitlyn.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AD))*(100/(100+(100-adPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.Caitlyn.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.7*AD))*(100/(100+(100-adPen)))
		WDmg = dmg		
	}
	if(ELevel ==1){
		let stringbase = formulas.Caitlyn.E.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.8*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.Caitlyn.E.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.8*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.Caitlyn.E.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.8*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 4){
		let stringbase = formulas.Caitlyn.E.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.8*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 5){
		let stringbase = formulas.Caitlyn.E.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.8*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}
	if(RLevel ==1){
		let stringbase = formulas.Caitlyn.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(2*AD))*(100/(100+(100-adPen)))
		RDmg = dmg
	}else if(RLevel == 2){
		let stringbase = formulas.Caitlyn.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(2*AD))*(100/(100+(100-adPen)))
		RDmg = dmg
	}else if(RLevel == 3){
		let stringbase = formulas.Caitlyn.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(2*AD))*(100/(100+(100-adPen)))
		RDmg = dmg		
	}
cb(QDmg, WDmg, EDmg, RDmg, champ7Obj)
}
function temDmgCalcPart8(champid, cb){
	let QLevel = champ8Obj.Q
	var QDmg;
	let WLevel = champ8Obj.W
	var WDmg;
	let ELevel = champ8Obj.E
	var EDmg = 0;
	let RLevel = champ8Obj.R
	var RDmg 
	let AP = parseFloat(champ8Obj.AP)
	let AD = parseFloat(champ8Obj.AD)
	let armor = parseFloat(champ8Obj.armor)
	let HP = parseFloat(champ8Obj.HP)
	let attackspeed = parseFloat(champ8Obj.attackspeed)
	let critchance = parseFloat(champ8Obj.critchance)
	let spellblock = parseFloat(champ8Obj.spellblock)
	let cd = parseFloat(champ8Obj.cd)
	let apPen = parseFloat(champ8Obj.apPen)
	let adPen = parseFloat(champ8Obj.adPen)
	let critdmg = parseFloat(champ8Obj.critdmg)
	if(QLevel ==1){
		let stringbase = formulas.Rakan.Q.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 2){
		let stringbase = formulas.Rakan.Q.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		QDmg = dmg
	}else if(QLevel == 3){
		let stringbase = formulas.Rakan.Q.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 4){
		let stringbase = formulas.Rakan.Q.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}else if(QLevel == 5){
		let stringbase = formulas.Rakan.Q.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		QDmg = dmg		
	}
	if(WLevel ==1){
		let stringbase = formulas.Rakan.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.Rakan.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.Rakan.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.Rakan.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.Rakan.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}
	if(RLevel ==1){
		let stringbase = formulas.Rakan.R.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 2){
		let stringbase = formulas.Rakan.R.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg
	}else if(RLevel == 3){
		let stringbase = formulas.Rakan.R.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.5*AP))*(100/(100+(100-apPen)))
		RDmg = dmg		
	}
cb(QDmg, WDmg, EDmg, RDmg, champ8Obj)
}
function temDmgCalcPart9(champid, cb){
	let QLevel = champ9Obj.Q
	var QDmg = 0;
	let WLevel = champ9Obj.W
	var WDmg = 0;
	let ELevel = champ9Obj.E
	var EDmg;
	let RLevel = champ9Obj.R
	var RDmg = 0;
	let AP = parseFloat(champ9Obj.AP)
	let AD = parseFloat(champ9Obj.AD)
	let armor = parseFloat(champ9Obj.armor)
	let HP = parseFloat(champ9Obj.HP)
	let attackspeed = parseFloat(champ9Obj.attackspeed)
	let critchance = parseFloat(champ9Obj.critchance)
	let spellblock = parseFloat(champ9Obj.spellblock)
	let cd = parseFloat(champ9Obj.cd)
	let apPen = parseFloat(champ9Obj.apPen)
	let adPen = parseFloat(champ9Obj.adPen)
	let critdmg = parseFloat(champ9Obj.critdmg)
	if(ELevel == 1){
		let stringbase = formulas.Tryndamere.E.One.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(1.2*AD))+(1*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.Tryndamere.E.Two.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(1.2*AD))+(1*AP))*(100/(100+(100-apPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.Tryndamere.E.Three.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(1.2*AD))+(1*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 4){
		let stringbase = formulas.Tryndamere.E.Four.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(1.2*AD))+(1*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}else if(ELevel == 5){
		let stringbase = formulas.Tryndamere.E.Five.base
		let base = parseFloat(stringbase)
		let dmg = ((base+(1.2*AD))+(1*AP))*(100/(100+(100-apPen)))
		EDmg = dmg		
	}	
	console.log(EDmg)
cb(QDmg, WDmg, EDmg, RDmg, champ9Obj)
}
function temDmgCalcPart10(champid, cb){
	let QLevel = champ10Obj.Q
	var QDmg = 0;
	let WLevel = champ10Obj.W
	var WDmg 
	let ELevel = champ10Obj.E
	var EDmg
	let RLevel = champ10Obj.R
	var RDmg = 0;
	let AP = parseFloat(champ10Obj.AP)
	let AD = parseFloat(champ10Obj.AD)
	let armor = parseFloat(champ10Obj.armor)
	let HP = parseFloat(champ10Obj.HP)
	let attackspeed = parseFloat(champ10Obj.attackspeed)
	let critchance = parseFloat(champ10Obj.critchance)
	let spellblock = parseFloat(champ10Obj.spellblock)
	let cd = parseFloat(champ10Obj.cd)
	let apPen = parseFloat(champ10Obj.apPen)
	let adPen = parseFloat(champ10Obj.adPen)
	let critdmg = parseFloat(champ10Obj.critdmg)
	if(WLevel ==1){
		let stringbase = formulas.DrMundo.W.One.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.1*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 2){
		let stringbase = formulas.DrMundo.W.Two.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.1*AP))*(100/(100+(100-apPen)))
		WDmg = dmg
	}else if(WLevel == 3){
		let stringbase = formulas.DrMundo.W.Three.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.1*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 4){
		let stringbase = formulas.DrMundo.W.Four.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.1*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}else if(WLevel == 5){
		let stringbase = formulas.DrMundo.W.Five.base
		let base = parseFloat(stringbase)
		let dmg = (base+(.1*AP))*(100/(100+(100-apPen)))
		WDmg = dmg		
	}


	if(ELevel ==1){
		let stringbase = formulas.DrMundo.E.One.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.DrMundo.E.One.ratio
		let ratio = parseFloat(stringratio)
		let dmg = (AD+base+(ratio*HP))*(100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 2){
		let stringbase = formulas.DrMundo.E.Two.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.DrMundo.E.Two.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (AD+base+(ratio*HP))*(100/(100+(100-adPen)))
		EDmg = dmg
	}else if(ELevel == 3){
		let stringbase = formulas.DrMundo.E.Three.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.DrMundo.E.Three.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (AD+base+(ratio*HP))*(100/(100+(100-adPen)))
		EDmg = dmg		
	}else if(ELevel == 4){
		let stringbase = formulas.DrMundo.E.Four.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.DrMundo.E.Four.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (AD+base+(ratio*HP))*(100/(100+(100-adPen)))
		EDmg = dmg		
	}else if(ELevel == 5){
		let stringbase = formulas.DrMundo.E.Five.base
		let base = parseFloat(stringbase)
		let stringratio = formulas.DrMundo.E.Five.ratio
		let ratio = parseFloat(stringratio)		
		let dmg = (AD+base+(ratio*HP))*(100/(100+(100-adPen)))
		EDmg = dmg		
	}	
cb(QDmg, WDmg, EDmg, RDmg, champ10Obj)
}
function appendDmgCalc(QDmg, WDmg, EDmg, RDmg, champObj){
var QDmg = parseFloat(QDmg)
var EDmg = parseFloat(EDmg)
var WDmg = parseFloat(WDmg)
var RDmg = parseFloat(RDmg)
champObj.TotalDmg = QDmg + EDmg + WDmg + RDmg
}
function temmie(){
	console.log("I AM TEMMIE")


}


