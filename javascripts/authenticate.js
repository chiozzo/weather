define(function(require) {
	var $ = require('jquery');
	var Firebase = require('firebase');

	/* end define statement */

	var firebaseRef = new Firebase('https://local-weather-mk.firebaseIO.com');

	return {
		/*
		loginUser uses Firebase native authentication
		 */
		loginUser: function(email, password) {

			var loginForm = {
				email: $('#loginEmail').val(),
				password: $('#loginPassword').val()
			};

			firebaseRef.authWithPassword(loginForm, function(error, authData) {
				if (error) {
					console.log('Login failed!', error);
				}
				else {
					$('#navigation').show();
					$('#panelContainer').hide();
					// console.log('Authenticated succesfully with payload!', authData);
				}

			});
		},
		/*
		registerUser uses Firebase native authentication
		 */
		registerUser: function() {
			var email = $('#regEmail').val();
			firebaseRef.createUser({
  				email    : email,
  				password : $('#regPassword').val()
				}, function(error, userData) {
  				if (error) {
    				console.log("Error creating user:", error);
  			} else {
    			alert(email + " has succesfully registered. Please login with your new email/password.");
  			}
			});
		}
	};
});