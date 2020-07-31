$(document).ready(function () {
  const inputField = $("#city_state");
  const searchButton = $(".btn-floating");
  let changeCity = $(".addCity");
  let nameValue = 0;

  searchButton.click(function (event) {
    event.preventDefault();
    let cityInput = inputField.val();
    function addCity() {
      nameValue = nameValue += 1;
      $(changeCity).append(
        `<button class='col l8 center-align m8 s8 add-city z-depth-1 btn' name=${nameValue}>${cityInput}</button>`
      );
    }

    addCity();
  });
});

{
  /* <p class="col l9 center-align m9 s9 "></p> */
}

// searchButton.click(function (event) {
//   event.preventDefault();
//   let cityInput = inputField.val();
//   function addCity() {
//     $(changeCity).append(cityInput).addClass("add-city");
//   }
//   addCity();
// });

// $(document).ready(function () {
//   const inputField = $("#city_state");
//   const searchButton = $(".btn-floating");
//   let changeCity = $(".add-city");

//   searchButton.click(function (event) {
//     event.preventDefault();
//     console.log(inputField.val());
//     function addCity() {
//       $(changeCity).append("<p>Test</>");
//     }
//     addCity();
//   });
// });
