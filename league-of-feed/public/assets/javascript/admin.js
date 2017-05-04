$(document).ready(function () {
	$("#populate").on("click", function(event){
		champstatic(event, updateChampServer)
	});
	function champstatic(event, cb){
		event.preventDefault();
		$.ajax({
			url:"/data/static-champ",
			method: "GET"
		}).done(function(result){
			cb(result)
		})
	}
	function updateChampServer(object){
		$.post("/admin/champion", {data: object}, function(){
			console.log("Adding to the server")
		}).then(function(data){
			console.log(data);
		})
	}
	$("#populateMastery").on("click", function(event){
		masterystatic(event, updateMasteryServer)
	});
	function masterystatic(event, cb){
		event.preventDefault();
		$.ajax({
			url:"/data/static-mastery",
			method: "GET"
		}).done(function(result){
			cb(result)
		})
	}
	function updateMasteryServer(object){
		console.log(object)
		$.post("/admin/mastery", {data: object}, function(){
			console.log("Adding to the server")
		}).then(function(data){
			console.log(data)
		})
	}
	$("#populateRunes").on("click", function(event){
		runestatic(event, updateRuneServer)
	});
	function runestatic(event, cb){
		event.preventDefault();
		$.ajax({
			url:"/data/static-rune",
			method: "GET"
		}).done(function(result){
			cb(result)
		})
	}
	function updateRuneServer(object){
		console.log(object)
		$.post("/admin/rune", {data: object}, function(){
			console.log("Adding to the server")
		}).then(function(data){
			console.log(data)
		})
	}
	$("#populateItems").on("click", function(event){
		itemstatic(event, updateItemServer)
	});
	function itemstatic(event, cb){
		event.preventDefault();
		$.ajax({
			url:"/data/static-item",
			method: "GET"
		}).done(function(result){
			cb(result)
		})
	}
	function updateItemServer(object){
		console.log(object)
		$.post("/admin/item", {data : object}, function(){
				console.log("Adding to the server")
			}).then(function(data){
				console.log(data)
			})
		}

})