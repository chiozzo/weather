requirejs.config({
  baseURL: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "q": "../lib/bower_components/q/q",
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

    getWeather.currentWeather("37027")
    .then(function(){
      var currentWeather = getWeather.getPrevWeather();
      console.log("currentWeather", currentWeather);
    });

  	$('#zipCodeSearchButton').on('click', function(e) {
  		e.preventDefault();
  		var zipCode = $('#zipCodeSearchInput').val();
  		console.log('ZIP', zipCode);
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			console.log('icon', currentWeather.weather[0].icon);
  			require(['hbs!../templates/currentWeather'], function(currentWeatherHbs) {
  				$('#currentWeatherView').html(currentWeatherHbs(currentWeather));
  			});
  		});
  	});

  	$('#threeDayForecast').on('click', function(e) {
  		e.preventDefault();
  		var zipCode = $('#zipCodeSearchInput').val();
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			getWeather.forecast(currentWeather.id, 3)
  			.then(function(forecast) {
  				for (var i=0; i<forecast.list.length; i++) {
  					forecast.list[i].dt = new Date(forecast.list[i].dt * 1000);
  				}
  				require(['hbs!../templates/forecast'], function(forecastHbs) {
  					$('#forecastView').html(forecastHbs(forecast));
  				});
  			});
  		});


		});


	});

});
