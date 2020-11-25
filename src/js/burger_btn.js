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

document.body.appendChild(burgerBtn);
export {burgerBtn}
