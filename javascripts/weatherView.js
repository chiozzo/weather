define(function(require) {
	var $ = require('jquery');
	var Firebase = require('firebase');

/* end define statement */

	var firebaseRef = new Firebase('https://local-weather-mk.firebaseio.com/');
	
	return {
	//This method saves forecast in present view to user's profile in Firebase
		saveWeatherData: function() {

			firebaseRef.set({key: 'value'});

		}

	};


});