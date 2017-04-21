function timeconvert(millis) {
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds < 10 ? '0' : '') + seconds;
}
function Frame(time, champ1, champ2, champ3, champ4, champ5, champ6, champ7, champ8, champ9, champ10){
		this.time = time;
		this.champ1 = champ1;
		this.champ2 = champ2;
		this.champ3 = champ3;
		this.champ4 = champ4;
		this.champ5 = champ5;
		this.champ6 = champ6;
		this.champ7 = champ7;
		this.champ8 = champ8;
		this.champ9 = champ9;
		this.champ10 = champ10


}
var champ1Obj = {
	champ1Item1: "",
	champ1Item2: "",
	champ1Item3: "",
	champ1Item4: "",
	champ1Item5: "",
	champ1Item6: "",
	champ1ItemTrinket: "",
	champ1Alive: "",
	champ1Position: ""
}
var champ2Obj = {
	champ2Item1: "",
	champ2Item2: "",
	champ2Item3: "",
	champ2Item4: "",
	champ2Item5: "",
	champ2Item6: "",
	champ2ItemTrinket: "",
	champ2Alive: "",
	champ2Position: ""
}
var champ3Obj = {
	champ3Item1: "",
	champ3Item2: "",
	champ3Item3: "",
	champ3Item4: "",
	champ3Item5: "",
	champ3Item6: "",
	champ3ItemTrinket: "",
	champ3Alive: "",
	champ3Position: ""
}
var champ4Obj = {
	champ4Item1: "",
	champ4Item2: "",
	champ4Item3: "",
	champ4Item4: "",
	champ4Item5: "",
	champ4Item6: "",
	champ4ItemTrinket: "",
	champ4Alive: "",
	champ4Position: ""
}
var champ5Obj = {
	champ5Item1: "",
	champ5Item2: "",
	champ5Item3: "",
	champ5Item4: "",
	champ5Item5: "",
	champ5Item6: "",
	champ5ItemTrinket: "",
	champ5Alive: "",
	champ5Position: ""
}
var champ6Obj = {
	champ6Item1: "",
	champ6Item2: "",
	champ6Item3: "",
	champ6Item4: "",
	champ6Item5: "",
	champ6Item6: "",
	champ6ItemTrinket: "",
	champ6Alive: "",
	champ6Position: ""
}
var champ7Obj = {
	champ7Item1: "",
	champ7Item2: "",
	champ7Item3: "",
	champ7Item4: "",
	champ7Item5: "",
	champ7Item6: "",
	champ7ItemTrinket: "",
	champ7Alive: "",
	champ7Position: ""
}
var champ8Obj = {
	champ8Item1: "",
	champ8Item2: "",
	champ8Item3: "",
	champ8Item4: "",
	champ8Item5: "",
	champ8Item6: "",
	champ8ItemTrinket: "",
	champ8Alive: "",
	champ8Position: ""
}
var champ9Obj = {
	champ9Item1: "",
	champ9Item2: "",
	champ9Item3: "",
	champ9Item4: "",
	champ9Item5: "",
	champ9Item6: "",
	champ9ItemTrinket: "",
	champ9Alive: "",
	champ9Position: ""
}
var champ10Obj = {
	champ10Item1: "",
	champ10Item2: "",
	champ10Item3: "",
	champ10Item4: "",
	champ10Item5: "",
	champ10Item6: "",
	champ10ItemTrinket: "",
	champ10Alive: "",
	champ10Position: ""
}
$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2477649342?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
console.log(results)
const allframes = results.timeline.frames
let seconds =results.matchDuration
let matchTime = parseInt(seconds)*1000
var frame = $("#frame")
var time = 0;
function increment(){
	time++
	console.log(time)
}
var events = []
for(i=0;i<=matchTime-1;i++){
	if (i%1000 == 0){
	increment()			
	}
}	
for(i=0; i < allframes.length; i++){
	var events = allframes[i].events
	if(allframes[i].events){
		for(j=0; j<events.length; j++){
			let event =events[j]
			eventType = event.eventType
			timestamp = timeconvert(event.timestamp)
			item = event.itemId
			itemb4= event.itemBefore
			itema4= event.itemAfter
			partId = event.participantId
			victim = event.victimId
			switch(partId){
				case 1: 
			  	frame = $("#part1")
			  	break;
				case 2: 
			  	frame = $("#part2")
			  	break;
				case 3: 
			  	frame = $("#part3")
			  	break;
				case 4: 
			  	frame = $("#part4")
			  	break;
				case 5: 
			  	frame = $("#part5")
			  	break;
				case 6: 
			  	frame = $("#part6")
			  	break;
				case 7: 
			  	frame = $("#part7")
			  	break;
				case 8: 
			  	frame = $("#part8")
			  	break;
				case 9: 
			  	frame = $("#part9")
			  	break;
				case 10: 
			  	frame = $("#part10")
			  	break;
				default:
			  	frame = $("frame")		  			  			  			  
			}			
			if (eventType == "ITEM_SOLD") {
			frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"Item  : <img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
			"<div class = 'itemid'  data-item="+item+" style='display:none;'></div>"	+
			"<ul> Participant : "+partId+"</ul></div>");		
			}	
			if (eventType == "ITEM_PURCHASED") {
				console.log(event)
			frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
			"<div class = 'itemid'  data-item="+item+" style='display:none;'></div>"	+			
			"<ul> Participant : "+partId+"</ul></div>");		
			}
			if (eventType == "ITEM_DESTROYED") {
			frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
			"<ul> Time: "+timestamp+"</ul>"+			
			"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
			"<div class = 'itemid' data-item="+item+" style='display:none;'></div>"	+			
			"<ul> Participant : "+partId+"</ul></div>");		
			}
		}
	} else{
		console.log("No Event Frames")
	}
}

});