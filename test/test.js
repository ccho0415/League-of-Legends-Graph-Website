function timeconvert(millis) {
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return (seconds < 10 ? '0' : '') + seconds;
}
function Frame(champ1Item, champ1Alive, champ1Position,champ2Item, champ2Alive, champ2Position,champ3Item, champ3Alive, champ3Position,champ4Item, champ4Alive, champ4Position,champ5Item, champ5Alive, champ5Position,champ6Item, champ6Alive, champ6Position,champ7Item, champ7Alive, champ7Position,champ8Item, champ8Alive, champ8Position,champ9Item, champ9Alive, champ9Position,champ10Item, champ10Alive, champ10Position){
		this.champ1Item = champ1Item;
		this.champ1Alive = champ1Alive;
		this.champ1Position = champ1Position;
		this.champ2Item = champ2Item;
		this.champ2Alive = champ2Alive;
		this.champ2Position = champ2Position;
		this.champ3Item = champ3Item;
		this.champ3Alive = champ3Alive;
		this.champ3Position = champ3Position;
		this.champ4Item = champ4Item;
		this.champ4Alive = champ4Alive;
		this.champ4Position = champ4Position;
		this.champ5Item = champ5Item;
		this.champ5Alive = champ5Alive;
		this.champ5Position = champ5Position;
		this.champ6Item = champ6Item;
		this.champ6Alive = champ6Alive;
		this.champ6Position = champ6Position;
		this.champ7Item = champ7Item;
		this.champ7Alive = champ7Alive;
		this.champ7Position = champ7Position;
		this.champ8Item = champ8Item;
		this.champ8Alive = champ8Alive;
		this.champ8Position = champ8Position;
		this.champ9Item = champ9Item;
		this.champ9Alive = champ9Alive;
		this.champ9Position = champ9Position;
		this.champ10Item = champ10Item;
		this.champ10Alive = champ10Alive;
		this.champ10Position = champ10Position;


}
$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2477649342?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
	console.log(results)
	let seconds =results.matchDuration
	let matchTime = parseInt(seconds)*1000
	var frame = $("#frame")
	var time = 0;
	function increment(){
		time++
		console.log(time)
	}
	for(i=0;i<=matchTime-1;i++){
		if (i%1000 == 0){
		increment()			
		}

	}
	console.log(time)
});