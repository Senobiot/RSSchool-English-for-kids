import {cardsCategories} from './cards';

const qty = cardsCategories.length;

const sideMenu = {
    elements: {
        sideMenuWrapper: null,
    },
    start() {
        this.elements.sideMenuWrapper = document.createElement("div");
        for (let index = 0; index <qty; index += 1) {
            const fragment = document.createDocumentFragment();
            const menuElement = document.createElement("div");
            if (index !== 0) {menuElement.classList.add("sideMenuBtn");
            } else { menuElement.classList.add("sideMenuBtn", "restart");}
            menuElement.textContent = cardsCategories[index] ;
            fragment.appendChild(menuElement);
            this.elements.sideMenuWrapper.appendChild(fragment);
        }

        const mask = document.createElement("div");
        mask.classList.add("mask");
        document.body.appendChild(mask);

        this.elements.sideMenuWrapper.classList.add("sideMenuWrapper");
        document.body.appendChild(this.elements.sideMenuWrapper);

    }

}
export {sideMenu};
