const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

const showLinks = function () {
  overlay.classList.toggle("hide-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);
