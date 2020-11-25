const burgerBtn = document.createElement('div');
burgerBtn.classList.add('burgerBtn');
burgerBtn.addEventListener('click', function(){
    this.classList.toggle('active')
})

const line1 = document.createElement('div');
const line2 = document.createElement('div');
const line3 = document.createElement('div');

burgerBtn.appendChild(line1);
burgerBtn.appendChild(line2);
burgerBtn.appendChild(line3);

const switcher = document.createElement('input');
switcher.type = "checkbox";
switcher.classList.add('switcher');

const title = document.createElement('h1');
title.classList.add('appTitle');
title.textContent = "English for kids";

const header = document.createElement('div');
header.classList.add('header');

header.appendChild(burgerBtn);
header.appendChild(title);
header.appendChild(switcher);

document.body.appendChild(header);

export {header}





