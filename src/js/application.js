import {cardsObject} from './cards';

const application = {
    elements: {
        statisticPanel: null,
        statisticBtn: null,
        statisticMistakesBlock: null,
        statisticMistakesCounter: null,
        statisticCorrectBlock: null,
        statisticCorrectCounter: null,
        content: null,
        cards: [],
        playRepeatBtn: [],
        soundArr: [],
        randomArr: [],
        winPopup: null,
        statistic: []
    },
    properties: {
        play: false,
        mistakes: 0,
        correctAnswers: 0,
        step: 0,
        currentCategory: ''
    },

    start() {

        this.elements.statisticPanel = document.createElement('div');
        this.elements.statisticPanel.classList.add('statisticPanel');

        this.elements.statisticBtn = document.createElement('button');
        this.elements.statisticBtn.classList.add('statisticBtn');
        this.elements.statisticBtn.textContent = 'statistic';
        
        this.elements.statisticMistakesBlock = document.createElement('div');
        this.elements.statisticMistakesBlock.classList.add('statisticMistakesBlock', 'inactive');
        this.elements.statisticMistakesCounter = document.createElement('div');
        this.elements.statisticMistakesCounter.classList.add('statisticMistakesCounter');
        this.elements.statisticMistakesCounter.textContent = this.properties.mistakes;
        this.elements.statisticMistakesBlock.appendChild(this.elements.statisticMistakesCounter)

        this.elements.statisticCorrectBlock = document.createElement('div');
        this.elements.statisticCorrectBlock.classList.add('statisticCorrectBlock', 'inactive');
        this.elements.statisticCorrectCounter = document.createElement('div');
        this.elements.statisticCorrectCounter.classList.add('statisticCorrectCounter');
        this.elements.statisticCorrectCounter.textContent = this.properties.correctAnswers;
        this.elements.statisticCorrectBlock.appendChild(this.elements.statisticCorrectCounter)

        this.elements.statisticPanel.appendChild(this.elements.statisticMistakesBlock);
        this.elements.statisticPanel.appendChild(this.elements.statisticBtn);
        this.elements.statisticPanel.appendChild(this.elements.statisticCorrectBlock);

        document.body.appendChild(this.elements.statisticPanel);

        this.elements.content = document.createElement('div');
        this.elements.playRepeatBtn = document.createElement('div');
        this.elements.content.classList.add('content');
        this.elements.playRepeatBtn.classList.add('playRepeatBtn', 'inactive');

        document.body.appendChild(this.elements.content);
        document.body.appendChild(this.elements.playRepeatBtn);
        for (let index = 0; index < cardsObject[0].length; index += 1) {
            const card = document.createElement('div');
            const img = document.createElement('div');
            const rotateBtn = document.createElement('div');        
            const titleCard = document.createElement('div');
            const cardWrapper = document.createElement('div');

            cardWrapper.classList.add("cardWrapper");
            titleCard.textContent = cardsObject[0][index];
            card.classList.add('card');        
            img.classList.add('cardImg');
            titleCard.classList.add('cardTitle');
            rotateBtn.classList.add('cardRotateBtn', 'inactive');
            card.appendChild(img);
            card.appendChild(titleCard);
            card.appendChild(rotateBtn);
            cardWrapper.appendChild(card);
            this.elements.content.appendChild(cardWrapper);
            this.elements.cards.push(card);
        }
        this.createStatistic();
        this.changeCategory(0);
    },
    createStatistic() {
        if (!localStorage.getItem(cardsObject[0][0])) {
            for (let i = 1; i <= cardsObject[0].length; i += 1) {
                for (let j = 0; j < cardsObject[1].length; j += 1) {
                    const statObj = {word: '', translation: '', trained: '', correct: '', mistakes: '', hits: '' };
                    statObj.word = cardsObject[i][j].word;
                    statObj.translation = cardsObject[i][j].translation;
                    statObj.trainded = 0;
                    statObj.trained = 0;
                    statObj.correct = 0;
                    statObj.mistakes = 0;
                    statObj.hits = 0;
                    this.elements.statistic.push(statObj);
                }
                localStorage.setItem(`${cardsObject[0][i - 1]}`, JSON.stringify(this.elements.statistic));
                this.elements.statistic = []; 
            }
        } 
    },
    changeCategory(category) {
        if (category === 0) {
            for (let index = 0; index < cardsObject[0].length; index += 1) {
                this.elements.cards[index].classList.add('cardCategory');
                this.elements.cards[index].children[0].style.backgroundImage = `url(./img/cat_${index}.jpg)`;
                this.elements.cards[index].children[1].textContent = cardsObject[category][index];
                this.elements.soundArr = [];
            }
            return
        }
        if (this.elements.soundArr.length > 0) {
            this.elements.soundArr = [];
            this.train();
        }

        for (let index = 0; index < this.elements.cards.length; index += 1) {
            const card = this.elements.cards[index];
            const img = this.elements.cards[index].children[0];
            const title = this.elements.cards[index].children[1];
            const rotateBtn = this.elements.cards[index].children[2];
            const speech = new Audio;
            speech.src = cardsObject[category][index].audioSrc;
            this.elements.soundArr.push(speech);

            if (card.classList.contains('cardCategory')) card.classList.remove('cardCategory');

            img.style.backgroundImage = `url(${cardsObject[category][index].image})`;
            title.innerText = cardsObject[category][index].word;
            rotateBtn.classList.remove('inactive');
            rotateBtn.addEventListener('click', function () {
                card.classList.add('rotated');
                rotateBtn.classList.add('inactive');
                setTimeout(function(){
                    title.innerText = cardsObject[category][index].translation;
                    img.style.transform = 'rotateY(180deg)'
                    title.style.transform = 'rotateY(180deg)'
                    }, 300)
            });
            card.parentElement.addEventListener('mouseleave', function (){
            if (this.firstChild.classList.contains('rotated'))
                setTimeout(function(){
                    title.innerText = cardsObject[category][index].word
                    img.style.transform = 'none';
                    img.style.transform = null;
                    title.style.transform = 'none';
                    title.style.transform = null;
                    }, 1300)
           });
        }
    },
    randomCards() {
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }

        while (this.elements.randomArr.length < this.elements.cards.length) {
            const num = getRandom(0, this.elements.cards.length - 1);
            if (this.elements.randomArr.indexOf(num) === -1) this.elements.randomArr.push(num);
        }
    },

    play() {
        this.randomCards();       
        for (let index = 0; index < this.elements.cards.length; index += 1) {
            this.elements.cards[index].classList.add('play');
         }
        this.elements.playRepeatBtn.classList.remove('inactive');
        this.elements.statisticMistakesBlock.classList.remove('inactive');
        this.elements.statisticCorrectBlock.classList.remove('inactive');     
    },

    guess() {
        const star = document.createElement('div');
        star.classList.add('star');
        this.properties.step += 1;
        this.properties.correctAnswers += 1;
        this.elements.statisticCorrectBlock.appendChild(star);
        this.elements.statisticCorrectCounter.innerText = this.properties.correctAnswers;
    },

    noGuess() {
        const star = document.createElement('div');
        star.classList.add('starGrey');
        this.properties.mistakes += 1;
        this.elements.statisticMistakesBlock.appendChild(star);
        this.elements.statisticMistakesCounter.innerText = this.properties.mistakes;
    },

    train() {
        this.properties.play = false;
        this.elements.randomArr = [];
        this.properties.step = 0;
        this.properties.mistakes = 0;
        this.properties.correctAnswers = 0;
        this.elements.statisticCorrectCounter.innerText = this.properties.correctAnswers;
        this.elements.statisticMistakesCounter.innerText = this.properties.mistakes;
        this.elements.playRepeatBtn.classList.add('inactive');
        this.elements.playRepeatBtn.classList.remove('playing');
        this.elements.statisticCorrectBlock.classList.add('inactive');
        this.elements.statisticMistakesBlock.classList.add('inactive');
        for (let index = 0; index < this.elements.cards.length; index+= 1) {
            this.elements.cards[index].classList.remove('play', 'catched');
         }
         while (this.elements.statisticCorrectBlock.childNodes.length > 1) {
            this.elements.statisticCorrectBlock.removeChild(this.elements.statisticCorrectBlock.lastChild);
         }
         while (this.elements.statisticMistakesBlock.childNodes.length > 1) {
            this.elements.statisticMistakesBlock.removeChild(this.elements.statisticMistakesBlock.lastChild);
         }
    },
    win() {
        this.properties.step = 0;
        this.properties.play = false;
        this.elements.playRepeatBtn.classList.remove('playing');
        this.elements.playRepeatBtn.classList.add('inactive');
        const winnerAudio = new Audio;
        const loserAudio = new Audio;
        winnerAudio.src = './audio/win.mp3';
        loserAudio.src = './audio/fail.mp3';

        setTimeout(() => {
            this.elements.content.classList.add('disappear');
        }, 1000);
        const winpopup = document.createElement('div');
        if (this.properties.mistakes === 0) {
            winpopup.classList.add('winpopup', 'winner');
            winpopup.textContent = `Congratulation! You haven't made any mistakes!`;
        } else {
            winpopup.classList.add('winpopup', 'loser');
            winpopup.textContent = `Not bad, but you made ${this.properties.mistakes} mistakes. Try again!`
        } 
       
        setTimeout(() => {
            document.body.appendChild(winpopup);
                if (winpopup.classList.contains("winner")) {
                    winnerAudio.play();
                } else {
                    loserAudio.play();
                }
        }, 3000);
        setTimeout(() => {
            document.body.removeChild(winpopup);
            this.elements.content.classList.remove('disappear');
            this.restart();
        }, 6000);
    },
    restart() {
        document.querySelector('.switcher').checked = false;
        this.train();
        const rotateButtons = document.querySelectorAll('.cardRotateBtn')
        for (let index = 0; index < rotateButtons.length; index += 1) {
            rotateButtons[index].classList.add('inactive');
            
        }
        this.changeCategory(0);
    },
    getStatistic(category, open) {
        const fragment = document.createDocumentFragment();
        const statisticTitle = document.createElement("div");
        statisticTitle.classList.add("statisticTitle")
        statisticTitle.textContent = `Your statistic on ${cardsObject[0][0]} category`;
        fragment.appendChild(statisticTitle);
  
        const statisticCategories = document.createElement("div");
        statisticCategories.classList.add("statisticCategories")
        const categories = cardsObject[0];
            for (let i = 0; i <= categories.length - 1; i += 1) {
                    const menuElement = document.createElement("div");
                    menuElement.classList.add("statisticCategoriesBtn");
                    menuElement.textContent = categories[i];
                    menuElement.addEventListener('click', ()=> {
                        document.querySelector(".statistic").remove();	
                        this.elements.statistic = null;
                        this.getStatistic(i, true)
                        document.querySelector(".statisticTitle").textContent = `Your statistic in ${categories[i]} category`;
                    })
                    statisticCategories.appendChild(menuElement);
            }
  
            fragment.appendChild(statisticCategories);
  
        const statisticHeader = document.createElement("div");	
            statisticHeader.classList.add("statisticHeader");
           
          for (let i = 0; i <= 5; i += 1) {
                    const menuElement = document.createElement("div");
                    if (i === 0)  menuElement.textContent = "word";
                    if (i === 1)  menuElement.textContent = "translation";
                    if (i === 2)  menuElement.textContent = "trained";
                    if (i === 3)  menuElement.textContent = "correct";
                    if (i === 4)  menuElement.textContent = "mistakes";
                    if (i === 5) menuElement.textContent = "hits, %";
                    statisticHeader.appendChild(menuElement);
            }
            fragment.appendChild(statisticHeader);

        const statisticGrid = document.createElement("div");
            statisticGrid.classList.add("statisticGrid");
        const statisticArray = JSON.parse(localStorage.getItem(categories[category]));
  
            for (let i = 0; i < this.elements.cards.length ; i += 1) {
                const menuElement = document.createElement("div");
                menuElement.classList.add("word");
                for (let j = 0; j <= 5; j += 1) {
                    const cell = document.createElement("div");
                    if (j === 0) cell.textContent = statisticArray[i].word;
                    if (j === 1) cell.textContent = statisticArray[i].translation;
                    if (j === 2) cell.textContent = statisticArray[i].trained;
                    if (j === 3) cell.textContent = statisticArray[i].correct;
                    if (j === 4) cell.textContent = statisticArray[i].mistakes;
                    if (j === 5) {
                        const hint = statisticArray[i].mistakes + statisticArray[i].correct;
                        if (hint > 0) {
                            cell.textContent = ((statisticArray[i].correct / hint)*100).toFixed(2);
                        }  else {
                            cell.textContent = 0};
                    } 
                    menuElement.appendChild(cell);
                }
                statisticGrid.appendChild(menuElement);
            }
  
            fragment.appendChild(statisticGrid) 
 
          this.elements.statistic = document.createElement("div");
          if (open) {this.elements.statistic.classList.add("statistic")}
              else {this.elements.statistic.classList.add("statistic", "inactive")};
          this.elements.statistic.appendChild(fragment);
          this.elements.content.appendChild(this.elements.statistic);
  
        },
}

export default application;