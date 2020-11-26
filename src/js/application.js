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
        cardsPlaySounds: [],
        cardsPlayOrder: [],
        winPopup: null,
    },
    properties: {
        play: false,
        mistakes: 0,
        correctAnswers: 0,
        step: 0,
    },

    start() {
        if (this.elements.content) {
            this.elements.content = null;
            document.body.removeChild(this.elements.content);
        }
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
            titleCard.textContent = cardsObject[0][index];
            card.classList.add('card', 'cardCategory');        
            img.classList.add('cardImg');
            titleCard.classList.add('cardTitle');
            rotateBtn.classList.add('cardRotateBtn', 'inactive');
            card.appendChild(img);
            card.appendChild(titleCard);
            card.appendChild(rotateBtn);
            this.elements.content.appendChild(card);
            this.elements.cards.push(card);
        }
    },
    changeCategory(category) {

        for (let index = 0; index < this.elements.cards.length; index += 1) {
            const card = this.elements.cards[index];
            const img = this.elements.cards[index].children[0];
            const title = this.elements.cards[index].children[1];
            const rotateBtn = this.elements.cards[index].children[2];
            const speech = new Audio;
            speech.src = cardsObject[category + 1][index].audioSrc;
            this.elements.cardsPlaySounds.push(speech);
            if (this.elements.cards[index].classList.contains('cardCategory')) {
                this.elements.cards[index].classList.remove('cardCategory')};
            card.addEventListener('click', () => {
                if(!this.properties.play && !card.classList.contains('rotated')) {
                    speech.currentTime = 0;
                    speech.play();
                }
            });
            // title.addEventListener('click', () => {
            //     if(!this.properties.play) {
            //         speech.currentTime = 0;
            //         speech.play();
            //     }
            // });

            img.style.backgroundImage = `url(${cardsObject[category + 1][index].image})`;
            title.innerText = cardsObject[category + 1][index].word;
            rotateBtn.classList.remove('inactive');
            rotateBtn.addEventListener('click', function (event) {
                event.stopImmediatePropagation();
                card.classList.add('rotated');
                rotateBtn.classList.add('inactive');
                setTimeout(function(){
                    title.innerText = cardsObject[category + 1][index].translation;

                    }, 500)
            });
            card.addEventListener('mouseleave', function (){
                if (this.classList.contains('rotated'))
                setTimeout(function(){
                    card.classList.remove('rotated');
                    rotateBtn.classList.remove('inactive');
                    setTimeout(function(){
                        title.innerText = cardsObject[category + 1][index].word
                       }, 200)
                }, 600)   
           });
        }
    },
    randomCards() {
        function getRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min; 
        }

        while (this.elements.cardsPlayOrder.length < this.elements.cards.length) {
            const num = getRandom(0, this.elements.cards.length - 1);
            if (this.elements.cardsPlayOrder.indexOf(num) === -1) this.elements.cardsPlayOrder.push(num);
        }
    },
    play() {
        this.randomCards();
        const correct = this.elements.statisticCorrectBlock;
        const mistake = this.elements.statisticMistakesBlock;
        const playBtn = this.elements.playRepeatBtn;
        const sounds = this.elements.cardsPlaySounds;
        const randCards = this.elements.cardsPlayOrder;
        const cards = this.elements.cards;
        const endgame = this.win;
        playBtn.classList.remove('inactive');

        playBtn.addEventListener('click', function startPlayFunc (event){
            event.stopImmediatePropagation();
            if (this.classList.contains('playing')) {
                sounds[randCards[application.properties.step]].play();
            } else {
                correct.classList.remove('inactive');
                mistake.classList.remove('inactive');  
                for (let index = 0; index < cards.length; index+= 1) {
                     cards[index].classList.add('play');
                }
                this.classList.add('playing');
                application.properties.play = true;
                guessFunc ();
                setTimeout(() => {
                    sounds[randCards[0]].play()}, 500);
            }
        })

            function guessFunc () {
                for (let index = 0; index < cards.length; index+= 1) {
                    cards[index].addEventListener('click', function (event) {
                        event.stopImmediatePropagation();
                    if (cards.indexOf(this) === randCards[application.properties.step] && this.classList.contains("play")) {
                        application.properties.correctAnswers += 1;
                        application.elements.statisticCorrectCounter.innerText = application.properties.correctAnswers;
                        this.classList.add('catched');
                        if (application.properties.step < sounds.length - 1) {
                            application.properties.step += 1;
                            let star = document.createElement('div')
                            star.classList.add('star');
                            application.elements.statisticCorrectBlock.appendChild(star)
                            setTimeout(() => {
                            sounds[randCards[application.properties.step]].play();
                        }, 1000);   
                        } else {
                            endgame();
                    }
                } else {
                    application.properties.mistakes += 1;
                    application.elements.statisticMistakesCounter.innerText = application.properties.mistakes;
                    let star = document.createElement('div')
                    star.classList.add('greyStar');
                    application.elements.statisticMistakesBlock.appendChild(star)
                }
            })}
            }
    },
    train() {
        this.properties.play = false;
        this.elements.cardsPlayOrder = [];
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
        const content = document.querySelector('.content');
        application.properties.step = 0;
        application.elements.playRepeatBtn.classList.remove('playing');
        application.elements.playRepeatBtn.classList.add('inactive');
        setTimeout(() => {
           content.classList.add('disappear'); 
        }, 1000);
        const winpopup = document.createElement('div');
        application.properties.mistakes > 1 ? winpopup.classList.add('winner') : winpopup.classList.add('loser')
        document.body.appendChild(winpopup);
    },
}





export {application};