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
      $('#forecastView').hide();
      $('#userSavedWeatherView').hide();
  		var zipCode = $('#zipCodeSearchInput').val();
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			require(['hbs!../templates/currentWeather'], function(currentWeatherHbs) {
  				$('#currentWeatherView').html(currentWeatherHbs(currentWeather));
  			});
        $('#currentWeatherView').show();
  		});
  	});

  	$('#threeDayForecast').on('click', function(e) {
  		e.preventDefault();
      $('#userSavedWeatherView').hide();
  		$('#currentWeatherView').hide();
  		var zipCode = $('#zipCodeSearchInput').val();
  		validate.byZipCode(zipCode);
  		getWeather.currentWeather(zipCode)
  		.then(function(currentWeather) {
  			getWeather.forecast(currentWeather.id, 3)
  			.then(function(forecast) {
  				require(['hbs!../templates/forecast'], function(forecastHbs) {
  					$('#forecastView').html(forecastHbs(forecast));
  				});
          $('#forecastView').show();
        });
      });
    });

    $('#sevenDayForecast').on('click', function(e) {
      e.preventDefault();
      $('#userSavedWeatherView').hide();
      $('#currentWeatherView').hide();
      var zipCode = $('#zipCodeSearchInput').val();
      validate.byZipCode(zipCode);
      getWeather.currentWeather(zipCode)
      .then(function(currentWeather) {
        getWeather.forecast(currentWeather.id, 7)
        .then(function(forecast) {
          require(['hbs!../templates/forecast'], function(forecastHbs) {
            $('#forecastView').html(forecastHbs(forecast));
          });
          $('#forecastView').show();
        });
      });
    });

    $('#currentWeatherView').on('click', '#saveCurrentWeather', function(e) {
      e.preventDefault();
      weatherView.saveWeatherData(getWeather.getPrevWeather());
    });

    $('#userSavedWeather').on('click', function(e) {
      e.preventDefault();
      $('#forecastView').hide();
      $('#currentWeatherView').hide();
      weatherView.retrieveWeatherData()
      .then(function(userWeather) {
        require(['hbs!../templates/userWeather'], function(userWeatherHbs) {
          $('#userSavedWeatherView').html(userWeatherHbs({weather: userWeather}));
        });
        $('#userSavedWeatherView').show();
			});
		});
	});
});