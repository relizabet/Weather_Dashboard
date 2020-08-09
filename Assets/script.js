$(document).ready(function () {
  // get input field
  const inputField = $("#city_state");
  // get search button
  const searchButton = $(".btn-floating");
  // get weather paragraphs
  const humidity = $("p.hum");
  const uvIndex = $("p.uvi");
  const temperature = $("p.temp");
  const windSpeed = $("p.wind");
  let changeCity = $("div.addCity");
  // establish id values
  let nameName = "city";
  let nameValue = 0;
  // api key and urls
  const apiKey = "&appid=8c016ee0d99e3197955a17c671e0b14c";
  const urlWeather = "https://api.openweathermap.org/data/2.5/weather?q=";
  const urlWeatherUV = "http://api.openweathermap.org/data/2.5/uvi?";
  const unitImperial = "&units=imperial";
  // get degree symbol
  let degree = String.fromCharCode(176);

  // get date for current day
  $("h4.city-name-date").text(moment().format("MMM Do[,] YYYY"));
  // get days for future forecast
  let dateIndex = 1;
  while (dateIndex <= 5) {
    $(`div.date-${dateIndex}`).text(
      moment().add(`${dateIndex}`, "days").format("MMM Do[,] YYYY")
    );
    dateIndex++;
  }

  // if local storage is not empty
  if (localStorage.length !== 0) {
    for (indexStorage = 0; indexStorage < localStorage.length; indexStorage++) {
      // create buttons for any localStorage present
      if (window.localStorage.getItem(`city${indexStorage}`) !== null) {
        let dispStorage = $("div.addCity");
        let localStorageCity = window.localStorage.getItem(
          `city${indexStorage}`
        );
        getWeather(localStorageCity);
        // console.log(localStorageCity);
        $(dispStorage).append(
          `<button class='col blue lighten-1 text-shadow l8 center-align m8 s10 add-city z-depth-1 btn' name=${indexStorage} id='city${indexStorage}'>${localStorageCity}</button>`
        );
        nameValue++;
      }
    }

    searchButton.click(function (event) {
      // prevent page refresh
      event.preventDefault();
      let cityInput = inputField.val().toLowerCase().trim();

      // get the city being put into input field
      // for each click the name value will increase
      nameValue = nameValue += 1;
      // give city an id
      let cityID = nameName + nameValue;
      // let getCityID = `button#${cityID}`;

      // store variable to make button for city based on id and name value
      const makeButton = `<button class='col blue lighten-1 text-shadow l8 center-align m8 s10 add-city z-depth-1 btn' name=${nameValue} id=${cityID}>${cityInput}</button>`;

      addCity(cityInput, cityID, makeButton);
      getWeather(cityInput);
    });
  }
  // if local storage is empty
  else {
    searchButton.click(function (event) {
      // prevent page refresh
      event.preventDefault();

      // get the city being put into input field
      let cityInput = inputField.val().toLowerCase().trim();
      console.log(cityInput);
      // for each click the name value will increase
      nameValue = nameValue += 1;
      // give city an id
      let cityID = nameName + nameValue;

      // store variable to make button for city based on id and name value
      const makeButton = `<button class='col blue lighten-1 text-shadow l8 center-align m8 s8 add-city z-depth-1 btn' name=${nameValue} id=${cityID}>${cityInput}</button>`;

      addCity(cityInput, cityID, makeButton);
      getWeather(cityInput);
    });
  }

  $(document).on("click", "button.add-city", function (event) {
    event.preventDefault();

    let cityInput = $(this).text();

    getWeather(cityInput);
  });

  function addCity(cityInput, cityID, makeButton) {
    // add if to catch empty strings
    $(changeCity).append(makeButton);
    window.localStorage.setItem(cityID, cityInput);
    window.localStorage.setItem(cityInput, cityID);
  }

  // get today's UV index
  function getUV(lat, lon) {
    $.ajax({
      url: `${urlWeatherUV}${apiKey}${lat}${lon}`,
      method: "GET",
    }).then(function (response) {
      let uvIndexVal = `UV Index: ${response.value}`;

      uvIndex.text(uvIndexVal);
      // let uvString = JSON.stringify(response.value);

      // if (uvString <= 2) {
      //   $("p.uvi").addClass("uviGreen");
      // } else if (uvString >= 3 || uvString <= 5) {
      //   $("p.uvi").addClass("uviYellow");
      // } else if (uvString >= 6 || uvString <= 7) {
      //   $("p.uvi").addClass("uviOrange");
      // } else if (uvString >= 8 || uvString <= 10) {
      //   $("p.uvi").addClass("uviRed");
      // } else if (uvString <= 11) {
      //   $("p.uvi").addClass("uviViolet");
      // }
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
        // get uvi
        $(`p.uvi-${index}`).text(`UV Index: ${response.daily[index].uvi}`);
        index++;
      }
    });
  }
});
