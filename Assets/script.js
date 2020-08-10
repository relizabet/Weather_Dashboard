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
    // for the entire length of local storage
    for (storageIndex = 0; storageIndex < localStorage.length; storageIndex++) {
      // create buttons for any localStorage present
      if (window.localStorage.getItem(`city${storageIndex}`) !== null) {
        // hook addCity div
        let dispStorage = $("div.addCity");
        // get respective city id out of local storage
        let localStorageCity = window.localStorage.getItem(
          `city${storageIndex}`
        );
        // add buttons for any items currently in local storage
        $(dispStorage).append(
          `<button class='col blue lighten-1 text-shadow l8 center-align m8 s10 add-city z-depth-1 btn' name=${storageIndex} id='city${storageIndex}'>${localStorageCity}</button>`
        );
        nameValue++;
        // display weather based on most recently searched city
        getWeather(localStorageCity);
      }
    }

    // when search button is clicked
    searchButton.click(function () {
      // determine what input was put into the input field / make it lower case always so === values can be used / trim any empty spaces added
      let cityInput = inputField.val().toLowerCase().trim();

      // for each click the name value will increase
      nameValue = nameValue += 1;
      // give city an id
      let cityID = nameName + nameValue;
      // let getCityID = `button#${cityID}`;

      // store variable to make button for city based on id and name value
      const makeButton = `<button class='col blue lighten-1 text-shadow l8 center-align m8 s10 add-city z-depth-1 btn' name=${nameValue} id=${cityID}>${cityInput}</button>`;

      // create button based on the city input and give it an id based on where it's at in local storage
      addCity(cityInput, cityID, makeButton);
      // get the weather for the city that has been requested
      getWeather(cityInput);
    });
  }
  // if local storage is empty
  else {
    searchButton.click(function () {
      // get the city being put into input field
      let cityInput = inputField.val().toLowerCase().trim();
      console.log(cityInput);
      // for each click the name value will increase
      nameValue = nameValue += 1;
      // give city an id
      let cityID = nameName + nameValue;

      // store variable to make button for city based on id and name value
      const makeButton = `<button class='col blue lighten-1 text-shadow l8 center-align m8 s8 add-city z-depth-1 btn' name=${nameValue} id=${cityID}>${cityInput}</button>`;

      // create button based on the city input and give it an id based on where it's at in local storage
      addCity(cityInput, cityID, makeButton);
      // get the weather for the city that has been requested
      getWeather(cityInput);
    });
  }

  // when any button with an 'add-city' class is pressed
  $(document).on("click", "button.add-city", function (event) {
    // get city from text of button
    let cityInput = $(this).text();
    // get weather for that city
    getWeather(cityInput);
  });

  function addCity(cityInput, cityID, makeButton) {
    // add if to catch empty strings
    $("div.addCity").append(makeButton);
    // set local storage
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
      // display uv index
      uvIndex.text(uvIndexVal);
    });
  }

  // get today's weather
  function getWeather(cityInput) {
    // redefine cityInput
    let cityName = cityInput;

    $.ajax({
      url: `${urlWeather}${cityName}${unitImperial}${apiKey}`,
      method: "GET",
    }).then(function (response) {
      // get temp
      let temperatureValue = `Temperature: ${response.main.temp}${degree} F`;
      // get humidity
      let humidityValue = `Humidity: ${response.main.humidity}%`;
      // get wind speed
      let windSpeedValue = `Wind Speed: ${response.wind.speed} mph`;

      // add text to respective elements
      temperature.text(temperatureValue);
      humidity.text(humidityValue);
      windSpeed.text(windSpeedValue);

      // get lat & lon for getUV function
      let lat = `&lat=${response.coord.lat}`;
      let lon = `&lon=${response.coord.lon}`;

      getUV(lat, lon);
      getWeatherExtended(lat, lon);
    });
  }

  // get extended weather forecast based on lat & lon
  function getWeatherExtended(lat, lon) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/onecall?${unitImperial}${lat}${lon}${apiKey}`,
      method: "GET",
    }).then(function (response) {
      // initialize count up from 1
      let index = 1;
      // execute these things while this statement is true
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
