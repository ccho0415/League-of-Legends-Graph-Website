// *********************************************************************************
// data-routes.js - a set of routes for queries into riot's api
// *********************************************************************************

// Dependencies
// =============================================================
var request = require('request');
var entries = require('object.entries');
// Routes
// =============================================================
module.exports = function(app) {
  // POST route for getting searching summoner by name
  app.post("/data/sumname/:summoner", function(req, res) {
  	var name = req.params.summoner
  	var name = name.split(' ').join('');
  	var url = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/"+name+"?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3";
  	request(url, function(error, response, body){	
  		if(error){
  			error = "Query failed";
   			res.send(error); 			
  		}else if (response.statusCode == 404){
 			error = "Not a summoner";
  			res.send(error);  		
  		}else{
  			info = JSON.parse(body);
   			console.log("=====================================================================================");  			
        console.log("Account Id : "+info.accountId);  			
        console.log("Summoner Id : "+info.id);
  			console.log("Profile Icon : "+info.profileIconId);
  			console.log("Summoner Name : "+info.name);
  		  console.log("=====================================================================================");  	
  		  	var summoner = {
  		  		name: info.name,
  		  		icon: info.profileIconId,
  		  		id: info.id,
            accountid: info.accountId
  		  	}
  		  	res.json(summoner)			  			  			
  		}
  	}); 	
  });

  app.post("/data/recentgames/:id", function(req, res) {
  	var sumId = req.params.id
  	var url = "https://na.api.riotgames.com/api/lol/NA/v1.3/game/by-summoner/"+sumId+"/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
  	request(url, function(error,response, body){
  		// Check What Type of info is received
  		// console.log("=====================================================================================");  		
  		// console.log("Err : "+error);
  		// console.log("=====================================================================================");
  		// console.log("Res : "+response &&response.statusCode);
  		// console.log("=====================================================================================");  		
  		// console.log("Body : "+body);
   		// console.log("=====================================================================================");
		  var info = JSON.parse(body);
		  // Pretty Print for body
		  console.log(info);
  		console.log("=====================================================================================");
   		var index = [];
		  function Gameobj (gameid, win, kills, deaths, assists, gold, minions, champ, spell1, spell2, invalid, players) {
			 this.gameid= gameid;
			 this.win= win;
			 this.kills= kills;
			 this.deaths= deaths;
			 this.assists= assists;
			 this.gold= gold;
			 this.minions = minions;
			 this.champ= champ;	
       this.spell1 = spell1;
       this.spell2 = spell2;
       this.players = players;	
		  }   			
		  for(i=0; i<info.games.length; i++){
			 var gameid =info.games[i].gameId
			 var stats = info.games[i].stats
       var kills;
       var assists;
       var deaths;
       if (stats.championsKilled == undefined){
        var kills = 0;
       }else{
        var kills = stats.championsKilled        
       }
       if(stats.assists == undefined){
        var assists = 0;
       }else{
        var assists = stats.assists
       }
       if(stats.numDeaths == undefined){
        var deaths = 0;
       }else{
        var deaths = stats.numDeaths
       }
       var players = info.games[i].fellowPlayers
			 var currentgame = new Gameobj(gameid, stats.win, kills, deaths, assists, stats.goldEarned, stats.minionsKilled, info.games[i].championId, info.games[i].spell1, info.games[i].spell2, info.games[i].invalid, players)
			 index.push(currentgame);		
       console.log(currentgame)									
		  }
   		 console.log("=====================================================================================");
   		 res.json(index);
  	});
  });
  app.post("/data/details/:id", function(req, res) {
  	var gameid = req.params.id
  	var url = "https://na.api.riotgames.com/api/lol/NA/v2.2/match/"+gameid+"?includeTimeline=true&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
    console.log(url);
    request(url, function(error, response, body){
  		var result = JSON.parse(body);
      function matchObj(matchVersion, region, matchId, matchMode, matchType, matchDuration, queueType, mapId, season, participantIdentities, participants, teams, timeline, analysis){
        this.matchVersion = matchVersion;
        this.region = region;
        this.matchId = matchId;
        this.matchMode = matchMode;
        this.matchType = matchType;
        this.matchDuration = matchDuration;
        this.queueType = queueType;
        this.mapId = mapId;
        this.season = season;
        this.participantIdentities = participantIdentities;
        this.participants = participants;
        this.teams = teams;
        this.timeline  = timeline;
        this.analysis = analysis;
      }
      let matchVersion = result.matchVersion;
      let region = result.region;
      let matchId = result.matchId;
      let matchMode = result.matchMode;
      let matchType = result.matchType;
      let matchDuration = result.matchDuration;
      let queueType = result.queueType;
      let mapId = result.mapId;
      let season = result.season;
      let participantIdentities = result.participantIdentities;
      let participants = result.participants;
      let teams = result.teams;
      let timeline = result.timeline;
      let analysis = {}
      var currentmatch = new matchObj(matchVersion, region, matchId, matchMode, matchType, matchDuration, queueType, mapId, season, participantIdentities, participants, teams, timeline, analysis);
      res.json(currentmatch)       		
  	})
  });
  app.get("/data/static-champ", function(req, res){
    var url = "https://na1.api.riotgames.com/lol/static-data/v3/champions?champListData=all&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
    request(url, function(error, response, body){
      var allchamps = [];      
      var info = JSON.parse(body);
      console.log(info)
      let patch = info.version
      const champobj = info.keys;
      const champstatobj = info.data;
      const champstatarr = entries(champstatobj);
      function champObj(patch, id, champName,armor,armorPer,ad,adPer,range,asOff,asPer,crit,critPer,hp,hpPer,hpReg,hpRegPer,movespeed, mp,mpPer,mpReg, mpRegPer,spellblock,spellblockPer,q,w,e,r ){
        this.patch = patch;
        this.id = id;
        this.champName=champName;
        this.armor= armor;
        this.armorPer= armorPer;
        this.ad= ad;
        this.adPer= adPer;
        this.range= range;
        this.asOff= asOff;
        this.asPer= asPer;
        this.crit= crit;
        this.critPer= critPer;
        this.hp= hp;
        this.hpPer= hpPer;
        this.hpReg= hpReg;
        this.hpRegPer= hpRegPer;
        this.movespeed= movespeed;
        this.mp= mp;
        this.mpPer= mpPer;
        this.mpReg= mpReg;
        this.mpRegPer= mpRegPer;
        this.spellblock= spellblock;
        this.spellblockPer= spellblockPer;
        this.Q= q;
        this.W= w;
        this.E= e;
        this.R= r;
      }
      for (i=0; i<champstatarr.length; i++) {
        let champ = champstatarr[i]
        let id = champ[1].id
        let champstat = champ[1].stats
        let name= champ[0];
        console.log(champ)
        let armor= champstat.armor;
        let armorper= champstat.armorperlevel;
        let ad= champstat.attackdamage;
        let adper= champstat.attackdamageperlevel;
        let range= champstat.attackrange;
        let asoff= champstat.attackspeedoffset;
        let asper= champstat.attackspeedoffset; 
        let crit= champstat.crit;
        let critper= champstat.critperlevel;
        let hp = champstat.hp;
        let hpper= champstat.hpperlevel;
        let hpreg= champstat.hpregen;
        let hpregper= champstat.hpregenperlevel;
        let movespeed= champstat.movespeed;
        let mp= champstat.hpregenperlevel;
        let mpper= champstat.mpperlevel;
        let mpreg= champstat.mpregen;
        let mpregper= champstat.mpregenperlevel;
        let spellblock= champstat.spellblock;
        let spellblockper= champstat.spellblockperlevel;
        let champspells = champ[1].spells
        let q = champspells[0];
        let w = champspells[1];
        let e = champspells[2];
        let r = champspells[3];
        var currentchamp = new champObj(patch, id, name,armor,armorper,ad,adper,range,asoff,asper,crit,critper,hp,hpper,hpreg,hpregper,movespeed, mp,mpper,mpreg, mpregper,spellblock,spellblockper,q,w,e,r);
        allchamps.push(currentchamp);
        }
      res.json(allchamps);
    });
  });
  app.get("/data/static-mastery", function(req, res){
    var url = "https://na1.api.riotgames.com/lol/static-data/v3/masteries?masteryListData=all&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
    var allmasteries = [];
    request(url, function(error, response, body){  
      var info = JSON.parse(body);
      const masteries = info.data 
      const version = info.version 
      function masteryObj(id, name, description, ranks, version){
        this.id = id;
        this.name = name;
        this.description = description;
        this.ranks = ranks;
        this.version = version;
      }
      for(var key in masteries){
        let id = masteries[key].id
        let name = masteries[key].name
        let description = masteries[key].description
        let ranks = masteries[key].ranks
        var currentmastery = new masteryObj(id, name, description, ranks, version)
        allmasteries.push(currentmastery);
      }
      res.json(allmasteries)
    })
  });
  app.get("/data/static-rune", function(req, res){
    var url = "https://na1.api.riotgames.com/lol/static-data/v3/runes?runeListData=all&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
    var allrunes = [];
    request(url, function(error, response, body){  
      var info = JSON.parse(body);
      const runes = info.data 
      const version = info.version 
      function runeObj(id, name, description, stats, version){
        this.id = id;
        this.name = name;
        this.description = description;
        this.stats = stats;
        this.version = version;
      }
      for(var key in runes){
        let id = runes[key].id
        let name = runes[key].name
        let description = runes[key].description
        let stats = runes[key].stats
        var currentrune = new runeObj(id, name, description, stats, version)
        allrunes.push(currentrune);
      }
      res.json(allrunes)
    })
  });
  app.get("/data/static-item", function(req, res){
    var url = "https://na1.api.riotgames.com/lol/static-data/v3/items?itemListData=stats&api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3"
    var allitems = [];
    request(url, function(error, response, body){
      var info = JSON.parse(body);
      const items = info.data
      const version = info.version
      function itemObj(id, name, description, stats, plaintext, version){
        this.id = id;
        this.name = name;
        this.description = description;
        this.stats = stats;
        this.plaintext = plaintext;
        this.version = version;
      }
      for(var key in items){
        let id = items[key].id
        let name = items[key].name
        let description = items[key].description
        let stats = items[key].stats
        console.log(stats)
        let plaintext = items[key].plaintext
        var currentitem = new itemObj(id, name, description, stats, plaintext, version)
        allitems.push(currentitem);
      }
      res.json(allitems)
    })
  })



};