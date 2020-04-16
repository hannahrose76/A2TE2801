var covid;
var covidOS;
setInterval(function(){
	//fetch API - API details go here
fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "0255f7e862mshce9c8c06104be3bp1c98dcjsnbad456a48da3"
	}
})

//put JSON response into variable
.then(response => response.json()).then(x => covid = x[0])
.catch(err => {
	console.log(err);
});

//put array value into variable
covidOS = covid.critical;


//console.log("critical "+covid.critical);
//console.log("deaths "+covid.deaths);


}, 3000); //update API every 3 seconds




//call API data from variable
setTimeout(function(){

	console.log(covidOS);

}, 10000);
