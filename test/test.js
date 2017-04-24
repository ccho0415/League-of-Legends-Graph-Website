$("#timesubmit").on("click", function(event){
	timeHandler(event, frameRequest);
})

function timeHandler(event, cb){
	event.preventDefault();
	let timestamp = $("#timestamp").val()
	cb(timestamp, frameAppend)
}

function timeconvert(millis) {
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds < 10 ? '0' : '') + seconds;
}

function frameRequest(timestamp, cb){
let timeRequested = timestamp
console.log(timeRequested)
$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2477649342?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
	console.log(results)
	const allframes = results.timeline.frames
	let seconds =results.matchDuration
	let matchTime = parseInt(seconds)*1000
	var frame = $("#frame")
	var event;
	var time = 0;
	var events = []	
	for(i=0; i < allframes.length; i++){
		var events = allframes[i].events
		if(allframes[i].events){
			for(j=0; j<events.length; j++){
				event = events[j]
				eventType = event.eventType
				timestamp = event.timestamp
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
				if(eventType == "ITEM_SOLD" || eventType == "ITEM_PURCHASED" || eventType == "ITEM_DESTROYED"){
					console.log(eventType)
					if (timestamp < timeRequested){
						console.log(item)					
						cb(event, eventType, timestamp, item, partId, frame, objectAppend)
					}else{
						console.log("Greater")
					}					
				} else{
					console.log("Not a Item Event")
					console.log(event)
				}


			}
		} else{
			console.log("No Event Frames")
		}
	}
});
}
var champ1Obj = {
	champ1Item1: "",
	champ1Item2: "",
	champ1Item3: "",
	champ1Item4: "",
	champ1Item5: "",
	champ1Item6: "",
	champ1ItemTrinket: "",
	champ1Consumable: [],
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
	champ2Consumable: [],	
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
	champ3Consumable: [],	
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
	champ4Consumable: [],	
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
	champ5Consumable: [],	
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
	champ6Consumable: [],	
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
	champ7Consumable: [],	
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
	champ8Consumable: [],	
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
	champ9Consumable: [],	
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
	champ10Consumable: [],	
	champ10Alive: "",
	champ10Position: ""
}
function frameAppend(event, eventType, timestamp, item, partId, frame, cb){
	if (eventType == "ITEM_SOLD") {					
	frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
	"<ul> Time: "+timestamp+"</ul>"+			
	"Item  : <img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
	"<div class = 'itemid'  data-item="+item+" style='display:none;'></div>"	+
	"<ul> Participant : "+partId+"</ul></div>");
	cb(event, eventType, timestamp, item, partId)		
	}else if (eventType == "ITEM_PURCHASED") {						
	frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
	"<ul> Time: "+timestamp+"</ul>"+			
	"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
	"<div class = 'itemid'  data-item="+item+" style='display:none;'></div>"	+			
	"<ul> Participant : "+partId+"</ul></div>");
	cb(event, eventType, timestamp, item, partId)				
	}else if (eventType == "ITEM_DESTROYED") {
	console.log(event)							
	frame.append("<div class = 'eventframe item col-md-3'><li>"+eventType+"</li>"+
	"<ul> Time: "+timestamp+"</ul>"+			
	"<img src = http://ddragon.leagueoflegends.com/cdn/7.7.1/img/item/"+item+".png>"+
	"<div class = 'itemid' data-item="+item+" style='display:none;'></div>"	+			
	"<ul> Participant : "+partId+"</ul></div>");
	cb(event, eventType, timestamp, item, partId)				
	}	
}
function objectAppend(event, eventType, timestamp, item, partId){
	var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	if(eventType == "ITEM_PURCHASED"){
		if(consumable.indexOf(item)!== -1){
			if(partId == 1){
				champ1Obj.champ1Consumable.push(item)
			}else if(partId == 2){
				champ2Obj.champ2Consumable.push(item)
			}else if(partId == 3){
				champ3Obj.champ3Consumable.push(item)
			}else if(partId == 4){
				champ4Obj.champ4Consumable.push(item)
			}else if(partId == 5){
				champ5Obj.champ5Consumable.push(item)
			}else if(partId == 6){
				champ6Obj.champ6Consumable.push(item)
			}else if(partId == 7){
				champ7Obj.champ7Consumable.push(item)
			}else if(partId == 8){
				champ8Obj.champ8Consumable.push(item)
			}else if(partId == 9){
				champ9Obj.champ9Consumable.push(item)
			}else if(partId == 10){
				champ10Obj.champ10Consumable.push(item)
			}											
		}else if (trinket.indexOf(item) !== -1){
			if (partId ==1){
				champ1Obj.champ1ItemTrinket = item
			}else if(partId ==2){
				champ2Obj.champ2ItemTrinket = item				
			}else if(partId ==3){
				champ3Obj.champ3ItemTrinket = item				
			}else if(partId ==4){
				champ4Obj.champ4ItemTrinket = item				
			}else if(partId ==5){
				champ5Obj.champ5ItemTrinket = item				
			}else if (partId ==6){
				champ6Obj.champ6ItemTrinket = item				
			}else if(partId ==7){
				champ7Obj.champ7ItemTrinket = item				
			}else if(partId ==8){
				champ8Obj.champ8ItemTrinket = item				
			}else if(partId ==9){
				champ9Obj.champ9ItemTrinket = item				
			}else if(partId ==10){
				champ10Obj.champ10ItemTrinket = item				
			}
		}else if (partId == 1 && champ1Obj.champ1Item1 == ""){
			champ1Obj.champ1Item1 = item
			return item
		}else if (partId == 1 && champ1Obj.champ1Item2 == ""){
			champ1Obj.champ1Item2 = item
			return item			
		}else if (partId == 1 && champ1Obj.champ1Item3 == ""){
			champ1Obj.champ1Item3 = item
			return item			
		}else if (partId == 1 && champ1Obj.champ1Item4 == ""){
			champ1Obj.champ1Item4 = item
			return item			
		}else if (partId == 1 && champ1Obj.champ1Item5 == ""){
			champ1Obj.champ1Item5 = item
			return item	
		}else if (partId == 1 && champ1Obj.champ1Item6 == ""){
			champ1Obj.champ1Item6 = item
			return item	
		}
		else if (partId == 2 && champ2Obj.champ2Item1 == ""){
			champ2Obj.champ2Item1 = item
			return item
		}else if (partId == 2 && champ2Obj.champ2Item2 == ""){
			champ2Obj.champ2Item2 = item
			return item
		}else if (partId == 2 && champ2Obj.champ2Item3 == ""){
			champ2Obj.champ2Item3 = item
			return item
		}else if (partId == 2 && champ2Obj.champ2Item4 == ""){
			champ2Obj.champ2Item4 = item
			return item
		}else if (partId == 2 && champ2Obj.champ2Item5 == ""){
			champ2Obj.champ2Item5 = item
			return item
		}else if (partId == 2 && champ2Obj.champ2Item6 == ""){
			champ2Obj.champ2Item6 = item
			return item
		}
		// else if (partId == 3 && champ3Obj.champ3Item1 == ""){
		// 	champ3Obj.champ3Item1 = item
		// }else if (partId == 3 && champ3Obj.champ3Item2 == ""){
		// 	champ3Obj.champ3Item2 = item
		// }else if (partId == 3 && champ3Obj.champ3Item3 == ""){
		// 	champ3Obj.champ3Item3 = item
		// }else if (partId == 3 && champ3Obj.champ3Item4 == ""){
		// 	champ3Obj.champ3Item4 = item
		// }else if (partId == 3 && champ3Obj.champ3Item5 == ""){
		// 	champ3Obj.champ3Item5 = item
		// }else if (partId == 3 && champ3Obj.champ3Item6 == ""){
		// 	champ3Obj.champ3Item6 = item
		// }else if (partId == 4 && champ4Obj.champ4Item1 == ""){
		// 	champ4Obj.champ4Item1 = item
		// }else if (partId == 4 && champ4Obj.champ4Item2 == ""){
		// 	champ4Obj.champ4Item2 = item
		// }else if (partId == 4 && champ4Obj.champ4Item3 == ""){
		// 	champ4Obj.champ4Item3 = item
		// }else if (partId == 4 && champ4Obj.champ4Item4 == ""){
		// 	champ4Obj.champ4Item4 = item
		// }else if (partId == 4 && champ4Obj.champ4Item5 == ""){
		// 	champ4Obj.champ4Item5 = item
		// }else if (partId == 4 && champ4Obj.champ4Item6 == ""){
		// 	champ4Obj.champ4Item6 = item
		// }else if (partId == 5 && champ5Obj.champ5Item1 == ""){
		// 	champ5Obj.champ5Item1 = item
		// }else if (partId == 5 && champ5Obj.champ5Item2 == ""){
		// 	champ5Obj.champ5Item2 = item
		// }else if (partId == 5 && champ5Obj.champ5Item3 == ""){
		// 	champ5Obj.champ5Item3 = item
		// }else if (partId == 5 && champ5Obj.champ5Item4 == ""){
		// 	champ5Obj.champ5Item4 = item
		// }else if (partId == 5 && champ5Obj.champ5Item5 == ""){
		// 	champ5Obj.champ5Item5 = item
		// }else if (partId == 5 && champ5Obj.champ5Item6 == ""){
		// 	champ5Obj.champ5Item6 = item
		// }else if (partId == 6 && champ6Obj.champ6Item1 == ""){
		// 	champ6Obj.champ6Item1 = item
		// }else if (partId == 6 && champ6Obj.champ6Item2 == ""){
		// 	champ6Obj.champ6Item2 = item
		// }else if (partId == 6 && champ6Obj.champ6Item3 == ""){
		// 	champ6Obj.champ6Item3 = item
		// }else if (partId == 6 && champ6Obj.champ6Item4 == ""){
		// 	champ6Obj.champ6Item4 = item
		// }else if (partId == 6 && champ6Obj.champ6Item5 == ""){
		// 	champ6Obj.champ6Item5 = item
		// }else if (partId == 6 && champ6Obj.champ6Item6 == ""){
		// 	champ6Obj.champ6Item6 = item
		// }else if (partId == 7 && champ7Obj.champ7Item1 == ""){
		// 	champ7Obj.champ7Item1 = item
		// }else if (partId == 7 && champ7Obj.champ7Item2 == ""){
		// 	champ7Obj.champ7Item2 = item
		// }else if (partId == 7 && champ7Obj.champ7Item3 == ""){
		// 	champ7Obj.champ7Item3 = item
		// }else if (partId == 7 && champ7Obj.champ7Item4 == ""){
		// 	champ7Obj.champ7Item4 = item
		// }else if (partId == 7 && champ7Obj.champ7Item5 == ""){
		// 	champ7Obj.champ7Item5 = item
		// }else if (partId == 7 && champ7Obj.champ7Item6 == ""){
		// 	champ7Obj.champ7Item6 = item
		// }else if (partId == 8 && champ8Obj.champ8Item1 == ""){
		// 	champ8Obj.champ8Item1 = item
		// }else if (partId == 8 && champ8Obj.champ8Item2 == ""){
		// 	champ8Obj.champ8Item2 = item
		// }else if (partId == 8 && champ8Obj.champ8Item3 == ""){
		// 	champ8Obj.champ8Item3 = item
		// }else if (partId == 8 && champ8Obj.champ8Item4 == ""){
		// 	champ8Obj.champ8Item4 = item
		// }else if (partId == 8 && champ8Obj.champ8Item5 == ""){
		// 	champ8Obj.champ8Item5 = item
		// }else if (partId == 8 && champ8Obj.champ8Item6 == ""){
		// 	champ8Obj.champ8Item6 = item
		// }else if (partId == 9 && champ9Obj.champ9Item1 == ""){
		// 	champ9Obj.champ9Item1 = item
		// }else if (partId == 9 && champ9Obj.champ9Item2 == ""){
		// 	champ9Obj.champ9Item2 = item
		// }else if (partId == 9 && champ9Obj.champ9Item3 == ""){
		// 	champ9Obj.champ9Item3 = item
		// }else if (partId == 9 && champ9Obj.champ9Item4 == ""){
		// 	champ9Obj.champ9Item4 = item
		// }else if (partId == 9 && champ9Obj.champ9Item5 == ""){
		// 	champ9Obj.champ9Item5 = item
		// }else if (partId == 9 && champ9Obj.champ9Item6 == ""){
		// 	champ9Obj.champ9Item6 = item
		// }else if (partId == 10 && champ10Obj.champ10Item1 == ""){
		// 	champ10Obj.champ10Item1 = item
		// }else if (partId == 10 && champ10Obj.champ10Item2 == ""){
		// 	champ10Obj.champ10Item2 = item
		// }else if (partId == 10 && champ10Obj.champ10Item3 == ""){
		// 	champ10Obj.champ10Item3 = item
		// }else if (partId == 10 && champ10Obj.champ10Item4 == ""){
		// 	champ10Obj.champ10Item4 = item
		// }else if (partId == 10 && champ10Obj.champ10Item5 == ""){
		// 	champ10Obj.champ10Item5 = item
		// }else if (partId == 10 && champ10Obj.champ10Item6 == ""){
		// 	champ10Obj.champ10Item6 = item
		// }				
	}else if (eventType == "ITEM_DESTROYED"){
		if(consumable.indexOf(item)!== -1){
			// if(partId == 1){
			// 	champ1Obj.champ1Consumable.push(item)
			// }else if(partId == 2){
			// 	champ2Obj.champ2Consumable.push(item)
			// }else if(partId == 3){
			// 	champ3Obj.champ3Consumable.push(item)
			// }else if(partId == 4){
			// 	champ4Obj.champ4Consumable.push(item)
			// }else if(partId == 5){
			// 	champ5Obj.champ5Consumable.push(item)
			// }else if(partId == 6){
			// 	champ6Obj.champ6Consumable.push(item)
			// }else if(partId == 7){
			// 	champ7Obj.champ7Consumable.push(item)
			// }else if(partId == 8){
			// 	champ8Obj.champ8Consumable.push(item)
			// }else if(partId == 9){
			// 	champ9Obj.champ9Consumable.push(item)
			// }else if(partId == 10){
			// 	champ10Obj.champ10Consumable.push(item)
			// }											
		}else if (trinket.indexOf(item) !== -1){
			// if (partId ==1){
			// 	champ1Obj.champ1ItemTrinket = item
			// }else if(partId ==2){
			// 	champ2Obj.champ2ItemTrinket = item				
			// }else if(partId ==3){
			// 	champ3Obj.champ3ItemTrinket = item				
			// }else if(partId ==4){
			// 	champ4Obj.champ4ItemTrinket = item				
			// }else if(partId ==5){
			// 	champ5Obj.champ5ItemTrinket = item				
			// }else if (partId ==6){
			// 	champ6Obj.champ6ItemTrinket = item				
			// }else if(partId ==7){
			// 	champ7Obj.champ7ItemTrinket = item				
			// }else if(partId ==8){
			// 	champ8Obj.champ8ItemTrinket = item				
			// }else if(partId ==9){
			// 	champ9Obj.champ9ItemTrinket = item				
			// }else if(partId ==10){
			// 	champ10Obj.champ10ItemTrinket = item				
			// }
		}else if (partId == 1 && champ1Obj.champ1Item1 == item){
			champ1Obj.champ1Item1 = ""
			return 
		}else if (partId == 1 && champ1Obj.champ1Item2 == item){
			champ1Obj.champ1Item2 = ""
			return 
		}else if (partId == 1 && champ1Obj.champ1Item3 == item){
			champ1Obj.champ1Item3 = ""
			return 
		}else if (partId == 1 && champ1Obj.champ1Item4 == item){
			champ1Obj.champ1Item4 = ""
			return
		}else if (partId == 1 && champ1Obj.champ1Item5 == item){
			champ1Obj.champ1Item5 = ""
			return
		}else if (partId == 1 && champ1Obj.champ1Item6 == item){
			champ1Obj.champ1Item6 = ""
			return
		}
		else if (partId == 2 && champ2Obj.champ2Item1 == item){
			champ2Obj.champ2Item1 = ""
			return
		}else if (partId == 2 && champ2Obj.champ2Item2 == item){
			champ2Obj.champ2Item2 = ""
			return
		}else if (partId == 2 && champ2Obj.champ2Item3 == item){
			champ2Obj.champ2Item3 = ""
			return
		}else if (partId == 2 && champ2Obj.champ2Item4 == item){
			champ2Obj.champ2Item4 = ""
			return
		}else if (partId == 2 && champ2Obj.champ2Item5 == item){
			champ2Obj.champ2Item5 = ""
			return
		}else if (partId == 2 && champ2Obj.champ2Item6 == item){
			champ2Obj.champ2Item6 = ""
			return
		}
		// else if (partId == 3 && champ3Obj.champ3Item1 == item){
		// 	champ3Obj.champ3Item1 = ""
		// }else if (partId == 3 && champ3Obj.champ3Item2 == item){
		// 	champ3Obj.champ3Item2 = ""
		// }else if (partId == 3 && champ3Obj.champ3Item3 == item){
		// 	champ3Obj.champ3Item3 = ""
		// }else if (partId == 3 && champ3Obj.champ3Item4 == item){
		// 	champ3Obj.champ3Item4 = ""
		// }else if (partId == 3 && champ3Obj.champ3Item5 == item){
		// 	champ3Obj.champ3Item5 = ""
		// }else if (partId == 3 && champ3Obj.champ3Item6 == item){
		// 	champ3Obj.champ3Item6 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item1 == item){
		// 	champ4Obj.champ4Item1 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item2 == item){
		// 	champ4Obj.champ4Item2 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item3 == item){
		// 	champ4Obj.champ4Item3 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item4 == item){
		// 	champ4Obj.champ4Item4 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item5 == item){
		// 	champ4Obj.champ4Item5 = ""
		// }else if (partId == 4 && champ4Obj.champ4Item6 == item){
		// 	champ4Obj.champ4Item6 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item1 == item){
		// 	champ5Obj.champ5Item1 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item2 == item){
		// 	champ5Obj.champ5Item2 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item3 == item){
		// 	champ5Obj.champ5Item3 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item4 == item){
		// 	champ5Obj.champ5Item4 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item5 == item){
		// 	champ5Obj.champ5Item5 = ""
		// }else if (partId == 5 && champ5Obj.champ5Item6 == item){
		// 	champ5Obj.champ5Item6 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item1 == item){
		// 	champ6Obj.champ6Item1 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item2 == item){
		// 	champ6Obj.champ6Item2 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item3 == item){
		// 	champ6Obj.champ6Item3 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item4 == item){
		// 	champ6Obj.champ6Item4 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item5 == item){
		// 	champ6Obj.champ6Item5 = ""
		// }else if (partId == 6 && champ6Obj.champ6Item6 == item){
		// 	champ6Obj.champ6Item6 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item1 == item){
		// 	champ7Obj.champ7Item1 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item2 == item){
		// 	champ7Obj.champ7Item2 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item3 == item){
		// 	champ7Obj.champ7Item3 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item4 == item){
		// 	champ7Obj.champ7Item4 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item5 == item){
		// 	champ7Obj.champ7Item5 = ""
		// }else if (partId == 7 && champ7Obj.champ7Item6 == item){
		// 	champ7Obj.champ7Item6 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item1 == item){
		// 	champ8Obj.champ8Item1 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item2 == item){
		// 	champ8Obj.champ8Item2 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item3 == item){
		// 	champ8Obj.champ8Item3 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item4 == item){
		// 	champ8Obj.champ8Item4 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item5 == item){
		// 	champ8Obj.champ8Item5 = ""
		// }else if (partId == 8 && champ8Obj.champ8Item6 == item){
		// 	champ8Obj.champ8Item6 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item1 == item){
		// 	champ9Obj.champ9Item1 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item2 == item){
		// 	champ9Obj.champ9Item2 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item3 == item){
		// 	champ9Obj.champ9Item3 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item4 == item){
		// 	champ9Obj.champ9Item4 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item5 == item){
		// 	champ9Obj.champ9Item5 = ""
		// }else if (partId == 9 && champ9Obj.champ9Item6 == item){
		// 	champ9Obj.champ9Item6 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item1 == item){
		// 	champ10Obj.champ10Item1 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item2 == item){
		// 	champ10Obj.champ10Item2 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item3 == item){
		// 	champ10Obj.champ10Item3 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item4 == item){
		// 	champ10Obj.champ10Item4 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item5 == item){
		// 	champ10Obj.champ10Item5 = ""
		// }else if (partId == 10 && champ10Obj.champ10Item6 == item){
		// 	champ10Obj.champ10Item6 = ""
		// }
	}
	console.log(champ1Obj)
	console.log(champ2Obj)
	// console.log(champ3Obj)
	// console.log(champ4Obj)
	// console.log(champ5Obj)
	// console.log(champ6Obj)
	// console.log(champ7Obj)
	// console.log(champ8Obj)
	// console.log(champ9Obj)
	// console.log(champ10Obj)						
}
