define(function(require) {
	var q = require('q');
	var convertDT = require('convertDT');

// base API url
var openweathermap = "http://api.openweathermap.org/data/2.5/";
// API key
var appid = "38bbec9b30b2833d4a08f8255a75ab9f";
var prevCurrentWeather = null;

	return {
		/*
		currentWeather submits API call based on given zipCode and returns object of current weather
		 */
		currentWeather: function(zipCode) {
			var deferred = q.defer();
			$.ajax({
				url: openweathermap + "weather?zip=" + zipCode + "&units=imperial&appid=" + appid
			})
			.done(function(currentWeather) {
				prevCurrentWeather = currentWeather;
				deferred.resolve(currentWeather);
			}).fail(function(error){
				console.log("error", error);
			});
			return deferred.promise;
		},
		/*
		getCityID submits API call based on zipCode and returns unique ID of city
		 */
		getPrevWeather: function() {
				return prevCurrentWeather;
		},
		/*
		forecast submits API call based on cityID and number of forecast days requested
		 */
		forecast: function(cityID, days) {
			var deferred = q.defer();
			$.ajax({
				url: openweathermap + "forecast/daily?id=" + cityID + "&cnt=" + days + "&units=imperial&appid=" + appid
			})
			.done(function(forecast){
				forecast.list.forEach(function(currentValue, index, array){
					currentValue.day = convertDT.convertUnixTime(currentValue.dt);
				});
				deferred.resolve(forecast);
			});
			return deferred.promise;
		}
	};
});