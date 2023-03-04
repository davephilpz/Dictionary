//DOM elements
//public
const searchForm = document.querySelector("#search-form");
const paginationForm = document.querySelector("#pagination-form");
//private
const getReviewWordForm = document.querySelector("#get-review-word");
const postReviewWordForm = document.querySelector("#post-review-word");
const postReviewMoreDetails = document.querySelector(
  "#post-review-more-details-form"
);
//admin
const adminSearch = document.querySelector("#admin-search-form");
const submitAddForm = document.querySelector("#submit-add-form");
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

//public handlers
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

if (paginationForm) {
  //query selector declarations
  const pageButtons = paginationForm.querySelectorAll(".page-button");
  const resultNumberFilter = paginationForm.querySelector(
    "#result-number-filter"
  );
  const partOfSpeechFilter = paginationForm.querySelector(
    "#part-of-speech-filter"
  );

  const word = paginationForm.dataset.word;

  //page navigation
  pageButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      const page = button.dataset.page;
      const limit = resultNumberFilter.value;
      const filter = partOfSpeechFilter.value;

      //plug variables into URL query
      paginationForm.action = `/search/${word}?page=${page}&limit=${limit}${
        filter ? `&filter=${filter}` : ""
      }`;

      //POST to server
      paginationForm.method = "POST";
      paginationForm.submit();
    });
  });

  //limit number of search results
  resultNumberFilter.addEventListener("change", () => {
    const limit = resultNumberFilter.value;
    const filter = partOfSpeechFilter.value;

    //plug variables into URL query
    paginationForm.action = `/search/${word}?&page=1&limit=${limit}${
      filter ? `&filter=${filter}` : ""
    }`;

    //POST to server
    paginationForm.submit();
  });

  //filter for particular part of speech
  partOfSpeechFilter.addEventListener("change", () => {
    const limit = resultNumberFilter.value;
    const filter = partOfSpeechFilter.value;

    //plug variables into URL query
    paginationForm.action = `/search/${word}?&page=1&limit=${limit}${
      filter ? `&filter=${filter}` : ""
    }`;

    //POST to server
    paginationForm.submit();
  });
}

//private handlers
if (getReviewWordForm) {
  getReviewWordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const buttonClicked = event.target.activeElement;

    if (buttonClicked.id === "new-review-word") {
      getReviewWordForm.action = "/review";
    } else if (buttonClicked.id === "current-review-word") {
      getReviewWordForm.action = "/review";
    }
    getReviewWordForm.submit();
  });
}

if (postReviewWordForm) {
  postReviewWordForm.addEventListener("click", function (event) {
    event.preventDefault();
    const buttonClicked = event.target;
    if (!buttonClicked.matches(".review__card--button")) {
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get("type");

    const level = buttonClicked.id;
    console.log("level:", level);
    const word = postReviewWordForm.dataset.word;

    postReviewWordForm.action = `/review?type=${type}&level=${level}&word=${word}`;
    postReviewWordForm.method = "POST"; // Add this line to set method to POST
    postReviewWordForm.submit();
  });
}

if (postReviewMoreDetails) {
  postReviewMoreDetails.addEventListener("submit", function (event) {
    event.preventDefault();

    const word = document.getElementById("post-review-more-details").value;
    console.log("word:", word);

    if (word === "") {
      return;
    } else {
      postReviewMoreDetails.action = `/search/${word}`;
      postReviewMoreDetails.target = "_blank";
      postReviewMoreDetails.submit();

      console.log("more details:", postReviewMoreDetails.action);
    }
  });
}

//admin handlers
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

if (submitAddForm) {
  submitAddForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = document.activeElement;
    if (submitButton.value !== "Add Word") {
      console.log("denied submittal of non-button-field");
      return;
    }

    submitAddForm.submit();
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

    // Check if the clicked button value is "Update Word"
    const submitButton = document.activeElement;
    if (submitButton.value !== "Update Word") {
      console.log("denied submittal of non-button-field");
      return;
    }

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

// if (submitUpdateForm) {
//   submitUpdateForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("submit update form ran");

//     //get query from url
//     const urlParams = new URLSearchParams(window.location.search);
//     const input = urlParams.get("word");
//     console.log("submit update input value:", input);

//     if (input === "") {
//       return;
//     } else {
//       //set url the same as the original word to find before patching
//       submitUpdateForm.action = `/admin/update-word?word=${input}`;
//       submitUpdateForm.submit();
//       console.log(submitUpdateForm.action);
//     }
//   });
// }

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
