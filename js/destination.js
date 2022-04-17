const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

const planetNames = document.querySelector(".planet-names");
const planetImg = document.querySelector(".container img");
const planetInfo = document.querySelector(".planet-info h1");
const planetDescription = document.querySelector(".planet-info p");
const planetDistance = document.querySelector(".distance");
const planetTravel = document.querySelector(".travel");

const showLinks = function () {
  overlay.classList.toggle("hide-overlay");
};

hamburger.addEventListener("click", showLinks);
close.addEventListener("click", showLinks);

const updateUI = function (data, planetNum) {
  const planetData = data.destinations[planetNum];
  planetInfo.textContent = planetData.name;
  planetDescription.textContent = planetData.description;
  planetDistance.textContent = planetData.distance;
  planetTravel.textContent = planetData.travel;
  planetImg.src = `/assets/destination/image-${planetData.name}.png`;
};

const getJSON = async function () {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

planetNames.addEventListener("click", function (e) {
  e.preventDefault();
  const selected = e.target.closest("li");
  if (!selected) return;
  const selectedId = selected.dataset.id;
  planetImg.classList.remove("planet-img-animation");
  void planetImg.offsetWidth;
  planetImg.classList.add("planet-img-animation");

  planetNames
    .querySelectorAll("li")
    .forEach((planet) => planet.classList.remove("active-planet"));
  selected.classList.add("active-planet");
  getJSON().then((data) => updateUI(data, selectedId));
});
