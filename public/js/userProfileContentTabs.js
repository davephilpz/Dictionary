const tabs = document.querySelectorAll(".content-tabs__btn");
const allContent = document.querySelectorAll(".content");

//set active tab (default HTML button and content must have active input)
if (tabs && allContent) {
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", (e) => {
      tabs.forEach((tab) => {
        //remove active from all tabs
        tab.classList.remove("active");
      });
      //add active to all tabs
      tab.classList.add("active");

      //move underline to active tab
      let tabUnderline = document.querySelector(".content-tabs__line");
      tabUnderline.style.width = e.target.offsetWidth + "px";
      tabUnderline.style.left = e.target.offsetLeft + "px";

      //remove active from all content classes
      allContent.forEach((content) => {
        content.classList.remove("active");
      });
      //add active to all content classes
      allContent[index].classList.add("active");
    });
  });
}
