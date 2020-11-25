import {cardsObject} from './cards';

const application = {
    elements: {
        stars: null,
        content: null,
        cards: [],
        cardsPlaySounds: [],
        cardsPlayOrder: [],
        winPopup: null,
    },
    properties: {
        play: false,
        mistakes: 0,
        correctAnswers: 0,
    },

    start() {
        if (this.elements.content) {
            this.elements.content = null;
            document.body.removeChild(this.elements.content);
        }

        this.elements.content = document.createElement('div');
        this.elements.content.classList.add('content');
        document.body.appendChild(this.elements.content);

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
            img.addEventListener('click', () => {
                if(!this.properties.play) {
                    speech.currentTime = 0;
                    speech.play();
                }
            });
            title.addEventListener('click', () => {
                if(!this.properties.play) {
                    speech.currentTime = 0;
                    speech.play();
                }
            });

            img.style.backgroundImage = `url(${cardsObject[category + 1][index].image})`;
            title.innerText = cardsObject[category + 1][index].word;
            rotateBtn.classList.remove('inactive');
            rotateBtn.addEventListener('click',() => {
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
        this.properties.play = true;
        const sounds = this.elements.cardsPlaySounds;
        const randCards = this.elements.cardsPlayOrder;
        const {cards} = this.elements;
        let step = 0;
        const endgame = this.win;
        setTimeout(() => {
           sounds[randCards[step]].play();
        }, 1000);     

        for (let index = 0; index < this.elements.cards.length; index+= 1) {
            this.elements.cards[index].classList.add('play');
            this.elements.cards[index].addEventListener('click', function() {
                if (cards.indexOf(this) === randCards[step]) {
                    this.classList.add('catched');
                    application.properties.correctAnswers += 1;
                    if (step < sounds.length - 1) {
                        step += 1;
                        setTimeout(() => {
                        sounds[randCards[step]].play();
                     }, 1000);   
                    } else {
                        endgame();
                    }
                } else {application.properties.mistakes += 1}
            })
        }
    },
    train() {
        this.properties.play = false;
        this.elements.cardsPlayOrder = [];
        for (let index = 0; index < this.elements.cards.length; index+= 1) {
            this.elements.cards[index].classList.remove('play', 'catched');
        }
    },
    win() {
        const content = document.querySelector('.content');
        content.classList.add('disappear');
        const winpopup = document.createElement('div');
        application.properties.mistakes > 1 ? winpopup.classList.add('winner') : winpopup.classList.add('loser')
        document.body.appendChild(winpopup);
        console.log(application.properties.mistakes)
        console.log(application.properties.correctAnswers)
    }
}





export {application};