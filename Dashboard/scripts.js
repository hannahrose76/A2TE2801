function get_loclist(){
	var request = new XMLHttpRequest();

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.rss2json.com/v1/api.json?rss_url=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml', true);

	request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		//console.log(data);
		
		data.items.forEach(locations => {
			// Log each location
			console.log("location = "+locations.title);
			get_latlong(locations.title+", NSW");
			split_desc(locations.description);
			console.log("-----------------------------------------------");
		})
	}

	// Send request
	request.send();
}

function split_desc(data){
	data = data.split("<br>");
	console.log(data[3]);
	console.log(data[4]);
}

function get_latlong(loc){
	loc = loc.replace(/ /g,"%20");
	//console.log(loc);
	// Create a request variable and assign a new XMLHttpRequest object to it.
	var request = new XMLHttpRequest();

	// Open a new connection, using the GET request on the URL endpoint
	request.open('GET', 'https://api.opencagedata.com/geocode/v1/json?key=b38f2bd646fd42c59d6b1ab58e3cae0e&q='+loc+'&pretty=1&limit=1', true);

	request.onload = function() {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response);
		//console.log(data);

		data.results.forEach(documentation => {
			//Log each locations latitude and longitude
			console.log("latitude = "+documentation.geometry.lat);
			console.log("longitude = "+documentation.geometry.lng);
		})
	}

	// Send request
	request.send();
}