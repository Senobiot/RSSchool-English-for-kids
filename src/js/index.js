import '../css/reset.css';
import '../css/style.css';
import '../css/style.scss';
import '../css/mediaQueries.scss';
import './header_footer';
import sideMenu from './side_menu';
import application from './application';

sideMenu.start()
application.start(0);

const title = document.querySelector('.appTitle');
const burgerBtn = document.querySelector('.burgerBtn');
const sideMenuWrapper = document.querySelector('.sideMenuWrapper');
const sideMenuBtns = document.querySelectorAll('.sideMenuBtn');
const cards = document.querySelectorAll('.avers');
const cardsReverse = document.querySelectorAll('.reverse');
const rotateBtnS = document.querySelectorAll('.cardRotateBtn');
const cardWrapperS =  document.querySelectorAll('.cardWrapper');
const playRepeatBtn = document.querySelector('.playRepeatBtn');
const switcher =  document.querySelector('.switcher');
const statistcBtn = document.querySelector('.statisticBtn');
const {body} = document;
const mask = document.querySelector('.mask');
const content = document.querySelector('.content');
const correctAudio = new Audio;
const mistakeAudio = new Audio;

correctAudio.src = './audio/correct2.mp3';
mistakeAudio.src = './audio/fart.mp3';

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
  sideMenuBtns[index].style.background = `url('./img/menu_icon_${index}.png') no-repeat 0 50%/1em`;
  sideMenuBtns[index].addEventListener('click',function () {
    if (statistcBtn.classList.contains('active')) {
      statistcBtn.classList.remove("active");
      application.elements.content.removeChild(application.elements.content.lastChild);
    }
    body.classList.toggle("block");
    sideMenuWrapper.classList.toggle("active");
    burgerBtn.classList.toggle("active");
    mask.classList.toggle("active");
    document.querySelector('.switcher').checked = false;
    document.querySelector('.switcher').classList.remove('blocked')
    if (index === 0) {
      for (let idx = 0; idx < sideMenuBtns.length; idx+= 1) {
        sideMenuBtns[idx].classList.remove("active");
      }
      application.restart()
    } else { 
      for (let ids = 0; ids < sideMenuBtns.length; ids += 1) {
        sideMenuBtns[ids].classList.remove("active");
      }
      this.classList.add("active");
      title.textContent = this.textContent;
      application.properties.currentCategory = this.textContent;
      application.changeCategory(index)} 
  })  
}

for (let index = 0; index < cards.length; index+= 1) {
  cardWrapperS[index].addEventListener('mouseleave', function (){
    if (this.firstChild.classList.contains('rotated')) {
      setTimeout(() => {
      this.firstChild.classList.remove('rotated');
      this.lastChild.classList.remove('rotated'); 
    }, 600)
    setTimeout(() => {
        rotateBtnS[index].classList.remove('inactive'); 
    }, 1600)}

  });
  rotateBtnS[index].addEventListener('click', function (){
    cards[index].classList.add('rotated');
    cardsReverse[index].classList.add('rotated');
  })

  cards[index].addEventListener('click',function () {
    if (this.classList.contains('cardCategory')) {
      application.properties.currentCategory = this.children[1].textContent;
      sideMenuBtns[index + 1].classList.add("active");
      application.changeCategory(index + 1);
    } else if (playRepeatBtn.classList.contains('inactive') && !this.classList.contains('rotated')) {
        let localData;
        if (application.properties.repeatWords === true) {
          localData =  JSON.parse(localStorage.getItem(application.elements.repeatWordsArrayCategories[index]));
          localData.find(a=> a.word === this.children[1].textContent).trained += 1;
          localStorage.setItem(application.elements.repeatWordsArrayCategories[index], JSON.stringify(localData)) 
        } else {
          localData = JSON.parse(localStorage.getItem(application.properties.currentCategory))
          localData[index].trained += 1;   
          localStorage.setItem(application.properties.currentCategory, JSON.stringify(localData))    
        }
          application.elements.soundArr[index].currentTime = 0;
          application.elements.soundArr[index].play();
          }
        else if (application.properties.play) {
          if (index === application.elements.randomArr[application.properties.step]) {
            application.guess();
            correctAudio.play();
             this.classList.add('catched');
            let localData;
            if (application.properties.repeatWords === true) {
              localData =  JSON.parse(localStorage.getItem(application.elements.repeatWordsArrayCategories[index]));
              localData.find(a=> a.word === this.children[1].textContent).correct += 1;   
              localStorage.setItem(application.elements.repeatWordsArrayCategories[index], JSON.stringify(localData)) 
              if (application.properties.step === application.elements.repeatWordsArray.length) {
                application.win();
                return;
                }   
            } else {
              localData = JSON.parse(localStorage.getItem(application.properties.currentCategory));
              localData[index].correct += 1;   
              localStorage.setItem(application.properties.currentCategory, JSON.stringify(localData));
                if (application.properties.step === application.elements.cards.length) {
                application.win();
                return;
                }    
            }        

            setTimeout(() => {
              application.elements.soundArr[application.elements.randomArr[application.properties.step]].play();
            }, 1000)
          } else {
            let localData;
            if (application.properties.repeatWords === true) {
              localData =  JSON.parse(localStorage.getItem(application.elements.repeatWordsArrayCategories[
                application.elements.randomArr[application.properties.step]]));
              localData.find(a => a.word === application.elements.repeatWordsArray[
                application.elements.randomArr[application.properties.step]]).mistakes += 1;  
              localStorage.setItem(application.elements.repeatWordsArrayCategories[
                application.elements.randomArr[application.properties.step]], JSON.stringify(localData)) 
            } else {
              localData = JSON.parse(localStorage.getItem(application.properties.currentCategory))
              localData[application.elements.randomArr[application.properties.step]].mistakes += 1;  
              localStorage.setItem(application.properties.currentCategory, JSON.stringify(localData))     
            }
            
            mistakeAudio.play();
            application.noGuess();
          }
         } 
  })
}

playRepeatBtn.addEventListener('click', function () {
    if (cards[0].classList.contains('cardCategory')) {
      this.classList.add('chooseCat');
      setTimeout(() => {
        this.classList.remove('chooseCat');
      }, 1000);
      return;
    }
    if (this.classList.contains('playing')) {
      application.elements.soundArr[application.elements.randomArr[application.properties.step]].play();
     } else {
     application.properties.play = true;
     this.classList.add('playing');
      setTimeout(()=> {
        application.elements.soundArr[application.elements.randomArr[application.properties.step]].play();
    }, 500)
  }
})

statistcBtn.addEventListener('click', function(){
    if (this.classList.contains('active')) {
      this.classList.remove('active');
      if (window.innerWidth < 400) {
        content.classList.remove('cuttered');
      }
      application.elements.content.removeChild(application.elements.content.lastChild);
    } else {
      if (window.innerWidth < 400) {
        content.classList.add('cuttered');
      }
      application.getStatistic(0, true);
      this.classList.add('active');
    }
})

switcher.addEventListener('click', function () {
  if (this.checked === false) {
      application.train();
  } else {
    application.play();
  }
})
window.addEventListener('resize', function(){
 if (window.innerWidth >= 400) {
  content.classList.remove('cuttered');
 }
  if (window.innerWidth < 400 && statistcBtn.classList.contains('active')) {
    content.classList.add('cuttered');
  }
})
