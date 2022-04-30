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

const updateUI = function (data, techNum) {
  const techData = data.technology[techNum];
  techImgLandscape.style.background = `url(${techData.images.landscape})bottom / cover`;
  techImgPortrait.style.background = `url(${techData.images.portrait})`;
  techName.textContent = techData.name;
  techDescription.textContent = techData.description;
};

const displaySelectedNum = function (selected) {
  btnNumAll.forEach((btnNum) => btnNum.classList.remove("selected-num"));
  selected.classList.add("selected-num");
};

btnNums.addEventListener("click", function (e) {
  e.preventDefault();
  const selected = e.target.closest(".num-btn");
  //* Guard Clause
  if (!selected) return;
  const selectedNum = selected.dataset.num;

  displaySelectedNum(selected);
  getJSON().then((data) => updateUI(data, selectedNum));
});
