//DOM elements
const searchForm = document.querySelector("#search-form");
const editForm = document.querySelector("#edit-form");

let accordianToggle = document.getElementsByClassName("search__result");
const tooltipIcon = document.querySelector(".tooltip__icon");
const tooltip = document.querySelector(".tooltip");
const closeButton = document.querySelector(".tooltip__close-button");

//delegation
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

if (editForm) {
  editForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const editInput = document.querySelector("#edit-box").value;

    if (editInput === "") {
      return;
    } else {
      editForm.action = `/admin/edit-word/?word=${editInput}`;
      editForm.submit();
    }
  });
}

if (accordianToggle) {
  for (let i = 0; i < accordianToggle.length; i++) {
    accordianToggle[i].addEventListener("click", function () {
      this.classList.toggle("accordian-open");
    });
  }
}

//desktop search tooltip handling
if (tooltipIcon) {
  tooltipIcon.addEventListener("mouseover", function () {
    tooltip.style.visibility = "visible";
  });
  tooltipIcon.addEventListener("mouseout", function () {
    tooltip.style.visibility = "hidden";
  });

  //mobile search tooltip handling
  tooltipIcon.addEventListener("click", function () {
    tooltip.style.visibility = "visible";
  });
}

if (closeButton) {
  //mobile search tooltip handling
  closeButton.addEventListener("click", function () {
    tooltip.style.visibility = "hidden";
  });
}
