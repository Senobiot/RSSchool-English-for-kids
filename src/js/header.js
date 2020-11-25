let burgerBtn = document.createElement('div');
burgerBtn.classList.add('burgerBtn');
burgerBtn.addEventListener('click', function(){
    this.classList.toggle('active')
})

let line1 = document.createElement('div');
let line2 = document.createElement('div');
let line3 = document.createElement('div');

burgerBtn.appendChild(line1);
burgerBtn.appendChild(line2);
burgerBtn.appendChild(line3);

let switcher = document.createElement('input');
switcher.type = "checkbox";
switcher.classList.add('switcher');

let title = document.createElement('h1');
title.classList.add('appTitle');
title.textContent = "English for kids";

let header = document.createElement('div');
header.classList.add('header');

header.appendChild(burgerBtn);
header.appendChild(title);
header.appendChild(switcher);

document.body.appendChild(header);

export {header}





