$(document).ready(function () {
  const inputField = $("#city_state");
  const searchButton = $(".btn-floating");
  const humidity = $(".hum");
  const uvIndex = $("p.uvi");
  const temperature = $("p.temp");
  const windSpeed = $("p.wind");
  let changeCity = $("div.addCity");
  let nameName = "city";
  let nameValue = 0;
  const apiKey = "&appid=8c016ee0d99e3197955a17c671e0b14c";
  const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
  const urlWeatherUV = "http://api.openweathermap.org/data/2.5/uvi?";
  const unitImperial = "&units=imperial";
  let degree = String.fromCharCode(176);

  // get date
  $("h4.city-name-date").text(moment().format("MMM Do[,] YYYY"));
  let dateIndex = 1;
  while (dateIndex <= 5) {
    $(`div.date-${dateIndex}`).text(
      moment().add(`${dateIndex}`, "days").format("MMM Do[,] YYYY")
    );
    dateIndex++;
  }

  // search button click, add button
  searchButton.click(function (event) {
    event.preventDefault();
    $("p.do-hide").hide();

    let cityInput = inputField.val().trim();
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
      url: `${urlWeatherUV}${apiKey}${lat}${lon}`,
      method: "GET",
    }).then(function (response) {
      let uvIndexVal = `UV Index: ${response.value}`;

      uvIndex.text(uvIndexVal);
    });
  }

  // get today's weather
  function getWeather(cityInput) {
    let cityName = cityInput;

    $.ajax({
      url: `${urlWeather}${cityName}${unitImperial}${apiKey}`,
      method: "GET",
    }).then(function (response) {
      // get temp
      let temperatureValue = `Temperature: ${response.main.temp}${degree} F`;
      let humidityValue = `Humidity: ${response.main.humidity}%`;
      let windSpeedValue = `Wind Speed: ${response.wind.speed} mph`;

      temperature.text(temperatureValue);
      humidity.text(humidityValue);
      windSpeed.text(windSpeedValue);

      let lon = `&lon=${response.coord.lon}`;
      let lat = `&lat=${response.coord.lat}`;

      getUV(lat, lon);
      getWeatherExtended(lat, lon);
    });
  }

  function getWeatherExtended(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?${unitImperial}${lat}${lon}${apiKey}`,
      method: "GET",
    }).then(function (response) {
      let index = 1;
      while (index <= 5) {
        // get weather icons
        $(`img.icon-display${index}`).attr(
          "src",
          `http://openweathermap.org/img/wn/${response.daily[index].weather[0].icon}@2x.png`
        );
        // get temp
        $(`p.temp-${index}`).text(
          `Temp: ${response.daily[index].temp.day}${degree} F`
        );
        // get humidity
        $(`p.hum-${index}`).text(
          `Humidity: ${response.daily[index].humidity}%`
        );
        index++;
      }
    });
  }
});
