var api = 'https://fcc-weather-api.glitch.me//api/current?';
var tempType = 'C';

$( document ).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      getWeather(latitude, longitude);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
});

function getWeather(latitude, longitude) {
  var urlString = api + "lat=" + latitude + "&" + "lon=" +longitude;
  $.ajax({
    url: urlString, success: function (wt) {
      $("#city").text(wt.name + ", ");
      $("#country").text(wt.sys.country);
      var round = Math.round(wt.main.temp);
      console.log(round);
      $("#temp").text(round);
      $("#type").text(" °" + tempType);
      $("#desc").text(wt.weather[0].main);
      descIcons(wt.weather[0].main);
    }
  });
}

$('#change').click(function(){
  var temp = $('#temp').text();
  var unit = tempType;
  if (unit === 'C') {
    $('#temp').text(Math.round(temp * 1.8 + 32));
    tempType = 'F';
    $("#type").text(" °" + tempType);
    log.console("Unit is Celsius");
  }
  else {
    $('#temp').text(Math.round((temp - 32) / 1.8));
    tempType = 'C';
    $("#type").text(" °" + tempType);
    log.console("Unit is Fahrenheit");
  }

});

function descIcons(description){
  var description = description.toLowerCase();
  switch(description){
    case 'clouds':
      $('.wi').addClass('wi-cloudy')
      break;
    case 'drizzle':
      $('.wi').addClass('wi-showers')
      break;
    case 'rain':
      $('.wi').addClass('wi-rain')
      break;
    case 'thunderstorm':
      $('.wi').addClass('wi-thunderstorm')
      break;
    case 'clear':
      $('.wi').addClass('wi-day-sunny')
      break;
    case 'snow':
      $('.wi').addClass('wi-snow')
      break;
  }
}
