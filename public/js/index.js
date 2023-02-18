//DOM elements
// const Error404Btn = document.querySelector("#redirect-404");
const searchForm = document.querySelector("#search-form");
const adminSearch = document.querySelector("#admin-search-form");
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

//delegation
//404 rerouting to previous page
document.addEventListener("DOMContentLoaded", function () {
  const Error404Btn = document.querySelector("#redirect-404");
  if (Error404Btn) {
    Error404Btn.addEventListener("click", (event) => {
      event.preventDefault();

      window.history.back();
    });
  }
});

if (searchForm) {
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.querySelector("#search-input").value;

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
    console.log("admin search input:", searchInput);

    if (searchInput === "") {
      return;
    } else {
      adminSearch.action = `/admin/edit-word?word=${searchInput}`;
      adminSearch.submit();
      console.log("admin search input final:", searchInput);
      console.log("admin search action:", adminSearch.action);
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

    //get query from url
    const urlParams = new URLSearchParams(window.location.search);
    const input = urlParams.get("word");
    console.log("submit update input value:", input);

    if (input === "") {
      return;
    } else {
      //set url the same as the original word to find before patching
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

    //get query from url
    const urlParams = new URLSearchParams(window.location.search);
    const input = urlParams.get("word");
    console.log("submit delete input value:", input);

    if (input === "") {
      return;
    } else {
      //set url the same as the original word to find before deleting
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
