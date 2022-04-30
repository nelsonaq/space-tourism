"use strict";

/**
 * Navigation bar elements
 */
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const navDrawer = document.querySelector(".nav-drawer");
const overlay = document.querySelector(".overlay");

/**
 * Elements in the container
 */
const destinationNames = document.querySelector(".destination-names");
const destinationImg = document.querySelector(".container img");
const destinationInfo = document.querySelector(".destination-info h2");
const destinationDescription = document.querySelector(".destination-info p");
const destinationDistance = document.querySelector(".distance");
const destinationTravel = document.querySelector(".travel");

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
 * @param {Number} destinationNum - Data id of selected destination.
 */
const updateUI = function (data, destinationNum) {
  const destinationData = data.destinations[destinationNum];
  destinationImg.src = `/assets/destination/image-${destinationData.name}.png`;
  destinationInfo.textContent = destinationData.name;
  destinationDescription.textContent = destinationData.description;
  destinationDistance.textContent = destinationData.distance;
  destinationTravel.textContent = destinationData.travel;
};

/**
 * Render the destination animation and reset the animation when switching.
 */
const resetDestinationAnimation = function () {
  destinationImg.classList.remove("destination-img-animation");
  void destinationImg.offsetWidth;
  destinationImg.classList.add("destination-img-animation");
};

/**
 * Displays UI for selected destination.
 * @param {Element} selecteddestination - Selected destination's element.
 */
const displaySelectedDestination = function (selectedDestination) {
  destinationNames
    .querySelectorAll("li")
    .forEach((destination) =>
      destination.classList.remove("selected-destination")
    );
  selectedDestination.classList.add("selected-destination");
};

/**
 * Handles all the changes that occurs when switching destinations.
 */
destinationNames.addEventListener("click", function (e) {
  e.preventDefault();

  const selectedDestination = e.target.closest("li");
  //* Guard Clause
  if (!selectedDestination) return;

  const selectedDestinationID = selectedDestination.dataset.id;

  resetDestinationAnimation();
  displaySelectedDestination(selectedDestination);
  getJSON().then((data) => updateUI(data, selectedDestinationID));
});
