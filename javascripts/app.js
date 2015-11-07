requirejs.config({
  baseURL: "./javascripts",
  paths: {
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "material": "../lib/bower_components/bootstrap-material-design/dist/js/material.min"
  },
  shim: {
    "bootstrap": ["jquery"],
    "material": ["bootstrap"],
    "firebase": {exports: "Firebase"}
  }
});

require(["jquery", "firebase", "hbs", "authenticate", "bootstrap", "material", "validate"],
  function($, firebase, handlebars, authenticate, bootstrap, material, validate) {

	$(document).ready(function(){
  	console.log("hooked up");
	

  	validate.byZipCode('34567');










	});


});