$("#timesubmit").on("click", function(event){
	timeHandler(event, frameRequest);
})
var dt_from = "2014/11/01 00:34:44";
var dt_to = "2014/11/24 16:37:43";

$('.slider-time').html(dt_from);
$('.slider-time2').html(dt_to);
var min_val = Date.parse(dt_from)/1000;
var max_val = Date.parse(dt_to)/1000;

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
function formatDT(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+1, 2);
    var date = zeroPad(__dt.getDate(), 2);
    var hours = zeroPad(__dt.getHours(), 2);
    var minutes = zeroPad(__dt.getMinutes(), 2);
    var seconds = zeroPad(__dt.getSeconds(), 2);
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
};


$("#slider-range").slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    slide: function (e, ui) {
        var dt_cur_from = new Date(ui.values[0]*1000); //.format("yyyy-mm-dd hh:ii:ss");
        $('.slider-time').html(formatDT(dt_cur_from));

        var dt_cur_to = new Date(ui.values[1]*1000); //.format("yyyy-mm-dd hh:ii:ss");                
        $('.slider-time2').html(formatDT(dt_cur_to));
    }
});

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
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2484895810?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
	console.log(results)
	const allframes = results.timeline.frames
	let seconds =results.matchDuration
	let matchTime = parseInt(seconds)*1000
	var frame = $("#frame")
	var event;
	var time = 0;
	var events = [];
	var objectProcessor;	
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
			  		objectProcessor = objectAppend		  			  			  			  
				}
				if(eventType == "ITEM_SOLD" || eventType == "ITEM_PURCHASED" || eventType == "ITEM_DESTROYED"){
					console.log(event)
					if (timestamp < timeRequested){					
						cb(event, eventType, timestamp, item, partId, frame, objectProcessor)
					}else{
						// console.log("Greater")
					}	
				}else if (eventType == "ITEM_UNDO"){
					console.log(event)
					console.log(objectProcessor)
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
});
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
function objectAppend(event, eventType, timestamp, item, partId){
	// console.log("Not a Champion")
	// var consumable = [2031, 2032, 2033, 2009, 2010, 2055, 2138, 2139, 2140, 2003];
	// var trinket = [3340, 3341, 3361, 3362, 3363, 3364];
	// if(eventType == "ITEM_PURCHASED"){
	// 	if(consumable.indexOf(item)!== -1){
	// 		if(partId == 1){
	// 			champ5Obj.champ1Consumable.push(item)
	// 		}else if(partId == 2){
	// 			champ2Obj.champ2Consumable.push(item)
	// 		}else if(partId == 3){
	// 			champ3Obj.champ3Consumable.push(item)
	// 		}else if(partId == 4){
	// 			champ4Obj.champ4Consumable.push(item)
	// 		}else if(partId == 5){
	// 			champ5Obj.champ5Consumable.push(item)
	// 		}else if(partId == 6){
	// 			champ6Obj.champ6Consumable.push(item)
	// 		}else if(partId == 7){
	// 			champ7Obj.champ7Consumable.push(item)
	// 		}else if(partId == 8){
	// 			champ8Obj.champ8Consumable.push(item)
	// 		}else if(partId == 9){
	// 			champ9Obj.champ9Consumable.push(item)
	// 		}else if(partId == 10){
	// 			champ10Obj.champ10Consumable.push(item)
	// 		}											
	// 	}else if (trinket.indexOf(item) !== -1){
	// 		if (partId ==1){
	// 			champ8Obj.champ1ItemTrinket = item
	// 		}else if(partId ==2){
	// 			champ2Obj.champ2ItemTrinket = item				
	// 		}else if(partId ==3){
	// 			champ3Obj.champ3ItemTrinket = item				
	// 		}else if(partId ==4){
	// 			champ4Obj.champ4ItemTrinket = item				
	// 		}else if(partId ==5){
	// 			champ5Obj.champ5ItemTrinket = item				
	// 		}else if (partId ==6){
	// 			champ6Obj.champ6ItemTrinket = item				
	// 		}else if(partId ==7){
	// 			champ7Obj.champ7ItemTrinket = item				
	// 		}else if(partId ==8){
	// 			champ8Obj.champ8ItemTrinket = item				
	// 		}else if(partId ==9){
	// 			champ9Obj.champ9ItemTrinket = item				
	// 		}else if(partId ==10){
	// 			champ10Obj.champ10ItemTrinket = item				
	// 		}
	// 	}else if (partId == 1 && champ1Obj.champ1Item1 == ""){
	// 		champ1Obj.champ1Item1 = item
	// 		return item
	// 	}else if (partId == 1 && champ1Obj.champ1Item2 == ""){
	// 		champ1Obj.champ1Item2 = item
	// 		return item			
	// 	}else if (partId == 1 && champ1Obj.champ1Item3 == ""){
	// 		champ1Obj.champ1Item3 = item
	// 		return item			
	// 	}else if (partId == 1 && champ1Obj.champ1Item4 == ""){
	// 		champ1Obj.champ1Item4 = item
	// 		return item			
	// 	}else if (partId == 1 && champ1Obj.champ1Item5 == ""){
	// 		champ1Obj.champ1Item5 = item
	// 		return item	
	// 	}else if (partId == 1 && champ1Obj.champ1Item6 == ""){
	// 		champ1Obj.champ1Item6 = item
	// 		return item	
	// 	}
	// 	else if (partId == 2 && champ2Obj.champ2Item1 == ""){
	// 		champ2Obj.champ2Item1 = item
	// 		return item
	// 	}else if (partId == 2 && champ2Obj.champ2Item2 == ""){
	// 		champ2Obj.champ2Item2 = item
	// 		return item
	// 	}else if (partId == 2 && champ2Obj.champ2Item3 == ""){
	// 		champ2Obj.champ2Item3 = item
	// 		return item
	// 	}else if (partId == 2 && champ2Obj.champ2Item4 == ""){
	// 		champ2Obj.champ2Item4 = item
	// 		return item
	// 	}else if (partId == 2 && champ2Obj.champ2Item5 == ""){
	// 		champ2Obj.champ2Item5 = item
	// 		return item
	// 	}else if (partId == 2 && champ2Obj.champ2Item6 == ""){
	// 		champ2Obj.champ2Item6 = item
	// 		return item
	// 	}
	// 	// else if (partId == 3 && champ3Obj.champ3Item1 == ""){
	// 	// 	champ3Obj.champ3Item1 = item
	// 	// }else if (partId == 3 && champ3Obj.champ3Item2 == ""){
	// 	// 	champ3Obj.champ3Item2 = item
	// 	// }else if (partId == 3 && champ3Obj.champ3Item3 == ""){
	// 	// 	champ3Obj.champ3Item3 = item
	// 	// }else if (partId == 3 && champ3Obj.champ3Item4 == ""){
	// 	// 	champ3Obj.champ3Item4 = item
	// 	// }else if (partId == 3 && champ3Obj.champ3Item5 == ""){
	// 	// 	champ3Obj.champ3Item5 = item
	// 	// }else if (partId == 3 && champ3Obj.champ3Item6 == ""){
	// 	// 	champ3Obj.champ3Item6 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item1 == ""){
	// 	// 	champ4Obj.champ4Item1 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item2 == ""){
	// 	// 	champ4Obj.champ4Item2 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item3 == ""){
	// 	// 	champ4Obj.champ4Item3 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item4 == ""){
	// 	// 	champ4Obj.champ4Item4 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item5 == ""){
	// 	// 	champ4Obj.champ4Item5 = item
	// 	// }else if (partId == 4 && champ4Obj.champ4Item6 == ""){
	// 	// 	champ4Obj.champ4Item6 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item1 == ""){
	// 	// 	champ5Obj.champ5Item1 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item2 == ""){
	// 	// 	champ5Obj.champ5Item2 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item3 == ""){
	// 	// 	champ5Obj.champ5Item3 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item4 == ""){
	// 	// 	champ5Obj.champ5Item4 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item5 == ""){
	// 	// 	champ5Obj.champ5Item5 = item
	// 	// }else if (partId == 5 && champ5Obj.champ5Item6 == ""){
	// 	// 	champ5Obj.champ5Item6 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item1 == ""){
	// 	// 	champ6Obj.champ6Item1 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item2 == ""){
	// 	// 	champ6Obj.champ6Item2 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item3 == ""){
	// 	// 	champ6Obj.champ6Item3 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item4 == ""){
	// 	// 	champ6Obj.champ6Item4 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item5 == ""){
	// 	// 	champ6Obj.champ6Item5 = item
	// 	// }else if (partId == 6 && champ6Obj.champ6Item6 == ""){
	// 	// 	champ6Obj.champ6Item6 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item1 == ""){
	// 	// 	champ7Obj.champ7Item1 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item2 == ""){
	// 	// 	champ7Obj.champ7Item2 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item3 == ""){
	// 	// 	champ7Obj.champ7Item3 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item4 == ""){
	// 	// 	champ7Obj.champ7Item4 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item5 == ""){
	// 	// 	champ7Obj.champ7Item5 = item
	// 	// }else if (partId == 7 && champ7Obj.champ7Item6 == ""){
	// 	// 	champ7Obj.champ7Item6 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item1 == ""){
	// 	// 	champ8Obj.champ8Item1 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item2 == ""){
	// 	// 	champ8Obj.champ8Item2 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item3 == ""){
	// 	// 	champ8Obj.champ8Item3 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item4 == ""){
	// 	// 	champ8Obj.champ8Item4 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item5 == ""){
	// 	// 	champ8Obj.champ8Item5 = item
	// 	// }else if (partId == 8 && champ8Obj.champ8Item6 == ""){
	// 	// 	champ8Obj.champ8Item6 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item1 == ""){
	// 	// 	champ9Obj.champ9Item1 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item2 == ""){
	// 	// 	champ9Obj.champ9Item2 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item3 == ""){
	// 	// 	champ9Obj.champ9Item3 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item4 == ""){
	// 	// 	champ9Obj.champ9Item4 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item5 == ""){
	// 	// 	champ9Obj.champ9Item5 = item
	// 	// }else if (partId == 9 && champ9Obj.champ9Item6 == ""){
	// 	// 	champ9Obj.champ9Item6 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item1 == ""){
	// 	// 	champ10Obj.champ10Item1 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item2 == ""){
	// 	// 	champ10Obj.champ10Item2 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item3 == ""){
	// 	// 	champ10Obj.champ10Item3 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item4 == ""){
	// 	// 	champ10Obj.champ10Item4 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item5 == ""){
	// 	// 	champ10Obj.champ10Item5 = item
	// 	// }else if (partId == 10 && champ10Obj.champ10Item6 == ""){
	// 	// 	champ10Obj.champ10Item6 = item
	// 	// }				
	// }else if (eventType == "ITEM_DESTROYED"){
	// 	if(consumable.indexOf(item)!== -1){
	// 		// if(partId == 1){
	// 		// 	champ1Obj.champ1Consumable.push(item)
	// 		// }else if(partId == 2){
	// 		// 	champ2Obj.champ2Consumable.push(item)
	// 		// }else if(partId == 3){
	// 		// 	champ3Obj.champ3Consumable.push(item)
	// 		// }else if(partId == 4){
	// 		// 	champ4Obj.champ4Consumable.push(item)
	// 		// }else if(partId == 5){
	// 		// 	champ5Obj.champ5Consumable.push(item)
	// 		// }else if(partId == 6){
	// 		// 	champ6Obj.champ6Consumable.push(item)
	// 		// }else if(partId == 7){
	// 		// 	champ7Obj.champ7Consumable.push(item)
	// 		// }else if(partId == 8){
	// 		// 	champ8Obj.champ8Consumable.push(item)
	// 		// }else if(partId == 9){
	// 		// 	champ9Obj.champ9Consumable.push(item)
	// 		// }else if(partId == 10){
	// 		// 	champ10Obj.champ10Consumable.push(item)
	// 		// }											
	// 	}else if (trinket.indexOf(item) !== -1){
	// 		// if (partId ==1){
	// 		// 	champ1Obj.champ1ItemTrinket = item
	// 		// }else if(partId ==2){
	// 		// 	champ2Obj.champ2ItemTrinket = item				
	// 		// }else if(partId ==3){
	// 		// 	champ3Obj.champ3ItemTrinket = item				
	// 		// }else if(partId ==4){
	// 		// 	champ4Obj.champ4ItemTrinket = item				
	// 		// }else if(partId ==5){
	// 		// 	champ5Obj.champ5ItemTrinket = item				
	// 		// }else if (partId ==6){
	// 		// 	champ6Obj.champ6ItemTrinket = item				
	// 		// }else if(partId ==7){
	// 		// 	champ7Obj.champ7ItemTrinket = item				
	// 		// }else if(partId ==8){
	// 		// 	champ8Obj.champ8ItemTrinket = item				
	// 		// }else if(partId ==9){
	// 		// 	champ9Obj.champ9ItemTrinket = item				
	// 		// }else if(partId ==10){
	// 		// 	champ10Obj.champ10ItemTrinket = item				
	// 		// }
	// 	}else if (partId == 1 && champ1Obj.champ1Item1 == item){
	// 		champ1Obj.champ1Item1 = ""
	// 		return 
	// 	}else if (partId == 1 && champ1Obj.champ1Item2 == item){
	// 		champ1Obj.champ1Item2 = ""
	// 		return 
	// 	}else if (partId == 1 && champ1Obj.champ1Item3 == item){
	// 		champ1Obj.champ1Item3 = ""
	// 		return 
	// 	}else if (partId == 1 && champ1Obj.champ1Item4 == item){
	// 		champ1Obj.champ1Item4 = ""
	// 		return
	// 	}else if (partId == 1 && champ1Obj.champ1Item5 == item){
	// 		champ1Obj.champ1Item5 = ""
	// 		return
	// 	}else if (partId == 1 && champ1Obj.champ1Item6 == item){
	// 		champ1Obj.champ1Item6 = ""
	// 		return
	// 	}
	// 	else if (partId == 2 && champ2Obj.champ2Item1 == item){
	// 		champ2Obj.champ2Item1 = ""
	// 		return
	// 	}else if (partId == 2 && champ2Obj.champ2Item2 == item){
	// 		champ2Obj.champ2Item2 = ""
	// 		return
	// 	}else if (partId == 2 && champ2Obj.champ2Item3 == item){
	// 		champ2Obj.champ2Item3 = ""
	// 		return
	// 	}else if (partId == 2 && champ2Obj.champ2Item4 == item){
	// 		champ2Obj.champ2Item4 = ""
	// 		return
	// 	}else if (partId == 2 && champ2Obj.champ2Item5 == item){
	// 		champ2Obj.champ2Item5 = ""
	// 		return
	// 	}else if (partId == 2 && champ2Obj.champ2Item6 == item){
	// 		champ2Obj.champ2Item6 = ""
	// 		return
	// 	}
	// 	// else if (partId == 3 && champ3Obj.champ3Item1 == item){
	// 	// 	champ3Obj.champ3Item1 = ""
	// 	// }else if (partId == 3 && champ3Obj.champ3Item2 == item){
	// 	// 	champ3Obj.champ3Item2 = ""
	// 	// }else if (partId == 3 && champ3Obj.champ3Item3 == item){
	// 	// 	champ3Obj.champ3Item3 = ""
	// 	// }else if (partId == 3 && champ3Obj.champ3Item4 == item){
	// 	// 	champ3Obj.champ3Item4 = ""
	// 	// }else if (partId == 3 && champ3Obj.champ3Item5 == item){
	// 	// 	champ3Obj.champ3Item5 = ""
	// 	// }else if (partId == 3 && champ3Obj.champ3Item6 == item){
	// 	// 	champ3Obj.champ3Item6 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item1 == item){
	// 	// 	champ4Obj.champ4Item1 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item2 == item){
	// 	// 	champ4Obj.champ4Item2 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item3 == item){
	// 	// 	champ4Obj.champ4Item3 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item4 == item){
	// 	// 	champ4Obj.champ4Item4 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item5 == item){
	// 	// 	champ4Obj.champ4Item5 = ""
	// 	// }else if (partId == 4 && champ4Obj.champ4Item6 == item){
	// 	// 	champ4Obj.champ4Item6 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item1 == item){
	// 	// 	champ5Obj.champ5Item1 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item2 == item){
	// 	// 	champ5Obj.champ5Item2 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item3 == item){
	// 	// 	champ5Obj.champ5Item3 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item4 == item){
	// 	// 	champ5Obj.champ5Item4 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item5 == item){
	// 	// 	champ5Obj.champ5Item5 = ""
	// 	// }else if (partId == 5 && champ5Obj.champ5Item6 == item){
	// 	// 	champ5Obj.champ5Item6 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item1 == item){
	// 	// 	champ6Obj.champ6Item1 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item2 == item){
	// 	// 	champ6Obj.champ6Item2 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item3 == item){
	// 	// 	champ6Obj.champ6Item3 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item4 == item){
	// 	// 	champ6Obj.champ6Item4 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item5 == item){
	// 	// 	champ6Obj.champ6Item5 = ""
	// 	// }else if (partId == 6 && champ6Obj.champ6Item6 == item){
	// 	// 	champ6Obj.champ6Item6 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item1 == item){
	// 	// 	champ7Obj.champ7Item1 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item2 == item){
	// 	// 	champ7Obj.champ7Item2 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item3 == item){
	// 	// 	champ7Obj.champ7Item3 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item4 == item){
	// 	// 	champ7Obj.champ7Item4 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item5 == item){
	// 	// 	champ7Obj.champ7Item5 = ""
	// 	// }else if (partId == 7 && champ7Obj.champ7Item6 == item){
	// 	// 	champ7Obj.champ7Item6 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item1 == item){
	// 	// 	champ8Obj.champ8Item1 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item2 == item){
	// 	// 	champ8Obj.champ8Item2 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item3 == item){
	// 	// 	champ8Obj.champ8Item3 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item4 == item){
	// 	// 	champ8Obj.champ8Item4 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item5 == item){
	// 	// 	champ8Obj.champ8Item5 = ""
	// 	// }else if (partId == 8 && champ8Obj.champ8Item6 == item){
	// 	// 	champ8Obj.champ8Item6 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item1 == item){
	// 	// 	champ9Obj.champ9Item1 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item2 == item){
	// 	// 	champ9Obj.champ9Item2 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item3 == item){
	// 	// 	champ9Obj.champ9Item3 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item4 == item){
	// 	// 	champ9Obj.champ9Item4 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item5 == item){
	// 	// 	champ9Obj.champ9Item5 = ""
	// 	// }else if (partId == 9 && champ9Obj.champ9Item6 == item){
	// 	// 	champ9Obj.champ9Item6 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item1 == item){
	// 	// 	champ10Obj.champ10Item1 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item2 == item){
	// 	// 	champ10Obj.champ10Item2 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item3 == item){
	// 	// 	champ10Obj.champ10Item3 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item4 == item){
	// 	// 	champ10Obj.champ10Item4 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item5 == item){
	// 	// 	champ10Obj.champ10Item5 = ""
	// 	// }else if (partId == 10 && champ10Obj.champ10Item6 == item){
	// 	// 	champ10Obj.champ10Item6 = ""
	// 	// }
	// }
	// console.log(champ1Obj)
	// console.log(champ2Obj)
	// // console.log(champ3Obj)
	// // console.log(champ4Obj)
	// // console.log(champ5Obj)
	// // console.log(champ6Obj)
	// // console.log(champ7Obj)
	// // console.log(champ8Obj)
	// // console.log(champ9Obj)
	// // console.log(champ10Obj)						
}
