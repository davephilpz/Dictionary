const tabs = document.querySelectorAll(".content-tabs__btn");
const allContent = document.querySelectorAll(".content");
const tabUnderline = document.querySelector(".content-tabs__line");

function setActiveTab(index) {
  tabs.forEach((tab) => {
    //remove active from all tabs
    tab.classList.remove("active");
  });
  //add active to all tabs
  tabs[index].classList.add("active");

  //move underline to active tab
  const activeTab = tabs[index];
  tabUnderline.style.width = activeTab.offsetWidth + "px";
  tabUnderline.style.left = activeTab.getBoundingClientRect().left + "px";

  //remove active from all content classes
  allContent.forEach((content) => {
    content.classList.remove("active");
  });
  //add active to all content classes
  allContent[index].classList.add("active");
}

//set active tab on load (default HTML button and content must have active input)
if (tabs && allContent) {
  setActiveTab(0);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActiveTab(index);
    });
  });

  window.addEventListener("load", () => {
    setActiveTab(
      document.querySelector(".content-tabs__btn.active").dataset.index
    );
  });

  window.addEventListener("resize", () => {
    setActiveTab(
      document.querySelector(".content-tabs__btn.active").dataset.index
    );
  });
}
