const tabs = document.querySelectorAll(".content-tabs__btn");
const allContent = document.querySelectorAll(".content");
const tabUnderline = document.querySelector(".content-tabs__line");

//set active tab on load (default HTML button and content must have active input)
if (tabs && allContent && tabUnderline) {
  function setActiveTab(index) {
    if (index >= 0 && index < tabs.length) {
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

      // store active tab index in local storage
      localStorage.setItem("activeTabIndex", index);
    }
  }

  const storedTabIndex = localStorage.getItem("activeTabIndex");
  if (storedTabIndex) {
    setActiveTab(parseInt(storedTabIndex));
  } else {
    setActiveTab(0);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActiveTab(index);
    });
  });

  window.addEventListener("load", () => {
    setActiveTab(
      document.querySelector(".content-tabs__btn.active")?.dataset.index
    );
  });

  window.addEventListener("resize", () => {
    setActiveTab(
      document.querySelector(".content-tabs__btn.active").dataset.index
    );
  });
}

const myWordsTabs = document.querySelectorAll(".myWords-content-tabs__btn");
const myWordsAllContent = document.querySelectorAll(".myWords-content");
const myWordsTabUnderline = document.querySelector(
  ".myWords-content-tabs__line"
);

//set active tab on load (default HTML button and content must have active input)
if (myWordsTabs && myWordsAllContent && myWordsTabUnderline) {
  function setActiveTab(index) {
    if (index >= 0 && index < myWordsTabs.length) {
      myWordsTabs.forEach((tab) => {
        //remove active from all myWordsTabs
        tab.classList.remove("active");
      });
      //add active to all myWordsTabs
      myWordsTabs[index].classList.add("active");

      //move underline to active tab
      const activeTab = myWordsTabs[index];
      myWordsTabUnderline.style.width = activeTab.offsetWidth + "px";
      myWordsTabUnderline.style.left = activeTab.offsetLeft + "px";

      //remove active from all content classes
      myWordsAllContent.forEach((content) => {
        content.classList.remove("active");
      });
      //add active to all content classes
      myWordsAllContent[index].classList.add("active");

      // store active tab index in local storage
      localStorage.setItem("myWordsActiveTabIndex", index);
    }
  }

  const storedTabIndex = localStorage.getItem("myWordsActiveTabIndex");
  if (storedTabIndex) {
    setActiveTab(parseInt(storedTabIndex));
  } else {
    setActiveTab(0);
  }

  myWordsTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      setActiveTab(index);
    });
  });

  window.addEventListener("load", () => {
    setActiveTab(
      document.querySelector(".myWords-content-tabs__btn.active")?.dataset.index
    );
  });

  window.addEventListener("resize", () => {
    setActiveTab(
      document.querySelector(".myWords-content-tabs__btn.active").dataset.index
    );
  });
}

let progress = document.querySelectorAll(".progress");
let progress_text = document.querySelectorAll(".data-progress");

progress.forEach((pro) => {
  let percentage = pro.getAttribute("data-value");
  let color = pro.getAttribute("data-stroke");
  let animateTime = pro.getAttribute("data-time");
  let radius = pro.r.baseVal.value;
  let circumference = radius * 2 * Math.PI;
  let stroke = circumference - (circumference * percentage) / 100;
  pro.style.setProperty("--stroke-dashoffset", stroke);
  pro.style.setProperty("--stroke-dasharray", circumference);
  pro.style.setProperty("--stroke", color);
  pro.style.setProperty("--animation-time", `${animateTime * 10}ms`);
});

progress_text.forEach((text) => {
  let data = text.getAttribute("data-value");
  let progress_value = 0;
  let progress_bar = setInterval(() => {
    progress_value++;
    text.innerText = `${progress_value}`;
    if (progress_value == data) {
      clearInterval(progress_bar);
    }
  }, 10);
});
