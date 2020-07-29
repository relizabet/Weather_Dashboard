$(document).ready(function () {
  const inputField = $("#city_state");
  const searchButton = $(".btn-floating");
  let changeCity = $(".add-city");

  searchButton.click(function (event) {
    event.preventDefault();
    console.log(inputField.val());
    function addCity() {
      $(changeCity).append("<p>Test</p>");
    }
    addCity();
  });
});
