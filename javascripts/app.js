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

require(["jquery", "firebase", "hbs", "authenticate", "bootstrap", "material", "getWeather"],
  function($, firebase, handlebars, authenticate, bootstrap, material, getWeather) {

$(document).ready(function(){
  console.log("hooked up");
  authenticate.loginUser("mncross@gmail.com", "abc");
  var cityID = getWeather.getCityID("37027");
  console.log("city ID", cityID);
  getWeather.forecast(cityID, 3);
});
});