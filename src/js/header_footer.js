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

const header = document.createElement('header');
header.classList.add('header');

header.appendChild(burgerBtn);
header.appendChild(title);
header.appendChild(switcher);

 const footer = document.createElement('footer');
 footer.classList.add('footer');
 const authorLink = document.createElement('a');
 authorLink.classList.add('footer-author')
 authorLink.href = 'https://github.com/senobiot';
 authorLink.textContent = 'Created by Senobiot';
 const year = document.createElement('div');
 year.classList.add('footer-year');
 year.textContent = '© 2020'
 const rsSchoolLogo = document.createElement('img');
 rsSchoolLogo.classList.add('footer-rs-logo')
 rsSchoolLogo.alt = 'RS School Logo';
 rsSchoolLogo.src = "./img/rs_school_js.svg";

 const rsSchoolLink = document.createElement('a');
 rsSchoolLink.classList.add('footer-rs-logo')
 rsSchoolLink.href = 'https://rs.school/js/';
 rsSchoolLink.appendChild(rsSchoolLogo)

 footer.appendChild(year);
 footer.appendChild(rsSchoolLink);
 footer.appendChild(authorLink);

document.body.appendChild(header);
document.body.appendChild(footer);

export default header;





