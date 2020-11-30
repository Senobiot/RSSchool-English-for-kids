import {cardsObject} from './cards';

const application = {
    elements: {
        statisticPanel: null,
        statisticBtn: null,
        statisticMistakesBlock: null,
        statisticMistakesCounter: null,
        statisticCorrectBlock: null,
        statisticCorrectCounter: null,
        statisticRepeatWordsBtn: null,
        repeatWordsArray: [],
        repeatWordsArrayCategories: [],
        content: null,
        cards: [],
        cardsReverse: [],
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
        currentCategory: '',
        repeatWords: false,
        sorted: false,
        sortedDirection: null,
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
            card.classList.add('card', 'avers');        
            img.classList.add('cardImg');
            titleCard.classList.add('cardTitle');
            rotateBtn.classList.add('cardRotateBtn', 'inactive');
            card.appendChild(img);
            card.appendChild(titleCard);
            const clone = card.cloneNode(true);
            clone.classList.add('reverse');
            clone.classList.remove('avers')
            card.appendChild(rotateBtn);
            cardWrapper.appendChild(card);
            cardWrapper.appendChild(clone);
            this.elements.content.appendChild(cardWrapper);
            this.elements.cards.push(card);
            this.elements.cardsReverse.push(clone);
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
                this.elements.cards[index].classList.remove('hiddenForRepeat');
                this.elements.cards[index].children[0].style.backgroundImage = `url(./img/cat_${index}.jpg)`;
                this.elements.cards[index].children[1].textContent = cardsObject[category][index];
                this.elements.soundArr = [];
            }
            this.properties.repeatWords = false;
            return
        }
        if (category === 20) {
            this.elements.soundArr = [];
            this.train();
            const currentRepeatWordArray = [];
            const IndexOfCategories = [];
            for (let i = 0; i < this.elements.repeatWordsArrayCategories.length; i += 1) {
                IndexOfCategories.push(cardsObject[0].indexOf(this.elements.repeatWordsArrayCategories[i]))            
            }
            
            for (let i = 0; i < this.elements.repeatWordsArray.length; i += 1) {
                for (let j = 0; j < cardsObject[IndexOfCategories[i]].length; j += 1) {
                   if (cardsObject[IndexOfCategories[i] + 1][j].word === this.elements.repeatWordsArray[i]) {
                    currentRepeatWordArray.push(cardsObject[IndexOfCategories[i] + 1][j]);
                   }                   
                }          
            }

            for (let index = 0; index < this.elements.cards.length; index += 1) {
                if (index > this.elements.repeatWordsArray.length - 1) {
                    this.elements.cards[index].classList.add('hiddenForRepeat');
                } else {
                    this.elements.cards[index].classList.remove('hiddenForRepeat');
                    const speech = new Audio;
                    speech.src = currentRepeatWordArray[index].audioSrc;
                    this.elements.soundArr.push(speech);
        
                    if (this.elements.cards[index].classList.contains('cardCategory')) this.elements.cards[index].classList.remove('cardCategory');
        
                    this.elements.cards[index].children[0].style.backgroundImage = `url(${currentRepeatWordArray[index].image})`;
                    this.elements.cardsReverse[index].children[0].style.backgroundImage = `url(${currentRepeatWordArray[index].image})`;
                    this.elements.cards[index].children[1].innerText = currentRepeatWordArray[index].word;
                    this.elements.cardsReverse[index].children[1].innerText =  currentRepeatWordArray[index].translation;
                    this.elements.cards[index].children[2].classList.remove('inactive');}

            }
            return
        }

        this.properties.repeatWords = false;
        
        if (this.elements.soundArr.length > 0) {
            this.elements.soundArr = [];
            this.train();
        }

        for (let index = 0; index < this.elements.cards.length; index += 1) {
            const speech = new Audio;
            speech.src = cardsObject[category][index].audioSrc;
            this.elements.soundArr.push(speech);

            if (this.elements.cards[index].classList.contains('cardCategory')) this.elements.cards[index].classList.remove('cardCategory');
            this.elements.cards[index].classList.remove('hiddenForRepeat');
            this.elements.cards[index].children[0].style.backgroundImage = `url(${cardsObject[category][index].image})`;
            this.elements.cardsReverse[index].children[0].style.backgroundImage = `url(${cardsObject[category][index].image})`;
            this.elements.cards[index].children[1].innerText = cardsObject[category][index].word;
            this.elements.cardsReverse[index].children[1].innerText =  cardsObject[category][index].translation;
            this.elements.cards[index].children[2].classList.remove('inactive');
        }
    },
    randomCards() {
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }
        let length;
        if (this.properties.repeatWords === true) {
            length = this.elements.repeatWordsArray.length;
        } else {
            length = this.elements.cards.length;
        }
        while (this.elements.randomArr.length < length) {
            const num = getRandom(0, length - 1);
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
        document.querySelector('.switcher').classList.remove('blocked')
        this.train();
        const rotateButtons = document.querySelectorAll('.cardRotateBtn')
        for (let index = 0; index < rotateButtons.length; index += 1) {
            rotateButtons[index].classList.add('inactive');
            
        }
        this.changeCategory(0);
    },
    getStatistic(category, open, sort) {
        const fragment = document.createDocumentFragment();
        const statisticTitle = document.createElement("div");
        const statisticReset = document.createElement("div");
        const statisticTitleHeader = document.createElement("div");
        this.statisticRepeatWordsBtn = document.createElement("div");
        statisticReset.innerText = 'Reset';
        statisticReset.classList.add('statisticResetBtn');
        statisticReset.addEventListener('click', () => {
            localStorage.clear();
            this.elements.content.removeChild(this.elements.content.lastChild);
            this.elements.statistic = [];
            this.createStatistic();
            this.getStatistic(0, true)
        });
        this.statisticRepeatWordsBtn.innerText = 'Repeat difficult words';
        this.statisticRepeatWordsBtn.classList.add('statisticRepeatWordsBtn');
        statisticTitleHeader.classList.add('statisticTitleHeader');
        statisticTitleHeader.textContent = `Your statistic on in ${ category ? cardsObject[0][category] : cardsObject[0][0]} category`;
        statisticTitle.classList.add("statisticTitle");
       
        statisticTitle.appendChild(statisticReset);
        statisticTitle.appendChild(statisticTitleHeader);
        statisticTitle.appendChild(this.statisticRepeatWordsBtn);
        this.statisticRepeatWordsBtn.addEventListener('click', () => {
            this.elements.content.removeChild(this.elements.content.lastChild);
            this.elements.statisticBtn.classList.remove("active");
            this.repeatWords();
        })

        fragment.appendChild(statisticTitle);
  
        const statisticCategories = document.createElement("div");
        statisticCategories.classList.add("statisticCategories");
        const categories = cardsObject[0];
            for (let i = 0; i <= categories.length - 1; i += 1) {
                    const menuElement = document.createElement("div");
                    menuElement.classList.add("statisticCategoriesBtn");
                    menuElement.textContent = categories[i];
                    menuElement.addEventListener('click', ()=> {
                        document.querySelector(".statistic").remove();	
                        this.elements.statistic = null;
                        this.getStatistic(i, true)
                    })
                    statisticCategories.appendChild(menuElement);
            }
  
            fragment.appendChild(statisticCategories);
  
        const statisticHeader = document.createElement("div");	
            statisticHeader.classList.add("statisticHeader");
           
          for (let i = 0; i <= 5; i += 1) {
                    const menuElement = document.createElement("div");
                    if (i === 0)  {
                        menuElement.textContent = "word";
                        menuElement.classList.add('statisticHeaderWord');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            // this.properties.sorted = 'word';
                            this.getStatistic(category, true, 'word')
                        })
                    }
                    if (i === 1)  {
                        menuElement.textContent = "translation";
                        menuElement.classList.add('statisticHeaderTranslation');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            this.getStatistic(category, true, 'translation')
                        })
                    }
                    if (i === 2)  {
                        menuElement.textContent = "trained";
                        menuElement.classList.add('statisticHeaderTrained');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            this.getStatistic(category, true, 'trained')
                        })
                    }
                    if (i === 3)  {
                        menuElement.textContent = "correct";
                        menuElement.classList.add('statisticHeaderCorrect');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            this.getStatistic(category, true, 'correct')
                        })
                    }
                    if (i === 4)  {
                        menuElement.textContent = "mistakes";
                        menuElement.classList.add('statisticHeaderMistakes');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            this.getStatistic(category, true, 'mistakes')
                        })
                    }
                    if (i === 5) {
                        menuElement.textContent = "hits, %";
                        menuElement.classList.add('statisticHeaderHits');
                        menuElement.addEventListener('click', ()=> {
                            document.querySelector(".statistic").remove();	
                            this.elements.statistic = null;
                            this.getStatistic(category, true, 'hits')
                        })
                    }
                    statisticHeader.appendChild(menuElement);
            }
            fragment.appendChild(statisticHeader);

            const statisticGrid = document.createElement("div");
            statisticGrid.classList.add("statisticGrid");
            const statisticArray = JSON.parse(localStorage.getItem(categories[category]));


            
            if (sort) {
                if (this.properties.sorted === sort) {
                    if (sort === 'hits') {
                    statisticArray.sort((a,b) => {
                        if ((a.correct + a.mistakes) > 0 && (b.correct + b.mistakes) > 0) {
                            if (a.correct / (a.correct + a.mistakes) > b.correct / (b.correct + b.mistakes)) {
                                return -1;
                            } if (b.correct / (b.correct + b.mistakes) > a.correct / (a.correct + a.mistakes)) {
                                return 1;
                            } 
                                return 0;
                            
                        } if ((a.correct + a.mistakes) > 0) {
                            return -1;
                        } if ((b.correct + b.mistakes) > 0) {
                            return 1;
                        } 
                            return null;
                        
                    })    
                } else {     
                    statisticArray.sort(function (a,b) {
                        if ( a[sort] > b[sort] ){
                          return -1;
                        }
                        if ( b[sort] > a[sort] ){
                          return 1;
                        }
                        return 0;
                      });

                    // statisticArray.sort((a,b) => (a[sort] > b[sort]) ? -1 : ((b[sort] > a[sort]) ? 1 : 0)); 
                }
                this.properties.sorted = false;
                } else {
                    if (sort === 'hits') {
                        statisticArray.sort(function (a,b) {
                            if ((a.correct + a.mistakes) > 0 && (b.correct + b.mistakes) > 0) {
                                if (a.correct / (a.correct + a.mistakes) > b.correct / (b.correct + b.mistakes)) {
                                    return 1;
                                } if (b.correct / (b.correct + b.mistakes) > a.correct / (a.correct + a.mistakes)) {
                                    return -1;
                                } 
                                    return 0;        
                            } if ((a.correct + a.mistakes) > 0) {
                                return 1;
                            } if ((b.correct + b.mistakes) > 0) {
                                return -1;
                            }
                                return 0;
                        })            
                    } else {
                        statisticArray.sort(function (a,b) {
                            if ( a[sort] > b[sort] ){
                              return 1;
                            }
                            if ( b[sort] > a[sort] ){
                              return -1;
                            }
                            return 0;
                          });

                        // statisticArray.sort((a,b) => (a[sort] > b[sort]) ? 1 : ((b[sort] > a[sort]) ? -1 : 0)); 
                    }
                    this.properties.sorted = sort;
                }          
            }

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
                            cell.textContent = '-'};
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
        repeatWords(){
             let statisticArray; 
             const parsedArray = [];
            for (let i = 0; i < cardsObject[0].length; i += 1) {
                statisticArray = JSON.parse(localStorage.getItem(cardsObject[0][i]));
                for (let j = 0; j < cardsObject[0].length; j += 1) {
                    parsedArray.push(`${statisticArray[j].mistakes  }+${  statisticArray[j].word  }#${  cardsObject[0][i]}`);
                }             
            }
            const sortConstruct = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'}); 
            const clearArray = parsedArray.sort(sortConstruct.compare).splice(-cardsObject[0].length);
            this.elements.repeatWordsArray = clearArray.filter(a=> !a.match(/^0/)).map(a => a.replace(/\d*\+/, "").replace(/#.*/, ""));  
            this.elements.repeatWordsArrayCategories = clearArray.filter(a=> !a.match(/^0/)).map(a => a.replace(/.*#/, ""));
            document.querySelector('.switcher').checked = false;
            if (this.elements.repeatWordsArray.length === 0) {
                document.querySelector('.switcher').classList.add('blocked');
            }

            this.changeCategory(20)
            this.properties.repeatWords = true;
        },
}

export default application;