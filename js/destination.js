"use strict";

/**
 * Navigation bar elements
 */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

/**
 * Elements in the container
 */
const planetNames = document.querySelector(".planet-names");
const planetImg = document.querySelector(".container img");
const planetInfo = document.querySelector(".planet-info h1");
const planetDescription = document.querySelector(".planet-info p");
const planetDistance = document.querySelector(".distance");
const planetTravel = document.querySelector(".travel");

/**
 * Function that hides and display the overlay link counter when in mobile view
 */
const showLinks = function () {
  overlay.classList.toggle("hide-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);

/**
 * Updates the UI based on the given arguments.
 * @param {Object} data - Object from the local json file.
 * @param {Number} planetNum - Data id of selected planet.
 */
const updateUI = function (data, planetNum) {
  const planetData = data.destinations[planetNum];
  planetInfo.textContent = planetData.name;
  planetDescription.textContent = planetData.description;
  planetDistance.textContent = planetData.distance;
  planetTravel.textContent = planetData.travel;
  planetImg.src = `/assets/destination/image-${planetData.name}.png`;
};

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
 * Render the planet animation and reset the animation when switching.
 */
const resetPlanetAnimation = function () {
  planetImg.classList.remove("planet-img-animation");
  void planetImg.offsetWidth;
  planetImg.classList.add("planet-img-animation");
};

/**
 * Displays UI for selected planet.
 * @param {Element} selectedPlanet - Selected planet's element.
 */
const displaySelectedPlanet = function (selectedPlanet) {
  planetNames
    .querySelectorAll("li")
    .forEach((planet) => planet.classList.remove("selected-planet"));
  selectedPlanet.classList.add("selected-planet");
};

/**
 * Handles all the changes that occurs when switching planets.
 */
planetNames.addEventListener("click", function (e) {
  e.preventDefault();

  const selected = e.target.closest("li");
  const selectedId = selected.dataset.id;
  if (!selected) return;

  resetPlanetAnimation();
  displaySelectedPlanet(selected);
  getJSON().then((data) => updateUI(data, selectedId));
});
