//DOM elements
// const searchForm = document.querySelector("#search-form");
// const adminSearch = document.querySelector("#admin-search");
// const updateWord = document.querySelector("#update-word");
// const updateWordForm = document.querySelector("#update-word-form");
// const deleteWord = document.querySelector("#delete-word");

// let accordianToggle = document.getElementsByClassName("search__result");
// const tooltipIcon = document.querySelector(".tooltip__icon");
// const tooltip = document.querySelector(".tooltip");
// const closeButton = document.querySelector(".tooltip__close-button");

// //delegation
// if (searchForm) {
//   searchForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const searchInput = document.querySelector("#search-box").value;

//     if (searchInput === "") {
//       return;
//     } else {
//       searchForm.action = `/search/${searchInput}`;
//       searchForm.submit();
//     }
//   });
// }
(function () {
  const searchForm = document.querySelector("#search-form");

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
})();

// if (adminSearch) {
//   adminSearch.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const searchInput = document.querySelector("#admin-search-input").value;

//     if (searchInput === "") {
//       return;
//     } else {
//       adminSearch.action = `/admin/edit-word?word=${searchInput}`;
//       adminSearch.submit();
//       console.log(searchInput);
//     }
//   });
// }
(function () {
  const adminSearch = document.querySelector("#admin-search");
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
})();

(function () {
  const updateWord = document.querySelector("#update-word");
  if (updateWord) {
    updateWord.addEventListener("submit", function (event) {
      event.preventDefault();

      const searchInput = document.querySelector("#admin-update-input").value;

      if (searchInput === "") {
        return;
      } else {
        updateWord.action = `/admin/edit-word?word=${searchInput}`;
        updateWord.submit();
        console.log(searchInput);
      }
    });
  }
})();

// if (updateWord) {
//   updateWord.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const searchInput = document.querySelector("#admin-update-input").value;

//     if (searchInput === "") {
//       return;
//     } else {
//       updateWord.action = `/admin/edit-word?word=${searchInput}`;
//       updateWord.submit();
//       console.log(searchInput);
//     }
//   });
// }

// (function () {
// function submitUpdate(event) {
const updateWordForm = document.querySelector("#update-word-form");

if (updateWordForm) {
  updateWordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const updatedWord = document.getElementById("updated-word").value;
    console.log("updated word index js:", updatedWord);

    if (updatedWord === "") {
      return;
    } else {
      updateWordForm.action = `/admin/update-word?word=${updatedWord}`;
      updateWordForm.submit();
      console.log(updatedWord);
    }
  });
}
// }
// })();

// if (updateWordForm) {
//   updateWordForm.addEventListener("submit", function (event) {
//     event.preventDefault();

//     const updatedWord = document.querySelector("#updated-word").value;
//     console.log("updated word:", updatedWord);

//     if (updatedWord === "") {
//       return;
//     } else {
//       updateWordForm.action = `/admin/update-word?word=${updatedWord}`;
//       updateWordForm.submit();
//       console.log(updatedWord);
//     }
//   });
// }

(function () {
  const deleteWord = document.querySelector("#delete-word");
  if (deleteWord) {
    deleteWord.addEventListener("submit", function (event) {
      event.preventDefault();
      console.log("submit button used");
      const wordToDelete = this.getAttribute("data-value");
      console.log(wordToDelete);

      if (wordToDelete === "") {
        return;
      } else {
        editForm.action = `/admin/edit-word/delete/?word=${wordToDelete}`;
        editForm.submit();
      }
    });
  }
})();

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

// if (accordianToggle) {
//   for (let i = 0; i < accordianToggle.length; i++) {
//     accordianToggle[i].addEventListener("click", function () {
//       this.classList.toggle("accordian-open");
//     });
//   }
// }

(function () {
  let accordianToggle = document.getElementsByClassName("search__result");
  if (accordianToggle) {
    for (let i = 0; i < accordianToggle.length; i++) {
      accordianToggle[i].addEventListener("click", function () {
        this.classList.toggle("accordian-open");
      });
    }
  }
})();

(function () {
  const tooltipIcon = document.querySelector(".tooltip__icon");
  const tooltip = document.querySelector(".tooltip");
  const closeButton = document.querySelector(".tooltip__close-button");

  if (tooltipIcon) {
    tooltipIcon.addEventListener("mouseover", function () {
      tooltip.style.visibility = "visible";
    });
    tooltipIcon.addEventListener("mouseout", function () {
      tooltip.style.visibility = "hidden";
    });
    tooltipIcon.addEventListener("click", function () {
      tooltip.style.visibility = "visible";
    });
  }

  if (closeButton) {
    closeButton.addEventListener("click", function () {
      tooltip.style.visibility = "hidden";
    });
  }
})();

// //desktop search tooltip handling
// if (tooltipIcon) {
//   //open on non-touch
//   tooltipIcon.addEventListener("mouseover", function () {
//     tooltip.style.visibility = "visible";
//   });
//   //close on non-touch
//   tooltipIcon.addEventListener("mouseout", function () {
//     tooltip.style.visibility = "hidden";
//   });

//   //mobile search tooltip open
//   tooltipIcon.addEventListener("click", function () {
//     tooltip.style.visibility = "visible";
//   });
// }

// if (closeButton) {
//   //mobile search tooltip close
//   closeButton.addEventListener("click", function () {
//     tooltip.style.visibility = "hidden";
//   });
// }

console.log("indexjs loaded");
