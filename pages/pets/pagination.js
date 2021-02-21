let pets = [];
let allList = [];
let pageNumber = 1;

let petsPerPage = getNumberOfCards(document.body.offsetWidth);

const pageNumberBtn = document.querySelector('#page-number');
pageNumberBtn.innerHTML = pageNumber;

const request = new XMLHttpRequest();
request.open('GET', '../main/pets.json');

request.onload = () => {
  pets = JSON.parse(request.response);


  getPets();
  createPets();
}
request.send();

const pagination = document.querySelector('.pets-friends-slider__inner');
const createPets = () => {
// Get sliders DOM
  pagination.innerHTML = generateCards();
  loadPopUp();

}

function getPets(){
    let tempArr = [];
    for (let i = 0; i < 6; i++){
        let newPets = pets;
        for (let j = pets.length; j > 0; j--){
            let newIndex = Math.floor(Math.random()*j);
            let randPet = newPets.splice(newIndex, 1)[0];
            newPets.push(randPet);
        }
        tempArr = [...tempArr, ...newPets]
    }

    let length = tempArr.length;
    for ( let i = 0; i < length / 6; i++){
        const stepList = tempArr.slice(i * 6, (i * 6)+6);

        for (let j = 0; j < 6; j++){
            const duplicatedItem = stepList.find((item, ind) => {
                return item.name === stepList[j].name && (ind !== j);
            });

            if (duplicatedItem !== undefined){
                const ind = (i * 6) + j;
                const which8OfList = Math.trunc(ind / 8);

                const elem = tempArr.splice(ind, 1)[0];
                tempArr.splice(which8OfList * 8, 0, elem);

                i -= 2;
                break;
            }
        }

    }
    
    allList = tempArr;
    
    return tempArr;
}

function getNumberOfCards(pageWidth){
    if (pageWidth >= 1280){
      return 8;
    } else if (pageWidth >= 768){
      return 6;
    } else {
      return 3;
    }
}

function generateCards(){
    
    let str = '';
    for (let i = 0; i < petsPerPage; i++){
        str += `<button class="slider__item">
                <img src="${allList[i + (petsPerPage * (pageNumber - 1))].img}" alt="pets photo">
                <h4 class="slider__pet-name">${allList[i + (petsPerPage * (pageNumber - 1))].name}</h4>
                <a class="btn slider__item-link" href="#">Learn more</a>
                </button>`
      }
      return str;
}

// Controls

const nextPage = document.querySelector('#next-page');
const previousPage = document.querySelector('#previous-page');
const lastPage = document.querySelector('#last-page');
const firstPage = document.querySelector('#first-page');

function disableBtns(){
    if (pageNumber === 1){
        previousPage.disabled = true;
        previousPage.classList.add('arrow-btn--inactive');
        firstPage.disabled = true;
        firstPage.classList.add('arrow-btn--inactive');

        nextPage.disabled = false;
        nextPage.classList.remove('arrow-btn--inactive');
        lastPage.disabled = false;
        lastPage.classList.remove('arrow-btn--inactive');
    } else if (pageNumber === allList.length / petsPerPage) {
        previousPage.disabled = false;
        previousPage.classList.remove('arrow-btn--inactive');
        firstPage.disabled = false;
        firstPage.classList.remove('arrow-btn--inactive');
        nextPage.disabled = true;
        nextPage.classList.add('arrow-btn--inactive');
        lastPage.disabled = true;
        lastPage.classList.add('arrow-btn--inactive');
    } else {
        previousPage.disabled = false;
        previousPage.classList.remove('arrow-btn--inactive');
        firstPage.disabled = false;
        firstPage.classList.remove('arrow-btn--inactive');
        nextPage.disabled = false;
        nextPage.classList.remove('arrow-btn--inactive');
        lastPage.disabled = false;
        lastPage.classList.remove('arrow-btn--inactive');
    }
}

nextPage.addEventListener('click', () => changePage('nextPage'));
previousPage.addEventListener('click', () => changePage('previousPage'));
firstPage.addEventListener('click', () => changePage('firstPage'));
lastPage.addEventListener('click', () => changePage('lastPage'));

function changePage(event){
    const currentSlideSet = document.querySelector('.pets-friends-slider__inner');
    currentSlideSet.style.opacity = '0';

    switch(event){
        case 'nextPage':
            pageNumber++;
            break;
        case 'previousPage':
            pageNumber--;
            break;
        case 'firstPage':
            pageNumber = 1;
            break;
        case 'lastPage':
            pageNumber = allList.length / petsPerPage;
            break;
    }
    petsPerPage = getNumberOfCards(document.body.offsetWidth);
    pageNumberBtn.innerHTML = pageNumber;
    
    setTimeout(() => {pagination.innerHTML = generateCards();}, 500);
    setTimeout(() => {currentSlideSet.style.opacity = '1';}, 1000);
    setTimeout(() => {loadPopUp();}, 1100);
    
    
    disableBtns();
    /* window.scrollTo(0, 0); */
}


disableBtns();


