// Test summoner ID : 20278955
$(document).ready(function(){
	$.ajax({
  		url: "https://na.api.pvp.net/api/lol/na/v1.3/game/by-summoner/20278955/recent?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
  		method: "GET"
	}).done(function(data) {
   		console.log(data);
   		$.each(data, function(){
   			$.each(this, function(){
   				let stat = this.stats
   				$("#assists").append("<button>"+stat.assists+" Assists</button>");
  				$("#kills").append("<button>"+stat.championsKilled+" </button>");   				
  				$("#goldEarned").append("<button>"+stat.goldEarned+" </button>");
  				$("#goldSpent").append("<button>"+stat.goldSpent+" </button>");
  				$("#largestMultiKill").append("<button>"+stat.largestMultiKill+" </button>");
  				$("#level").append("<button>"+stat.level+" </button>");
  				$("#mgDmg").append("<button>"+stat.magicDamageDealtPlayer+" </button>");
  				$("#mgChamp").append("<button>"+stat.magicDamageDealtToChampions+" </button>");
  				$("#mgTaken").append("<button>"+stat.magicDamageTaken+" </button>");
  				$("#minions").append("<button>"+stat.minionsKilled+"</button>");
  				$("#numDeaths").append("<button>"+stat.numDeaths+" </button>");
  				$("#pDmg").append("<button>"+stat.physicalDamageDealtPlayer+" </button>");
  				$("#pChamp").append("<button>"+stat.physicalDamageDealtToChampions+" </button>");
  				$("#pTaken").append("<button>"+stat.physicalDamageTaken+" </button>");
  				$("#totDmg").append("<button>"+stat.totalDamageDealt+" </button>");
  				$("#totDmgBuild").append("<button>"+stat.totalDamageDealtToBuildings+" </button>");
  				$("#totDmgChamp").append("<button>"+stat.totalDamageDealtToChampions+" </button>");
  				$("#totDmgTaken").append("<button>"+stat.totalDamageTaken+" </button>");
  				$("#totHeal").append("<button>"+stat.totalHeal+" </button>");
  				$("#totCC").append("<button>"+stat.totalTimeCrowdControlDealt+" </button>");
  				$("#totUnitsHealed").append("<button>"+stat.totalUnitsHealed+" </button>");
  				$("#truDmg").append("<button>"+stat.trueDamageDealtPlayer+" </button>");
  				$("#truChamp").append("<button>"+stat.trueDamageDealtToChampions+" </button>");
  				$("#truTaken").append("<button>"+stat.trueDamageTaken+" </button>");
  				$("#vWard").append("<button>"+stat.visionWardsBought+" </button>");
  				$("#wardKilled").append("<button>"+stat.wardKilled+" </button>");
  				$("#wardPlaced").append("<button>"+stat.wardPlaced+" </button>");
  				$("#wins").append("<button>"+stat.win+" </button>");
   				$.each(this,function(){
   					// $("#data").append("<p>"+JSON.stringify(this, null, 2)+"</p>");
   				});
   			});
   		});
   		
	});
	$.ajax({
		url: "https://na.api.pvp.net/api/lol/na/v1.2/champion?api_key=RGAPI-499bc6f3-5fba-4bc5-bc5d-552e71c3c5e3",
		method: "GET"
	}).done(function(data){
		console.log(data);
	})
});
