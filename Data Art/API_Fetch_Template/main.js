var covid;
var covidOS;

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};


setInterval(function(){
	//fetch API - API details go here
fetch("https://api.covid19api.com/summary", requestOptions)

//put JSON response into variable
//final variable is to pinpoint the data in the array response - this one is United Kingdom
.then(response => response.json()).then(x => covid = x.Countries[235])
.catch(err => {
	console.log(err);
});


console.log("The global total new confirmed is "+covid.NewConfirmed);
console.log("The global total confirmed is "+covid.TotalConfirmed);
console.log("The global total new deaths is "+covid.NewDeaths);
console.log("The global total new recovered is "+covid.NewRecovered);
console.log("The global total recovered is "+covid.TotalRecovered);
console.log(covid);

//put array value into variable
//covidOS = covid.Global;


//console.log("critical "+covid.critical);
//console.log("deaths "+covid.deaths);

//draw results in page
document.getElementById('NC').innerHTML = "The global total new confirmed is "+covid.NewConfirmed;
document.getElementById('TC').innerHTML = "The global total confirmed is "+covid.TotalConfirmed;
document.getElementById('ND').innerHTML = "The global total new deaths is "+covid.NewDeaths;
document.getElementById('NR').innerHTML = "The global total new recovered is "+covid.NewRecovered;
document.getElementById('TD').innerHTML = "The global total recovered is "+covid.TotalRecovered;

}, 3000); //update API every 3 seconds
