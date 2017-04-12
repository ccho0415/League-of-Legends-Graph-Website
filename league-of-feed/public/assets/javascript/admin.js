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
})