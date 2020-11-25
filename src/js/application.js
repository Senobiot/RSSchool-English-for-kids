import {cardsObject} from './cards';
const application = {
    elements: {
        content: null,
        cards: [],
    },
    start(category) {
        this.elements.content = document.createElement('div');
        this.elements.content.classList.add('content');
        document.body.appendChild(this.elements.content);

        for (let index = 0; index < cardsObject[category].length; index++) {
            let card = document.createElement('div');
            let img = document.createElement('img');
            let titleCard = document.createElement('p');
            titleCard.textContent = cardsObject[category][index]
            // img.src = cardsObject[category][index]
            category === 0 ? card.classList.add('card', 'cardCategory'):
            card.classList.add('card');
            img.classList.add('cardImg');
            titleCard.classList.add('cardTitle');
            card.appendChild(img);
            card.appendChild(titleCard);
            this.elements.content.appendChild(card);
            this.elements.cards.push(card);
        }
    },
    changeCategory(category) {
        for (let index = 0; index < this.elements.cards.length; index++) {
        this.elements.cards[index].classList.remove('cardCategory');
        let speech = new Audio;
        speech.src = cardsObject[category + 1][index].audioSrc;
        this.elements.cards[index].addEventListener('click',function () {speech.currentTime = 0; speech.play()})
        this.elements.cards[index].children[0].src = cardsObject[category + 1][index].image
        this.elements.cards[index].children[1].innerText = cardsObject[category + 1][index].word
        }
    }

}





export {application};