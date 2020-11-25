import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import {header} from './header';
import {sideMenu} from './side_menu';
import {application} from './application';

sideMenu.start()
application.start(0);

const burgerBtn = document.querySelector('.burgerBtn');
const sideMenuWrapper = document.querySelector('.sideMenuWrapper');
const sideMenuBtns = document.querySelectorAll('.sideMenuBtn');
const cardCategories = document.querySelectorAll('.cardCategory');
const switcher =  document.querySelector('.switcher');
const {body} = document;
const mask = document.querySelector('.mask');

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

for (let index = 0; index < sideMenuBtns.length; index+= 1) {
  sideMenuBtns[index].addEventListener('click',function () {
    body.classList.toggle("block");
    sideMenuWrapper.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    mask.classList.toggle("active");
  })
  
}

for (let index = 0; index < cardCategories.length; index+= 1) {
  cardCategories[index].addEventListener('click',function () {
    if (this.classList.contains('cardCategory')) application.changeCategory(index)
  }) 
}

switcher.addEventListener('click', function () {
  if (application.properties.play) {
      application.properties.play = false;
      application.train();
  } else {
    application.properties.play = true;
    application.play();
  }

})



