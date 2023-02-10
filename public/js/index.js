//DOM elements
const searchForm = document.querySelector("#search-form");
const adminSearch = document.querySelector("#admin-search");
const getUpdateForm = document.querySelector("#get-update-form");
const submitUpdateForm = document.querySelector("#submit-update-form");
const getDeleteConfirmation = document.querySelector(
  "#get-delete-confirmation"
);
const submitDeleteConfirmation = document.querySelector(
  "#submit-delete-confirmation"
);

let accordianToggle = document.getElementsByClassName("search__result");
const tooltipIcon = document.querySelector(".tooltip__icon");
const tooltip = document.querySelector(".tooltip");
const closeButton = document.querySelector(".tooltip__close-button");

// //delegation
if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.querySelector("#search-box").value;

    if (searchInput === "") {
      return;
    } else {
      searchForm.action = `/search/${searchInput}`;
      searchForm.submit();
    }
  });
}

if (adminSearch) {
  adminSearch.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.querySelector("#admin-search-input").value;

    if (searchInput === "") {
      return;
    } else {
      adminSearch.action = `/admin/edit-word?word=${searchInput}`;
      adminSearch.submit();
      console.log(searchInput);
    }
  });
}

if (getUpdateForm) {
  getUpdateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("updatedwordform ran");

    const input = document.querySelector("#get-update-input").value;
    console.log(input);

    if (input === "") {
      return;
    } else {
      getUpdateForm.action = `/admin/update-word?word=${input}`;
      getUpdateForm.submit();
      console.log(getUpdateForm.action);
    }
  });
}

if (submitUpdateForm) {
  submitUpdateForm.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit update form ran");

    const input = submitUpdateWord;
    console.log("submit update input value:", input);

    if (input === "") {
      return;
    } else {
      submitUpdateForm.action = `/admin/update-word?word=${input}`;
      submitUpdateForm.submit();
      console.log(submitUpdateForm.action);
    }
  });
}

if (getDeleteConfirmation) {
  getDeleteConfirmation.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit update form ran");

    const input = document.querySelector("#get-delete-input").value;
    console.log("submit update input value:", input);

    if (input === "") {
      return;
    } else {
      getDeleteConfirmation.action = `/admin/delete-word?word=${input}`;
      getDeleteConfirmation.submit();
      console.log(getDeleteConfirmation.action);
    }
  });
}

if (submitDeleteConfirmation) {
  submitDeleteConfirmation.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("submit update form ran");

    const input = submitDeleteWord;
    console.log("submit update input value:", input);

    if (input === "") {
      return;
    } else {
      submitDeleteConfirmation.action = `/admin/delete-word?word=${input}`;
      submitDeleteConfirmation.submit();
      console.log(submitDeleteConfirmation.action);
    }
  });
}

//open and close accordians above variable gets all elements by class name and this loops through to make all selectable. Not set to be mutually exclusive.
if (accordianToggle) {
  for (let i = 0; i < accordianToggle.length; i++) {
    accordianToggle[i].addEventListener("click", function () {
      this.classList.toggle("accordian-open");
    });
  }
}

//Desktop search tooltip handling. Only available on main search since admin does not need.
if (tooltipIcon) {
  //open on non-touch
  tooltipIcon.addEventListener("mouseover", function () {
    tooltip.style.visibility = "visible";
  });
  //close on non-touch
  tooltipIcon.addEventListener("mouseout", function () {
    tooltip.style.visibility = "hidden";
  });

  //mobile search tooltip open
  tooltipIcon.addEventListener("click", function () {
    tooltip.style.visibility = "visible";
  });
}

if (closeButton) {
  //mobile search tooltip close
  closeButton.addEventListener("click", function () {
    tooltip.style.visibility = "hidden";
  });
}

console.log("indexjs loaded");
