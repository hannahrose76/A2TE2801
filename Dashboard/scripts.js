var isPaused = false; //variable used later on to prevent progression of code: line 43

let grassfirecount = 0; //declare variables for the various fires to keep track for later use in the chart function
let hazardreductionfirecount = 0;
let burnofffirecount = 0;
let otherfirecount = 0;
let structurefirecount = 0;
let haystackfirecount = 0;
let bushfirecount = 0;

function split_desc(data){ //function used to break down the required data for easier processing
	data = data.split("<br>");
	info = data[3]+","+data[4];
	return info
}

function get_counts(){ //take input from an RSS feed via a json formatting API to allow reading and extraction of data
	url = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml' //url of API including the RSS feed to be parsed (rss_url=<RSS feed URL>)
	isPaused = true; //variable used to prevent the chart from loading before the data has been parsed and filtered
	//console.log("paused " + isPaused);
	fetch(url).then(function(response) { //used to pull the information from the RSS feed using the fetch protocol and passing the data to the variable "text"
		response.text().then(function(text) {
			var data = JSON.parse(text); //parse the text variable to a json object for filtering out data
			data.items.forEach(locations => { //loop through each item under the response.items json locations
				//console.log("location = "+locations.title);
				info = split_desc(locations.description); //function used to pull specific required data from the json object (stored under response.items.description)
				//console.log(info);
				if(info.search("Grass Fire")>0){ //if statements used to increment counters for each type of fire based on the value of info
					grassfirecount++;
				}
				else if(info.search("Hazard Reduction")>0){
					hazardreductionfirecount++;
				}
				else if(info.search("Burn Off")>0){
					burnofffirecount++;
				}
				else if(info.search("Structure Fire")>0){
					structurefirecount++;
				}
				else if(info.search("Haystack Fire")>0){
					haystackfirecount++;
				}
				else if(info.search("Bush Fire")>0){
					bushfirecount++;
				}
				else if(info.search("Other")>0){
					otherfirecount++;
				}
				else{ //else statement used to log if any new types of fire are found within the RSS feed
					console.log("Unlisted fire type found: " + ((info.split(","))[1].split(": "))[1]);
				}
				//console.log("grass fires: " + grassfirecount);
				//console.log("hazard reduction fires: " + hazardreductionfirecount);
				//console.log("-----------------------------------------------");
				
			})
			isPaused = false; //set isPaused variable to false to allow the chart function to continue
			//console.log("not paused " + isPaused);
		});
	});
}

function chart(){ //function used to create the chart and input its data
	get_counts(); //calls the get_counts() function to get the data prepared for the chart
	function waitForPause(){ //function to prevent the continuation of code without first completing the get_counts() function
		if (isPaused) {
			setTimeout(function(){waitForPause()},100); //loops back to waitForPause() function to continue waiting if the get_counts() function is incomplete
		} else {
			var ctx = document.getElementById('myChart'); //create an object to interact with the myChart element within the HTML
			var myChart = new Chart(ctx, { //formatting the chart object
				type: 'bar', //set the type to a bar chart
				data: {
					labels: ["Grass Fire", 'Hazard Reduction', 'Burn Off', 'Structure Fire', 'Haystack Fire', 'Bush Fire', 'Other'], //set the labels along the bar charts x axis
					datasets: [{
						label: 'Amount of fires by type in New South Wales, Australia', //set the chart title
						data: [grassfirecount, hazardreductionfirecount, burnofffirecount, structurefirecount, haystackfirecount, bushfirecount, otherfirecount], //add the data to the bar chart
						backgroundColor: [
							'rgba(255, 99, 132)', //set colours of the bars
							'rgba(54, 162, 235)',
							'rgba(255, 206, 86)',
							'rgba(75, 192, 192)',
							'rgba(153, 102, 255)',
							'rgba(255, 159, 64)',
							'rgba(255, 206, 86)'
						]
					}]
				},
				options: {
					legend: {
						labels: {
							boxWidth: 0, //remove the box next to the legend
							fontColor: "white" //set the font colour of the title to white for better visibility
						}
					},
					scales: {
						yAxes: [{
							ticks: {
								fontColor: "white", //set the font colour of the y axis labels to white for better visibility
								beginAtZero: true //set the y axis to start at zero
							}
						}],
						xAxes: [{
							ticks: {
								fontColor: "white" //set the font colour of the x axis labels to white for better visibility
							}
						}]
					}
				}
			});
		};
	}
	waitForPause(); //call the waitForPause function above to initiate the chart production
}
chart(); //initiate the chart function to begin webpage development