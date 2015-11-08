requirejs.config({
  baseURL: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "q": "../lib/bower_components/q/q"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "firebase": {exports: "Firebase"}
  }
});

require(["jquery", "firebase", "hbs", "authenticate", "bootstrap", "material", "validate", "weatherView", "getWeather"],
  function($, firebase, handlebars, authenticate, bootstrap, material, validate, weatherView, getWeather) {

	$(document).ready(function(){
		
		authenticate.loginUser('mncross@gmail.com', 'abc');

  	weatherView.retrieveWeatherData()
  	.then(function(userWeather) {
  		console.log('userWeather', userWeather);
  	});

  	$('#zipCodeSearchButton').on('click', function(e) {
  		e.preventDefault();
  		var zipCode = $('#zipCodeSearchInput').val();
  		console.log('ZIP', zipCode);
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			console.log('currentWeather', currentWeather);
  		});
  	});

  	$('#threeDayForecast').on('click', function(e) {
  		e.preventDefault();
  		getWeather.forecast(currentWeather.id, 3)
  		.then(function(forecast) {
  			console.log('3 Day Forecast', forecast);
  		});
  	})


	});


});
