const form = document.querySelector("#search-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const searchInput = document.querySelector("#search-box").value;

  if (searchInput.value === "") {
    return;
  } else {
    form.action = `/search/${searchInput}`;
    form.submit();
  }
});
