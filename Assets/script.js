$(document).ready(function () {
  const inputField = $("#city_state");
  const searchButton = $(".btn-floating");
  const humidity = $(".hum");
  const uvIndex = $("p.uvi");
  const temperature = $("p.temp");
  const windSpeed = $("p.wind");
  const CityNameDate = $("h4.city-name-date");
  let changeCity = $("div.addCity");
  let nameName = "city";
  let nameValue = 0;
  const apiKey = "&appid=8c016ee0d99e3197955a17c671e0b14c";
  const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
  const urlWeatherUV = "http://api.openweathermap.org/data/2.5/uvi?";
  const unitImperial = "&units=imperial";

  // search button click, add button
  searchButton.click(function (event) {
    event.preventDefault();
    // $("p.temp")[0].val("");
    let clearOut = $("p.temp");
    console.log(clearOut.val());
    $("p.hum").val("");
    $("p.wind").val("");
    $("p.uvi").val("");
    $("p.do-hide").hide();

    let cityInput = inputField.val().trim();
    console.log(cityInput);
    nameValue = nameValue += 1;
    let nameAll = nameName + nameValue;
    let getNameAll = `button#${nameAll}`;

    function addCity() {
      // add if to catch empty strings
      $(changeCity).append(
        // use $(document).click() to get created buttons
        `<button class='col l8 center-align m8 s8 add-city z-depth-1 btn' name=${nameValue}>${cityInput}</button>`
      );
      window.localStorage.setItem(nameAll, cityInput);
      $(getNameAll).val(window.localStorage.getItem(cityInput));
    }

    addCity();
    getWeather(cityInput);
  });

  // get today's UV index
  function getUV(lat, lon) {
    $.ajax({
      url: `${urlWeatherUV}${apiKey}&lat=${lat}&lon=${lon}`,
      method: "GET",
    }).then(function (response) {
      let uvIndexVal = `UV Index: ${response.value}`;
      console.log(response);

      uvIndex.append(uvIndexVal);
    });
  }

  // get today's weather
  function getWeather(cityInput) {
    // change this
    console.log(cityInput);
    let cityName = cityInput;
    console.log(CityNameDate[0].innerHTML);

    $.ajax({
      url: `${urlWeather}${cityName}${unitImperial}${apiKey}`,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      // get temp
      console.log(response);
      let temperatureValue = `Temperature: ${response.main.temp}`;
      let humidityValue = `Humidity: ${response.main.humidity}`;
      let windSpeedValue = `Wind Speed: ${response.wind.speed}`;

      temperature.append(temperatureValue);
      humidity.append(humidityValue);
      windSpeed.append(windSpeedValue);

      let lon = response.coord.lon;
      let lat = response.coord.lat;

      getUV(lat, lon);
    });
  }

  // getWeather();

  // searchButton.click(function (event) {
  //   event.preventDefault();
  //   let cityInput = inputField.val();
  //   function addCity() {
  //     nameValue = nameValue += 1;
  //     let nameAll = nameName + nameValue;
  //     let getNameAll = `div#${nameAll}`;
  //     console.log(nameAll);

  //     $(changeCity).attr("name", nameAll);
  //     window.localStorage.setItem(nameAll, cityInput);
  //     $(getNameAll).val(window.localStorage.getItem(nameAll));
  //     console.log($(getNameAll).val(window.localStorage.getItem(nameAll)));
  //     console.log(localStorage);
  //   }

  //   addCity();
  // });
});

// address:
// [] text overflow on search buttons
