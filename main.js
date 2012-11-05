var script = document.createElement('script');
script.src = "http://api.eventful.com/json/events/search?c=music&app_key=kjjr54dtQ9D2rT76&page_number=1&date=Future&keywords=mumford+and+sons&callback=processJSONP";
document.getElementsByTagName('head')[0].appendChild(script);

function processJSONP(data) {
	var concerts = data.events.event;
	var templateString = document.getElementById('eventful-template').innerHTML;
	var template = Handlebars.compile(templateString);
	var points = new Array();
	var html = "<ol>";
	
	for (latitude in concerts) {
		if (concerts.hasOwnProperty(latitude)){
			points[concerts[latitude].city_name] = [concerts[latitude].latitude, concerts[latitude].longitude];
		};
		var html = html + template(concerts[latitude]);
	};
	html = html + "</ol>"
	document.getElementById('concertinfo').innerHTML = html;

	var myOptions = {
		zoom: 3,
		center: new google.maps.LatLng(36.05178307933835, 42.49737373046878),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};


	var map = new google.maps.Map(document.getElementById("map"), myOptions);

	for (i in points){
		if (points.hasOwnProperty(i)){
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(points[i][0], points[i][1]),
				title: i
			});
			marker.setMap(map);
		}
	};
};

(function() {
	$('#sidebar').html('<img src="ajax-loader.gif" />');
	$.ajax({
		url: 'load_tweets.php',
		type: 'GET',
		success: function(msg) {
			$('#sidebar').html(msg);
		}
	});
})();