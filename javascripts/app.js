requirejs.config({
  baseURL: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min",
    "q": "../lib/bower_components/q/q"
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


	});


});
