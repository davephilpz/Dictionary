// function addParams() {
//   var inputValue = document.getElementById("search-box").value;
//   var currentUrl = window.location.href;
//   var newUrl = currentUrl + "?search=" + inputValue;
//   window.history.pushState({ path: newUrl }, "", newUrl);
//   console.log("param func used");
//   localStorage.setItem("searchString", inputValue);
// }

// function storeParamsInLocalStorage() {
//   var inputValue = document.getElementById("search-box").value;
//   // Make post request to Express.js server
// }

const form = document.querySelector("#search-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("invoked");

  const searchInput = document.querySelector("#search-box").value;
  form.action = `/search/${searchInput}`;

  form.submit();
});
