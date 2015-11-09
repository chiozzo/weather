requirejs.config({
  baseURL: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "q": "../lib/bower_components/q/q",
    "bootstrap-material-design": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "scotch-panels": "../lib/bower_components/scotch-panels/dist/scotchPanels.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "scotch-panels": ["jquery"],
    "firebase": {exports: "Firebase"}
  }
});

require(["jquery", "firebase", "hbs", "authenticate", "bootstrap", "material", "scotch-panels", "validate", "weatherView", "getWeather", "convertDT"],
  function($, firebase, handlebars, authenticate, bootstrap, material, scotchPanels, validate, weatherView, getWeather, convertDT) {

	$.material.init();

	var panelContainer = $('#registerForm').scotchPanel({
    containerSelector: '#panelContainer', // Make this appear on the entire screen
    direction: 'left', // Make it toggle in from the left
    duration: 900, // Speed in ms how fast you want it to be
    transition: 'ease', // CSS3 transition type: linear, ease, ease-in, ease-out, ease-in-out, cubic-bezier(P1x,P1y,P2x,P2y)
    // clickSelector: '.toggle-panel', // Enables toggling when clicking elements of this class
    distanceX: '100%', // Size for the toggle
    enableEscapeKey: true // Clicking Esc will close the panel
	});

  $('#currentWeatherView').hide();

  $(document).ready(function(){

    // panelContainer.open();
    // panelContainer.close();

    $(document).on('click', '#registerFormButton', function() {
      $('#registerForm').show();
      panelContainer.open();
    });

    // authenticate.loginUser('mncross@gmail.com', 'abc');

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
