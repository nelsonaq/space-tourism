"use strict";

/**
 * Navigation bar elements
 */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

/**
 * Function that hides and display the overlay link counter when in mobile view
 */
const showLinks = function () {
  overlay.classList.toggle("hide-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);
