define(function(require) {
	var $ = require('jquery');
	var Firebase = require('firebase');
	var q = require('q');
	var convertDT = require('convertDT');

/* end define statement */

	var firebaseRef = new Firebase('https://local-weather-mk.firebaseio.com/');

	return {
	//This method saves forecast in present view to user's profile in Firebase
		saveWeatherData: function(prevCurrentWeather) {

			console.log('prevCurrentWeather', prevCurrentWeather);

			var savedCurrentWeather = {
				cityName: prevCurrentWeather.name,
				date: convertDT.convertUnixTime(prevCurrentWeather.dt),
				temperature: prevCurrentWeather.main.temp,
				conditions: prevCurrentWeather.weather[0].description,
				weatherIcon: prevCurrentWeather.weather[0].icon,
				airPressure: prevCurrentWeather.main.pressure,
				windSpeed: prevCurrentWeather.wind.speed
			};

			console.log('savedCurrentWeather', savedCurrentWeather);
			console.log('firebaseRef.getAuth().uid', firebaseRef.getAuth().uid);

			firebaseRef.child('users').child(firebaseRef.getAuth().uid).child(prevCurrentWeather.dt).set(savedCurrentWeather);

		},

		retrieveWeatherData: function() {
			// console.log('https://local-weather-mk.firebaseio.com/users/' + firebaseRef.getAuth().uid + '/.json');

			var deferred = q.defer();

			$.ajax('https://local-weather-mk.firebaseio.com/users/' + firebaseRef.getAuth().uid + '/.json')
			.done(function(userWeather) {
					deferred.resolve(userWeather);
			}).fail(function(error) {
					deferred.reject();
					console.log('error', error);
			});


			return deferred.promise;
		}

	};

});