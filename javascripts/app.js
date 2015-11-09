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

require(["jquery", "firebase", "hbs", "authenticate", "bootstrap", "material", "validate", "weatherView", "getWeather", "convertDT"],
  function($, firebase, handlebars, authenticate, bootstrap, material, validate, weatherView, getWeather, convertDT) {

	$(document).ready(function(){

		authenticate.loginUser('mncross@gmail.com', 'abc');

  	$('#zipCodeSearchButton').on('click', function(e) {
  		e.preventDefault();
  		var zipCode = $('#zipCodeSearchInput').val();
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			require(['hbs!../templates/currentWeather'], function(currentWeatherHbs) {
  				$('#currentWeatherView').html(currentWeatherHbs(currentWeather));
  			});
  		});
  	});

  	$('#threeDayForecast').on('click', function(e) {
  		e.preventDefault();
  		$('#currentWeatherView').hide();
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

  	$('#sevenDayForecast').on('click', function(e) {
  		e.preventDefault();
  		$('#currentWeatherView').hide();
  		var zipCode = $('#zipCodeSearchInput').val();
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			getWeather.forecast(currentWeather.id, 7)
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

  	$('#currentWeatherView').on('click', '#saveCurrentWeather', function(e) {
  		e.preventDefault();
  		weatherView.saveWeatherData(getWeather.getPrevWeather());
  	});

		$('#userSavedWeather').on('click', function(e) {
			e.preventDefault();
			$('#currentWeatherView').hide();
			weatherView.retrieveWeatherData()
			.then(function(userWeather) {
				console.log('userWeather', userWeather);
				require(['hbs!../templates/userWeather'], function(userWeatherHbs) {
					$('#userSavedWeatherView').html(userWeatherHbs({weather: userWeather}));
				});
			});
		});



	});

});
