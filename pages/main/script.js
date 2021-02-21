// Burger Menu

let burgerBtn = document.querySelector('.header__burger');
let menu = document.querySelector('.menu');
let headerEssentials = document.querySelector('.header__essential');
let blackout = document.querySelector('.blackout');
let body = document.querySelector('body');



burgerBtn.addEventListener('click', () => toggle());
blackout.addEventListener('click', () => closeMenu());



function toggle(){
    burgerBtn.classList.toggle('active');
    menu.classList.toggle('menu--active');
    blackout.classList.toggle('blackout--active');  
    headerEssentials.classList.toggle('headerEssentials--active'); 
    body.classList.toggle('lock');
}

function closeMenu(){
    burgerBtn.classList.remove('active');
    menu.classList.remove('menu--active');
    blackout.classList.remove('blackout--active');  
    headerEssentials.classList.remove('headerEssentials--active'); 
    body.classList.remove('lock');
}



  
 







