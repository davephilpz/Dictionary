function sendData(e) {
  const input = document.getElementById("search-box").value;
  // console.log(input);
  document.getElementById("search-predictions").innerHTML = input;
  document.getElementById("search-predictions").style.cssText =
    "padding:0 1rem;border:0.2rem solid var(--color-grey-dark);";
}
