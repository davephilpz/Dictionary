// function sendData(e) {
//   const input = document.getElementById("search-box").value;
//   // console.log(input);
//   document.getElementById("search-predictions").innerHTML = input;
//   document.getElementById("search-predictions").style.cssText =
//     "padding:0 1rem;border:0.2rem solid var(--color-grey-dark);";
// }

// function sendData(e) {
//   const predictionResults = document.getElementById("live-search");
//   let match = e.value.match(/^[a-zA-Z ]*/);
//   let match2 = e.value.match(/\s*/);
//   if (match2[0] === e.value) {
//     predictionResults.innerHTML = "";
//     return;
//   }
//   if (match[0] === e.value) {
//     fetch("/search/:word", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ liveSearchQuery: e.value }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         let searchPredictions = data.searchPredictions;
//         predictionResults.innerHTML = "";

//         if (searchPredictions.length < 1) {
//           predictionResults.innerHTML = "No Words Found";
//           return;
//         }

//         searchPredictions.forEach((word, index) => {
//           if (index > 0) {
//             predictionResults.innerHTML += "<hr>";
//           }
//           predictionResults.innerHTML += `<p>${word}</p>`;
//         });
//       });
//     return;
//   }

//   predictionResults.innerHTML = "";
// }

function sendData(e) {
  const predictionResults = document.getElementById("live-search");
  let match = e.value.match(
    /^[a-zA-Z\u3040-\u30ff\u3400-\u4DBF\u4E00-\u9FFF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\u2B820-\u2CEAF\uF900-\uFAFF ]*/
  );
  let match2 = e.value.match(/\s*/);
  if (match2[0] === e.value) {
    predictionResults.innerHTML = "";
    return;
  }
  if (match[0] === e.value) {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ liveSearchQuery: e.value }),
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
          predictionResults.innerHTML += `<li>${word}</li>`;
        });
      });
    return;
  }

  predictionResults.innerHTML = "";
}
