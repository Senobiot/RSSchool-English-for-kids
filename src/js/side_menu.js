const sideMenu = {
    elements: {
        sideMenuWrapper: null,
    },

    start(qtyCategories) {

        this.elements.sideMenuWrapper = document.createElement("div");

        for (let index = 0; index <qtyCategories; index++) {
            let fragment = document.createDocumentFragment();
            let menuElement = document.createElement("div");
            index !== 0 ? menuElement.classList.add("sideMenuBtn"):
            menuElement.classList.add("sideMenuBtn", "restart");
            menuElement.textContent = "Category";
            fragment.appendChild(menuElement);
            this.elements.sideMenuWrapper.appendChild(fragment);
        }

        let fragment = document.createDocumentFragment();
        let mask = document.createElement("div");
        mask.classList.add("mask");
        document.body.appendChild(mask);

        this.elements.sideMenuWrapper.classList.add("sideMenuWrapper");
        document.body.appendChild(this.elements.sideMenuWrapper);

    }

}
export {sideMenu};
