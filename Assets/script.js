$(document).ready(function () {
  const inputField = $("#city_state");
  const searchButton = $(".btn-floating");
  let changeCity = $(".addCity");
  let nameName = "city";
  let nameValue = 0;

  searchButton.click(function (event) {
    event.preventDefault();
    let cityInput = inputField.val();
    nameValue = nameValue += 1;
    let nameAll = nameName + nameValue;
    let getNameAll = `button#${nameAll}`;

    function addCity() {
      $(changeCity).append(
        `<button class='col l8 center-align m8 s8 add-city z-depth-1 btn' name=${nameValue}>${cityInput}</button>`
      );
      window.localStorage.setItem(nameAll, cityInput);
      $(getNameAll).val(window.localStorage.getItem(cityInput));
    }

    addCity();
  });

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
