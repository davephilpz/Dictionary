const tooltipIcon = document.querySelector(".tooltip__icon");
const tooltip = document.querySelector(".tooltip");
const closeButton = document.querySelector(".tooltip__close-button");

//desktop
tooltipIcon.addEventListener("mouseover", function () {
  tooltip.style.visibility = "visible";
});
tooltipIcon.addEventListener("mouseout", function () {
  tooltip.style.visibility = "hidden";
});

//mobile click handlers
tooltipIcon.addEventListener("click", function () {
  tooltip.style.visibility = "visible";
});
closeButton.addEventListener("click", function () {
  tooltip.style.visibility = "hidden";
});
