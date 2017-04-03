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

$.ajax({
	url: "https://na.api.riotgames.com/api/lol/NA/v2.2/match/2466226913?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
}).done(function(results){
// CS Per Min Section Start ====================================================================================================================
let summonerarr = results.participants 

for(i=0; i<summonerarr.length; i++){
	let timeline = summonerarr[i].timeline
	console.log(timeline.creepsPerMinDeltas)
}
// CS Per Min Section End ====================================================================================================================
})
// Static Data Call End ===========================================================================