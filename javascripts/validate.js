define(function(require) {
	var $ = require('jquery');

	return {
// This module exposes a byZipCode method that validates the user input in the zip ID field
		byZipCode: function(zipCode) {

			if (zipCode !== "" && zipCode.length === 5) {
				return zipCode;
			} else {
				alert('Not a valid Zip Code! Please enter a 5-digit Zip Code.');
			}
		}
	};
});