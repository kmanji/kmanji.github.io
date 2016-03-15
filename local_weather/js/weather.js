$(document).ready(function() { 
      // need to download meteocons-font to use this
      // function getIcons(icon) {
      //   switch(icon) {
      //     case "01d": return "B";
      //     case "02d": return "H";
      //     case "03d": return "N";
      //     case "04d": return "Y";
      //     case "09d": return "R";
      //     case "10d": return "Q";
      //     case "11d": return "P";
      //     case "13d": return "W";
      //     case "50d": return "M";
      //     case "01n": return "C";
      //     case "02n": return "I";
      //     case "03n": return "5";
      //     case "04n": return "%";
      //     case "09n": return "8";
      //     case "10n": return "Q";
      //     case "11n": return "O";
      //     case "13n": return "V";
      //     case "50n": return "L";
      //     default: return "(";
      //   }
      // }

  function initialize() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition)
    } else {
      window.alert("Sorry, without knowing your location we cannot provide you with the weather.");
      console.log("Sorry, without knowing your location we cannot provide you with the weather.");
    };
  };

  function showPosition(position) {
    if(position.coords.latitude !== undefined && position.coords.longitude !== undefined) {
      getWeather(position.coords.latitude, position.coords.longitude);
    } else {
      window.alert("weather not loading...");
      console.log("weather not loading...");
    }
  }

  function getWeather(lat, lon) {
    var apiWeather = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=c29933b485a632f8347d270de7e1c159";
    //44db6a862fba0b067b1930da0d769e98"; 
    console.log(apiWeather);
    $.getJSON(apiWeather, function(data){
      console.log(data);
      renderPage(data);
    });  
  };

  function renderPage(data) {
    $("#city_loc").html(data.name);
    
    var tempCel = Math.round(data.main.temp - 272.15);
    $("#city_temp").html(tempCel + "&#8451;").attr("temp-type", "cel").attr("temp-load", data.main.temp);
    console.log(data.main.temp);
    $("#city_desc").html(data.weather[0].description);
    console.log(data.weather[0].description);
    // need to download meteocons-font in order to use this and the getIcons function
    // $(".weather_pic").html("<a href='' class='icon' data-icon=" + getIcons(data.weather[0].icon) + "></a>");
    // console.log(data.weather[0].icon);
    // console.log(getIcons(data.weather[0].icon));
    background(tempCel);
  };

  function background(tempCell) {
    if (tempCell <= 0) {
      console.log(tempCell + " less than 0");
      $('body').css('background', "#333 url('http://www.hdwallpapers.in/walls/beautiful_winter_landscapes-normal5.4.jpg') no-repeat fixed center").css("background-size", "cover");
    } else if (tempCell <25) {
      console.log(tempCell + " less than 25");
      $('body').css('background', "#333 url('http://www.hdwallpapers.in/walls/spring_bliss-wide.jpg') no-repeat fixed center").css("background-size", "cover");
    } else {
      console.log(tempCell + " more than 25");
      $('body').css('background', "#333 url('http://www.hdwallpapers.in/walls/summer_sand_dunes-wide.jpg') no-repeat fixed center").css("background-size", "cover");
    };
  }
  initialize();

  $(".change_temp").click(function(){
    var temp = $("#city_temp").attr("temp-load");
    console.log(temp);
    var tempCel = Math.round(temp - 272.15);
    var tempFar = Math.round(tempCel *(9/5)+32);
    var tempCurr = $("#city_temp").attr("temp-type");
    if ( tempCurr === "cel") {
      $("#city_temp").attr("temp-type", "far").html(tempFar + "&#8457;");
      $(this).html("Switch to &#8451;")
    } else {
      $("#city_temp").attr("temp-type", "cel").html(tempCel + "&#8451;");
      $(this).html("Switch to &#8457;")
    }
  });
});