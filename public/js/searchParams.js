function addParams() {
  var inputValue = document.getElementById("search-box").value;
  var currentUrl = window.location.href;
  var newUrl = currentUrl + "?search=" + inputValue;
  window.history.pushState({ path: newUrl }, "", newUrl);
  console.log("param func used");
}

function storeParamsInLocalStorage() {
  var inputValue = document.getElementById("search-box").value;
  localStorage.setItem("searchString", inputValue);
  // Make post request to Express.js server
}
