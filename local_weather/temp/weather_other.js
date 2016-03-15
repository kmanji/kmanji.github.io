$(document).ready(function() {
  var city = '',
    location = [],
    temp = '',
    tempDisplay = '',
    tempFormat = 1,
    weather;

  function kelvinToC(k) {
    return (Math.round((k - 273.15) * 100)) / 100;
  }

  function kelvinToF(k) {
    return (Math.round((k * 9 / 5 - 459.67) * 100)) / 100;
  }

  function tempUpdate() {
    if (tempFormat === 1) {
      tempDisplay = kelvinToC(weather.main.temp) + String.fromCharCode(176) + "C";
    } else if (tempFormat === 2) {
      tempDisplay = kelvinToF(weather.main.temp) + String.fromCharCode(176) + "F";
    } else {
      tempDisplay = weather.main.temp + String.fromCharCode(176) + "K";
    }
  }

  function displayData() {
    city = weather.name;
    location[0] = weather.coord.lon;
    location[1] = weather.coord.lat;

    tempUpdate();
    $('#temp').text(tempDisplay);
    $('#city').val(city);

    if (location[1] > 0) {
      $('#location-lat').text(location[1] + String.fromCharCode(176) + "N");
    } else if (location[1] < 0) {
      $('#location-lat').text(location[1] * -1 + String.fromCharCode(176) + "S");
    };

    if (location[0] > 0) {
      $('#location-lon').text(location[0] + String.fromCharCode(176) + "E");
    } else if (location[0] < 0) {
      $('#location-lon').text(location[0] * -1 + String.fromCharCode(176) + "W");
    };

    $('#container').fadeIn("slow");
  }

  function getData(val) {
    //get network location from ip api and run the main function
    $.getJSON('http://ip-api.com/json', function(jsonReturn) {
      if (!val) {
        city = jsonReturn.city;
        location[0] = jsonReturn.lat;
        location[1] = jsonReturn.lon;
      } else {
        city = val;
      }
      //get weather by city || location[longtitude, latitude]
      if (city) {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + "&APPID=77af6075728f62ce9167fd10814859bf", function(jsonReturn) {
          weather = jsonReturn;
          displayData();
        });
      } else if (location) {
        $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + location[0] + '&lon=' + location[1] + "&APPID=77af6075728f62ce9167fd10814859bf", function(jsonReturn) {
          weather = jsonReturn;;
          displayData();
        });
      };
    });
  };

  getData();

  $('#city').keyup(function() {
    if (event.which === 13) {
      $('#city').blur();
    }
  });
  $('#city').blur(function() {
    getData($('#city').val());
  });
  $('#temp').click(function() {
    tempFormat++;
    if (tempFormat > 2) {
      tempFormat = 0;
    }
    tempUpdate();
    $(this).text(tempDisplay);
  })
});