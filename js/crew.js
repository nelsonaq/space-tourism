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
  navDrawer.classList.toggle("display-nav-drawer");
  overlay.classList.toggle("display-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);
overlay.addEventListener("click", showLinks);

/**
 * Handles fetching the local data json file.
 * @returns {Promise/Object} - Promise that contains the data object of the json file.
 */
const getJSON = async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/**
 * Updates the UI based on the given arguments.
 * @param {Object} data - Object from the local json file.
 * @param {Number} crewNum - Data id of selected crew.
 */
const updateUI = function (data, crewNum) {
  const crewData = data.crew[crewNum];
  const container = document.querySelector(".container");
  container.firstElementChild.remove();
  const markup = `<img
  class="crew-img"
  src="${crewData.images.png}"
  alt="Image of a crwe member"
  srcset=""
/>`;

  container.insertAdjacentHTML("afterbegin", markup);
  crewRole.textContent = crewData.role;
  crewName.textContent = crewData.name;
  crewBio.textContent = crewData.bio;
};

/**
 * Retriggers the animation when switching crew.
 */
const resetDestinationAnimation = function () {
  crewImg.style.animation = "none";
  crewImg.offsetWidth;
  crewImg.style.animation = null;

  crewRole.style.animation = "none";
  crewRole.offsetWidth;
  crewRole.style.animation = null;

  crewName.style.animation = "none";
  crewName.offsetWidth;
  crewName.style.animation = null;

  crewBio.style.animation = "none";
  crewBio.offsetWidth;
  crewBio.style.animation = null;
};

/**
 * Displays UI for selected crew.
 * @param {Element} selectedDot - Selected crew's element.
 */
const displaySelectedDot = function (selectedDot) {
  dots.forEach((dot) => dot.classList.remove("selected-dot"));
  selectedDot.classList.add("selected-dot");
};

/**
 * Handles all the changes that occurs when switching crews.
 */
dotsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedDot = e.target.closest(".dot");
  //* Guard Clause
  if (!selectedDot) return;

  const selectedDotID = selectedDot.dataset.id;

  //* Does not update UI if selectedDestination has been selected
  if (selectedDot.classList.contains("selected-dot")) return;
  getJSON().then((data) => updateUI(data, selectedDotID));
  resetDestinationAnimation();
  displaySelectedDot(selectedDot);
});
