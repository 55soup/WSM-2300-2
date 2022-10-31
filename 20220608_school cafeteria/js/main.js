// show/hide menu: toggle menu
const toggleMenu = (toggleId, navListId) => {
  //html -> js
  const toggle = document.getElementById(toggleId);
  const navList = document.getElementById(navListId);
  const toggleIcon = toggle.getElementsByTagName("i")[0];

  if (toggle && navList) {
    //toggle click
    toggle.addEventListener("click", () => {
      //show/hide menu: .show-menu
      navList.classList.toggle("show-menu");
      //change toggle icon: bx-menu <-> bx-x
      toggleIcon.classList.toggle("bx-menu");
      toggleIcon.classList.toggle("bxs-x-square");
    });
  }
};
toggleMenu("nav-toggle", "nav-list");

// const say = () => console.log("hello world4");

// const say = () => {
//   console.log("hello world3");
// };

// const say = function () {
//   console.log("hello world2");
// };

// function say() {
//   console.log("hello world");
// }
// say();