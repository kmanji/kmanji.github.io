
var streamers = ["freecodecamp", "beohoff", "brunofin", "comster404", "storbeck", "EtchTheSketch", "SoXvicious", "Dexteritybonus", "patrickrothfuss", "FeliciaDay", "ShaBooZey", "Monstercat", "TotalBiscuit", "Crendor", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas"] // 
var twitchApiCall = "https://api.twitch.tv/kraken/streams/";
var twitchDetails = "https://api.twitch.tv/kraken/channels/";

function initialize(){
	streamers.forEach(function(streamer){
		function apiURL(streamer){
			return twitchApiCall + streamer + "?callback=?";
		};
	// for (var i=0; i<streamers.length; i++) {
	  $.getJSON(apiURL(streamer), function(data){
	  	var status; 
	  	//console.log(data);
	    if (data.stream === null) {
	    	status = "Offline";
	    } else if (data.stream === undefined) {
	    	status = "Account Disabled";
	    } else {
	    	status = "Online";
	    };
	    $.getJSON(twitchDetails+streamer+"?callback=?", function(data1){
	    	
	    	var name = streamer;
	    	var descr = status === "Online" ? data1.status : "";
	    	var url = status === "Online" ? data1.url : "javascript: void(0)";
	    	if (data1.logo != null || undefined) {
	    		var logo = data1.logo;
	    	} else {
	    		var logo = "https://upload.wikimedia.org/wikipedia/commons/5/53/Wikimedia-logo.png";
	    	};
	    	//var logo = data1.logo =! null || "undefined" ? data1.logo : "fa-heart";
	    	console.log(url);
	    	html1 = "<div class='row " + status + "'><a href='" + url +"' target='_blank'><div class='online'>" + status + "</div><div class='logo_name'><div class='logo'><img src='" + logo + "'></div><div class='name'>" + name + "</div><div class='descr'>" + descr + "</div></div></a></div>"; 
			$(".twitch_streamers").append(html1);
			
		});
		
	  });
	// };
	});
};

$(document).ready(function() {
	console.log("hello");
	initialize();
	$(".selector").click(function(){
		var status = $(this).attr("id");
		console.log(status);
		$(".selector").removeClass("lengthen");
		$(".selector").removeClass("shorten");
		$(this).addClass("lengthen");

		$(".row").removeClass("hidden");

		if (status === "all") {
			$("#online_only, #offline_only, #disabled_only").addClass("shorten");
			console.log("status = all");
		} else if (status === "online_only") {
			$("#all, #offline_only, #disabled_only").addClass("shorten");
			console.log("status = online");
			$(".Offline, .Disabled").addClass("hidden");
		} else if (status === "offline_only") {
			$("#all, #online_only, #disabled_only").addClass("shorten");
			console.log("status = offline");
			$(".Online, .Disabled").addClass("hidden");
		} else if (status === "disabled_only") {
			$("#all, #offline_only, #online_only").addClass("shorten");
			console.log("status = disabled");
			$(".Offline, .Online").addClass("hidden");
		};
	});

});