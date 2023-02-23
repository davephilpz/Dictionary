const predictionResults = document.getElementById("live-search");
const searchInput = document.getElementById("search-input");
let selectedIndex = -1;

//listen for input to search database for
if (searchInput) {
  searchInput.addEventListener("input", function (e) {
    let match = e.target.value.match(
      /^[a-zA-Z\u3040-\u30ff\u3400-\u4DBF\u4E00-\u9FFF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF ]*/
    );
    let match2 = e.target.value.match(/\s*/);
    if (match2[0] === e.target.value) {
      predictionResults.innerHTML = "";
      return;
    }
    if (match[0] === e.target.value) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liveSearchQuery: e.target.value }),
      })
        .then((res) => res.json())
        .then((data) => {
          let searchPredictions = data.searchPredictions;
          predictionResults.innerHTML = "";

          if (searchPredictions.length < 1) {
            predictionResults.innerHTML = "<li>No Words Found</li>";
            return;
          }

          searchPredictions.forEach((word, index) => {
            if (index > 0) {
              predictionResults.innerHTML += "<hr>";
            }
            predictionResults.innerHTML += `<li class="search-prediction" id="search-prediction-${index}">${word}</li>`;
          });
        });
      return;
    }

    predictionResults.innerHTML = "";
  });

  //global declaration so is not called multiple times in above event handler
  searchInput.addEventListener("keydown", handleKeyDown);
  predictionResults.addEventListener("click", handleClick);

  //handler for arrow key movement
  function handleKeyDown(e) {
    if (e.key === "ArrowDown") {
      selectedIndex = (selectedIndex + 1) % predictionResults.children.length;
      while (predictionResults.children[selectedIndex].tagName === "HR") {
        selectedIndex = (selectedIndex + 1) % predictionResults.children.length;
      }
      highlightSelectedPrediction();
    } else if (e.key === "ArrowUp") {
      selectedIndex =
        (selectedIndex + predictionResults.children.length - 1) %
        predictionResults.children.length;
      while (predictionResults.children[selectedIndex].tagName === "HR") {
        selectedIndex =
          (selectedIndex + predictionResults.children.length - 1) %
          predictionResults.children.length;
      }
      highlightSelectedPrediction();
    } else if (e.key === "Enter") {
      selectPrediction();
    }
  }

  //handler for enter key
  function handleClick(e) {
    let target = e.target;
    while (target !== predictionResults) {
      if (target.classList.contains("search-prediction")) {
        selectedIndex = Array.from(predictionResults.children).indexOf(target);
        selectPrediction();
        break;
      }
      target = target.parentNode;
    }
  }

  //toggles highlighted word suggestion
  function highlightSelectedPrediction() {
    for (let i = 0; i < predictionResults.children.length; i++) {
      if (i === selectedIndex) {
        predictionResults.children[i].classList.add("selected");
      } else {
        predictionResults.children[i].classList.remove("selected");
      }
    }
  }

  //add clicked or carraige returned word into input field. Carraige return also submits.
  function selectPrediction() {
    if (selectedIndex >= 0) {
      searchInput.value =
        predictionResults.children[selectedIndex].textContent.split(" : ")[0];
      predictionResults.innerHTML = "";
    }
  }
}
