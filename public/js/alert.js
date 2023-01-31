// exports.hideAlert = () => {
//   const alertElement = document.querySelector(".alert");
//   if (alertElement) {
//     alertElement.parentElement.removeChild(alertElement);
//   }
// };

// exports.showAlert = (type, message) => {
//   //hide other alerts possibly still on screen
//   hideAlert();

//   //type must be 'success' or 'error'
//   const markup = `<div class="alert alert--${type}">${message}</div>`;
//   document.querySelector("body").insertAdjacentElement("afterbegin", markup);

//   //remove alert after n seconds
//   window.setTimeout(hideAlert, 5000);
// };
