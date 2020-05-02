let isPaused = false; //variables used later on to prevent progression of code
let isPauseddoughnut = false;

let grassfirecount = 0; //declare variables for the various fires to keep track for later use in chart 1
let hazardreductionfirecount = 0;
let burnofffirecount = 0;
let otherfirecount = 0;
let structurefirecount = 0;
let haystackfirecount = 0;
let bushfirecount = 0;
let floodTreeStormfirecount = 0;
let vehicleEquipmentfirecount = 0;
let mvaTransportfirecount = 0;

let undercontrol = 0; //declare variables for various fires to keep track for later use in chart 2
let outofcontrol = 0;

function split_desc(data){ //function used to break down the required data for easier processing
	data = data.split("<br />"); //uncomment line if using the morning-earth url on line 22, comment line below
	//data = data.split("<br>"); //uncomment line if using the rss2json url on line 23, comment line above
	info = data[3]+","+data[4];
	return info
}
//------------------------------------------------------Getting live data-----------------------------
function get_counts(){ //take input from an RSS feed via a json formatting API to allow reading and extraction of data
	url = 'https://morning-earth-19323.herokuapp.com/?feedURL=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml' //url of API including the RSS feed to be parsed (feedURL=<RSS feed URL>)
	//url = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml' //alternate API url, provides less data but is more tested (uncomment this line and comment the above line to use this API)
	isPaused = true; //variable used to prevent the chart from loading before the data has been parsed and filtered
	//console.log("paused " + isPaused);
	fetch(url).then(function(response) { //used to pull the information from the RSS feed using the fetch protocol and passing the data to the variable "text"
		response.text().then(function(text) {
			var data = JSON.parse(text); //parse the text variable to a json object for filtering out data
			data.items.forEach(locations => { //loop through each item under the response.items json locations
				//console.log("location = "+locations.title);
				//console.log(locations.description);
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
				else if(info.search("Flood/Storm/Tree Down")>0){
					floodTreeStormfirecount++;
				}
				else if(info.search("Vehicle/Equipment Fire")>0){
					vehicleEquipmentfirecount++;
				}
				else if(info.search("MVA/Transport")>0){
					mvaTransportfirecount++;
				}
				else if(info.search("Other")>0){ //this must be the last else if statement
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

//-------------------------------------------------Graph 1 Fire Types------------------------------------------------------
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
					labels: ["Grass Fire", 'Hazard Reduction', 'Burn Off', 'Structure Fire', 'Haystack Fire', 'Bush Fire', 'Flood/Storm/Tree Down', 'Vehicle/Equipment Fire', 'MVA/Transport', 'Other'], //set the labels along the bar charts x axis
					datasets: [{
						label: 'Amount of fires by type in New South Wales, Australia', //set the chart title
						data: [grassfirecount, hazardreductionfirecount, burnofffirecount, structurefirecount, haystackfirecount, bushfirecount, floodTreeStormfirecount, vehicleEquipmentfirecount, mvaTransportfirecount, otherfirecount], //add the data
						backgroundColor: [
							'rgba(255, 99, 132)', //set colours of the bars
							'rgba(54, 162, 235)',
							'rgba(255, 206, 86)',
							'rgba(75, 192, 192)',
							'rgba(153, 102, 255)',
							'rgba(255, 159, 64)',
							'rgba(255, 206, 86)',
							'rgba(75, 192, 192)',
							'rgba(54, 162, 235)',
							'rgba(255, 159, 64)'
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
//---------------------------------------------------------Graph 2 Doughnut Fire Status-------------------------------------

function getUnderControlSplitData(data){
	data = data.split("<br />"); //uncomment line if using the morning-earth url on line 22, comment line below
	//data = data.split("<br>"); //uncomment line if using the rss2json url on line 23, comment line above
	info = data[3];
	return info
}

function getUnderControl(){
	url = 'https://morning-earth-19323.herokuapp.com/?feedURL=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml' //url of API including the RSS feed to be parsed (feedURL=<RSS feed URL>)
	//url = 'https://api.rss2json.com/v1/api.json?rss_url=http://www.rfs.nsw.gov.au/feeds/majorIncidents.xml' //alternate API url, provides less data but is more tested (uncomment this line and comment the above line to use this API)
	isPauseddoughnut = true; //variable used to prevent the chart from loading before the data has been parsed and filtered
	//console.log("paused " + isPaused);
	fetch(url).then(function(response) { //used to pull the information from the RSS feed using the fetch protocol and passing the data to the variable "text"
		response.text().then(function(text) {
			var data = JSON.parse(text); //parse the text variable to a json object for filtering out data
			data.items.forEach(locations => {
				let controlled = getUnderControlSplitData(locations.description);
				console.log(controlled);
				if(controlled=="STATUS: Under control "){
					undercontrol++;
				}
				else if(controlled=="STATUS: Out of control "){
					outofcontrol++;
				}
				else{
					console.log("no fire status");
				}
				console.log(undercontrol);
				console.log(outofcontrol);
			});
			isPauseddoughnut = false; //set isPaused variable to false to allow the chart function to continue
			//console.log("not paused " + isPaused);
		});
	});
}

function getUnderControlDoughnutGraph(){ //function used to create the chart and input its data
	getUnderControl(); //calls the get_counts() function to get the data prepared for the chart
	function waitForPause(){ //function to prevent the continuation of code without first completing the get_counts() function
		if (isPauseddoughnut) {
			setTimeout(function(){waitForPause()},100); //loops back to waitForPause() function to continue waiting if the get_counts() function is incomplete
		} else {
			var ctx = document.getElementById('statusChart'); //create an object to interact with the myChart element within the HTML
			var statusChart = new Chart(ctx, { //formatting the chart object
				type: 'doughnut', //set the type of chart
				data: {
					labels: ['Under Control', 'Out of Control'], //Set the labels
					datasets: [{
						label: 'Status of Fires in New South Wales, Australia', //set the chart title
						data: [undercontrol, outofcontrol], //add the data
						backgroundColor: [
							 //set colours of the chart
							'rgba(255, 206, 86, 0.2)',
        					'rgba(75, 192, 192, 0.2)'
						]
					}]
				},
				options: {
					cutoutPercentage: 40,
					responsive: false
				}
			});
		}
	}
	waitForPause();
}
getUnderControlDoughnutGraph(); //initiate the chart function to begin webpage development


//Gauge

var ScalingFactor = function(a) {
  return Math.round(a);
};

var randomData = function () {
  return [
    ScalingFactor(1),
    ScalingFactor(2),
    ScalingFactor(3),
  ];
};

var randomValue = function (data) {
  return Math.max.apply(null, data) * Math.random();
};

var data = randomData();
var value = randomValue(data);

var config = {
  type: 'gauge',
  data: {
    labels: ['Low Risk', 'Medium Risk', 'High Risk'],
    datasets: [{
      data: data,
      value: value,
      backgroundColor: ['#4cd137', '#fbc531', '#e84118'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Risk of Bush fire today based on humidity and current tempurature',
    },
    layout: {
      padding: {
        bottom: 30
      }
    },
    needle: {
      // Needle circle radius as the percentage of the chart area width
      radiusPercentage: 2,
      // Needle width as the percentage of the chart area width
      widthPercentage: 3.2,
      // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
      lengthPercentage: 60,
      // The color of the needle
      color: '#353b48'
    },
    valueLabel: {
      display: false
    },
    plugins: {
      datalabels: {
        display: true,
        formatter:  function (value, context) {
          return context.chart.data.labels[context.dataIndex];
        },
        color: '#f5f6fa',
        backgroundColor: null,
        font: {
          size: 20,
          weight: 'bold',

        }
      }
    }
  }
};

window.onload = function() {
  var ctx = document.getElementById('chart').getContext('2d');
  window.myGauge = new Chart(ctx, config);
};

document.getElementById('randomizeData').addEventListener('click', function() {
  config.data.datasets.forEach(function(dataset) {
    dataset.data = randomData();
    dataset.value = randomValue(dataset.data);
  });

  window.myGauge.update();
});
