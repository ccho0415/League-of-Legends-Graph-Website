var parts = [];
var champStaticData = [];	
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
cb(parts, loadTimeline)
}
function appendChampDiv(parts, cb){
for(i=0; i<parts.length; i++){
	let particpiantId = parts[i].partid
	let champname = parts[i].champname
	let imgurl = parts[i].imgurl
	let lane = parts[i].lane
	let role = parts[i].role
	let team = parts[i].team

	if(team == 100 && lane == "TOP"){
		$("#t1top").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 100 && lane == "JUNGLE"){
		$("#t1jung").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 100 && lane == "MIDDLE"){
		$("#t1mid").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 100 && lane == "BOTTOM" && role == "DUO_CARRY"){
		$("#t1bot").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 100 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
		$("#t1sup").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 200 && lane == "TOP"){
		$("#t2top").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 200 && lane == "JUNGLE"){
		$("#t2jung").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}else if(team == 200 && lane == "MIDDLE"){
		$("#t2mid").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if(team == 200 && lane == "BOTTOM" && role == "DUO_CARRY"){
		$("#t2bot").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	} else if (team == 200 && lane == "BOTTOM" && role == "DUO_SUPPORT"){
		$("#t2sup").html(
			"<h5 class = 'champname'>"+champname+"</h5>"+
			"<img class = 'champimg' src ='"+imgurl+"'>"+
			"<div class='partid' id = part"+particpiantId+" data-participant="+particpiantId+" style='display: none;'>"		
		)
	}

}
}


function loadTimeline(){
	console.log(" I AM TEMMIE")
}
$(document).ready(function () {
	getData();

})