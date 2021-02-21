// -----------------------------------------------------------------------------------
// Front page slider

// Determine the number of visible slides depending on the page's width
let petsPerSlide = 3;
// Listen for page to resize to recalculate the number of pets to display;
// window.addEventListener('resize', () => createPets());
// Listen for change button clicks
const arrowBtnLeft = document.querySelector('.arrow-btn--left');
const arrowBtnRight = document.querySelector('.arrow-btn--right');
arrowBtnLeft.addEventListener('click', () => animateChange());
arrowBtnRight.addEventListener('click', () => animateChange());

function getNumberOfSlider(pageWidth){
  if (pageWidth >= 1280){
    return 3;
  } else if (pageWidth >= 768){
    return 2;
  } else {
    return 1;
  }
}

//get pets' info from JSON

let pets = [];
let currentPetList = [];

const request = new XMLHttpRequest();
request.open('GET', 'pets.json');

request.onload = () => {
  pets = JSON.parse(request.response);

  createPets();
}
request.send();
const slider = document.querySelector('.slider__inner');

const createPets = () => {
// Get sliders DOM
  slider.innerHTML = generateCards();
  loadPopUp();
}

const getPets = () => {

  let newPets = [];

  for (let i = 0; i < petsPerSlide; i++){
    let randomPet = Math.floor(Math.random()*8);
    if (newPets.includes(randomPet) || currentPetList.includes(randomPet)){
      i--;
    } else {
      newPets.push(randomPet);
    }
  }
  currentPetList = [];
  currentPetList = newPets.slice()

}

const generateCards = () => {
  getPets();
  let str = '';
  for (let i = 0; i < petsPerSlide; i++){
    str += `<button class="slider__item" id="slider-item">
    <img src="${pets[currentPetList[i]].img}" alt="pets photo">
    <h4 class="slider__pet-name">${pets[currentPetList[i]].name}</h4>
    <span class="btn slider__item-link">Learn more</span>
    </button>`
  }
  return str;
}

function animateChange(){
  const currentSlideSet = document.querySelector('.slider__inner');
  currentSlideSet.style.opacity = '0';
  setTimeout(() => createPets(), 500);
  setTimeout(() => {currentSlideSet.style.opacity = '1';}, 800);
}


