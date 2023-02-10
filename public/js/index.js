//DOM elements
const searchForm = document.querySelector("#search-form");
const adminSearch = document.querySelector("#admin-search");
const getUpdateForm = document.querySelector("#get-update-form");
const submitUpdateForm = document.querySelector("#submit-update-form");
// const deleteWord = document.querySelector("#delete-word");

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

// if (deleteWord) {
//   deleteWord.addEventListener("submit", function (event) {
//     event.preventDefault();
//     console.log("submit button used");
//     const wordToDelete = this.getAttribute("data-value");
//     console.log(wordToDelete);

//     // const editInput = document.querySelector("#edit-box").value;

//     if (wordToDelete === "") {
//       return;
//     } else {
//       editForm.action = `/admin/edit-word/delete/?word=${wordToDelete}`;
//       editForm.submit();
//     }
//   });
// }

if (accordianToggle) {
  for (let i = 0; i < accordianToggle.length; i++) {
    accordianToggle[i].addEventListener("click", function () {
      this.classList.toggle("accordian-open");
    });
  }
}

//desktop search tooltip handling
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
