import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import {header} from './header';
import {sideMenu} from './side_menu';
import {application} from './application';

sideMenu.start(8)
application.start(0);

let burgerBtn = document.querySelector('.burgerBtn');
let sideMenuWrapper = document.querySelector('.sideMenuWrapper');
let sideMenuBtns = document.querySelectorAll('.sideMenuBtn');
let cardCategories = document.querySelectorAll('.cardCategory');
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

for (let index = 0; index < cardCategories.length; index++) {
  cardCategories[index].addEventListener('click',function () {
    if (this.classList.contains('cardCategory')) application.changeCategory(index)
    else {this.style.transform = 'rotateY(180deg)';
          this.classList.add('rotated')
          this.addEventListener('mouseleave',function () {
            this.style.transform = 'rotateY(0)'
          })
        };
  }) 
}




