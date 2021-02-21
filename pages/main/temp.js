debugger;
// Determine the number of visible slides depending on the page's width
let petsPerSlide = getNumberOfSlider(document.body.offsetWidth);
// Listen for page to resize to recalculate the number of pets to display;
// window.addEventListener('resize', () => createPets());


function getNumberOfSlider(pageWidth){
  if (pageWidth >= 1280){
    return 3;
  } else if (pageWidth >= 768){
    return 2;
  } else {
    return 1;
  }
}




let currentPetsList = [];
let previousPetsList = [];


// Get sliders DOM

const slider = document.querySelector('.slider__inner');
slider.innerHTML = createCards();
  

function createCards() {
  let newPets = [];

  for (let i = 0; i < petsPerSlide; i++){
    let randomPet = Math.floor(Math.random()*8);
    if (newPets.includes(pets[randomPet]) || previousPetsList.includes(pets[randomPet])){
      i--;
    } else {
      newPets.push(pets[randomPet]);
    }
  }

  currentPetsList = [];
  currentPetsList = newPets.slice();

  let str = '';
  for (let i = 0; i < currentPetsList.length; i++){
    str += `<button class="slider__item">
            <img src="${currentPetsList[i].img}" alt="pets photo">
            <h4 class="slider__pet-name">${currentPetsList[i].name}</h4>
            <a class="btn slider__item-link" href="#">Learn more</a>
            </button>`
  }
  return str;
}

function changePets(){
  previousPetsList = [];
  previousPetsList = currentPetsList.slice();
  slider.innerHTML = createCards();
}

// Listen for change button clicks
const arrowBtn = document.querySelectorAll('.arrow-btn');
arrowBtn.forEach(function(){
  addEventListener('click', () => changePets());
});