import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import {burgerBtn} from './burger_btn';
import {switcher} from './switcher_btn';
import {sideMenu} from './side_menu';

sideMenu.start(8)

let sideMenuWrapper = document.querySelector('.sideMenuWrapper');
let sideMenuBtns = document.querySelectorAll('.sideMenuBtn');
let body = document.body;
let mask = document.querySelector('.mask');

burgerBtn.addEventListener('click', () => {
  sideMenuWrapper.classList.toggle("active");
  body.classList.toggle("block");
  mask.classList.toggle("active");
});

mask.addEventListener('click',function () {
  body.classList.toggle("block");
  sideMenuWrapper.classList.toggle("active");
  this.classList.toggle("active");
  burgerBtn.classList.toggle("active");
})

for (let index = 0; index < sideMenuBtns.length; index++) {
  sideMenuBtns[index].addEventListener('click',function () {
    body.classList.toggle("block");
    sideMenuWrapper.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    mask.classList.toggle("active");
  })
  
}



