"use strict";

/**
 * Navigation bar elements
 */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navDrawer = document.querySelector(".nav-drawer");
const overlay = document.querySelector(".overlay");

const dotsContainer = document.querySelector(".dots-container");
const dots = document.querySelectorAll(".dot");
const crewImg = document.querySelector(".crew-img");
const crewRole = document.querySelector(".crew-info h2");
const crewName = document.querySelector(".crew-info h3");
const crewBio = document.querySelector(".crew-info p");

/**
 * Function that hides and display the overlay link counter when in mobile view
 */
const showLinks = function () {
  navDrawer.classList.toggle("hide-nav-drawer");
  overlay.classList.toggle("display-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);
overlay.addEventListener("click", showLinks);

const getJSON = async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const updateUI = function (data, crewNum) {
  const crewData = data.crew[crewNum];
  crewImg.src = crewData.images.png;
  crewRole.textContent = crewData.role;
  crewName.textContent = crewData.name;
  crewBio.textContent = crewData.bio;
};

const displaySelectedDot = function (selectedDot) {
  dots.forEach((dot) => dot.classList.remove("selected-dot"));
  selectedDot.classList.add("selected-dot");
};

dotsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedDot = e.target.closest(".dot");
  //* Guard Clause
  if (!selectedDot) return;

  const selectedDotID = selectedDot.dataset.id;
  displaySelectedDot(selectedDot);
  getJSON().then((data) => updateUI(data, selectedDotID));
});
