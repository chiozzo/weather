define(function(require) {

return {
	/*
	currentWeather submits API call based on given zipCode and returns object of current weather
	 */
	currentWeather: function(zipCode) {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=38bbec9b30b2833d4a08f8255a75ab9f"
		})
		.done(function(currentWeather) {
			console.log("currentWeather", currentWeather);
			return currentWeather;
		});
	},
	/*
	getCityID submits API call based on zipCode and returns unique ID of city
	 */
	getCityID: function(zipCode) {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/weather?zip=" + zipCode + "&units=imperial&appid=38bbec9b30b2833d4a08f8255a75ab9f"
		})
		.done(function(currentWeather){
			console.log("cityID", currentWeather.id);
			return currentWeather.id;
		});
	},
	/*
	forecast submits API call based on cityID and number of forecast days requested
	 */
	forecast: function(cityID, days) {
		$.ajax({
			url: "http://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityID + "&cnt=" + days
		})
		.done(function(forecast){
			console.log("forecast", forecast);
			return forecast;
		});
	}
}
});