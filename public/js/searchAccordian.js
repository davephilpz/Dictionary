let accordianToggle = document.getElementsByClassName("search__result");

for (let i = 0; i < accordianToggle.length; i++) {
  accordianToggle[i].addEventListener("click", function () {
    this.classList.toggle("accordian-open");
  });
}
