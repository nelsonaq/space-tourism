"use strict";

/**
 * Navigation bar elements
 */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navDrawer = document.querySelector(".nav-drawer");
const overlay = document.querySelector(".overlay");

const btnNums = document.querySelector(".num-btns");
const btnNumAll = document.querySelectorAll(".num-btn");
const techImgPortrait = document.querySelector(".tech-img-portrait");
const techImgLandscape = document.querySelector(".tech-img-landscape");
const techName = document.querySelector(".tech-info h3");
const techDescription = document.querySelector(".tech-info p");

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
 * @param {Number} techNum - Data id of selected technology.
 */
const updateUI = function (data, techNum) {
  const techData = data.technology[techNum];

  //* Ensures the images has been fully loaded before being displayed in UI
  const img = new Image();
  img.src = techData.images.landscape;
  img.src = techData.images.portrait;
  img.onload = () => {
    techImgLandscape.style.background = `url(${techData.images.landscape})bottom / cover`;
    techImgPortrait.style.background = `url(${techData.images.portrait})`;
  };

  techName.textContent = techData.name;
  techDescription.textContent = techData.description;
};

/**
 * Retriggers the animation when switching technology.
 */
const resetDestinationAnimation = function () {
  techImgPortrait.style.animation = "none";
  techImgPortrait.offsetWidth;
  techImgPortrait.style.animation = null;

  techName.style.animation = "none";
  techName.offsetWidth;
  techName.style.animation = null;

  techDescription.style.animation = "none";
  techDescription.offsetWidth;
  techDescription.style.animation = null;
};

/**
 * Displays UI for selected crew.
 * @param {Element} selectedDot - Selected technology's element.
 */
const displaySelectedTech = function (selectedTech) {
  btnNumAll.forEach((btnNum) => btnNum.classList.remove("selected-num"));
  selectedTech.classList.add("selected-num");
};

/**
 * Handles all the changes that occurs when switching technologies.
 */
btnNums.addEventListener("click", function (e) {
  e.preventDefault();
  const selectedTech = e.target.closest(".num-btn");
  //* Guard Clause
  if (!selectedTech) return;
  const selectedTechID = selectedTech.dataset.id;
  if (selectedTech.classList.contains("selected-num")) return;
  getJSON().then((data) => updateUI(data, selectedTechID));
  resetDestinationAnimation();
  displaySelectedTech(selectedTech);
});
