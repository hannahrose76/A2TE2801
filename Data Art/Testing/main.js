var covid;

setInterval(function(){
fetch("https://covid-19-data.p.rapidapi.com/totals?format=undefined", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "0255f7e862mshce9c8c06104be3bp1c98dcjsnbad456a48da3"
	}
})
.then(response => response.json()).then(x => covid = x[0])
.catch(err => {
	console.log(err);
});
console.log("critical "+covid.critical);
console.log("deaths "+covid.deaths);
}, 3000)
