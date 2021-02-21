// Modal pop-up

function loadPopUp(){
let blackoutOverlay = document.querySelector('.blackout');
let bodyTag = document.querySelector('body');

let modalPopUpInner = document.querySelector('.modal-popup__inner');

let modalClose = document.querySelector('.modal-popup-close');
let modalPopUp = document.querySelector('.modal-popup');



let sliderItem = document.querySelectorAll('.slider__item');
    for (let i = 0; i < sliderItem.length; i++){
        sliderItem[i].addEventListener('click', () => {
            let petsName = sliderItem[i].querySelector('.slider__pet-name').textContent;
            createPetPopup(petsName);
        });
    }

modalClose.addEventListener('click', () => closeModal());
blackoutOverlay.addEventListener('click', () => closeModal());


function createPetPopup(petsName){
    let currentPet;

    for (let i = 0; i < pets.length; i++){
        if (pets[i].name === petsName){
            currentPet = pets[i];
        }
    }
    
    let str = `<img src="${currentPet.img}" alt="pets image" class="pets-image">
                <div class="pets-info">
                    <h3 class="pets-info__name">${currentPet.name}</h3>
                    <h4 class="pets-info__breed">${currentPet.type} - ${currentPet.breed}</h4>
                    <p class="pets-info__descr">${currentPet.description}</p>
                    <ul class="pets-info__additional">
                        <li class="pets-info__additional-item"><span>Age:</span> ${currentPet.age}</li>
                        <li class="pets-info__additional-item"><span>Inoculations:</span> ${currentPet.inoculations}</li>
                        <li class="pets-info__additional-item"><span>Diseases:</span> ${currentPet.diseases}</li>
                        <li class="pets-info__additional-item"><span>Parasites:</span> ${currentPet.parasites}</li>
                    </ul>
                </div>`

    modalPopUpInner.innerHTML = str;
    openModal();
    const openedOverlay = document.querySelector('.blackout-popup--active');
    openedOverlay.addEventListener('mouseover', () => modalClose.classList.add('modal-popup-close-hover'));
    openedOverlay.addEventListener('mouseout', () => modalClose.classList.remove('modal-popup-close-hover'));    

}

function openModal(){
    blackoutOverlay.classList.add('blackout-popup--active');
    bodyTag.classList.add('lock-popup');
    modalPopUp.classList.add('modal-popup--active'); 
}

function closeModal(){
    blackoutOverlay.classList.remove('blackout-popup--active');
    bodyTag.classList.remove('lock-popup');
    modalPopUp.classList.remove('modal-popup--active'); 
}


}

