$.get('http://numbersapi.com/random/math?json', function(data) {
    var number = [];

    console.log(data.number);


    //$.each(data.number, function(id, obj){
    //  random.push(number);
    //});

    //console.log(number);

    })


var ScalingFactor = function(a) {
  return Math.round(a);
};

var randomData = function () {
  return [
    ScalingFactor(1),
    ScalingFactor(2),
    ScalingFactor(3),
  ];
}; //Use to mess around with random valuves but now they have been split into 3 sections. More could be added if need be.

var randomValue = function (data) {
  return Math.max.apply(null, data) * Math.random();
}; //Setting a random value to the needle to generate everytime the page loads.

var data = randomData();
var value = randomValue(data);
//var value = number(data);
//Setting up the data. This is where an API can be added.
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
		//title settings
    title: {
      display: true,
      text: 'Risk of Bush fire today based on humidity and current tempurature',
    },//layout settings
    layout: {
      padding: {
        bottom: 30
      }
    },
    needle: {
      // Needle circle radius
      radiusPercentage: 2,
      // Needle width
      widthPercentage: 3.2,
      // Needle length
      lengthPercentage: 60,
      // The color of the needle
      color: '#353b48'
    },
    valueLabel: {//Disables numbers from being displayed
      display: false
    },
    plugins: {
      datalabels: {//Displays the data labels , including editting settings such as the size, font family, etc
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
