'use script';

const container = document.querySelector('.slider__container');
const prev = document.querySelector('.slider__arr-prev');
const next = document.querySelector('.slider__arr-next');
const slider = document.querySelector('.slider');
const wrapper = document.querySelector('.slider__wrapper');
const width = window.getComputedStyle(wrapper).width;
const slidesInner = document.querySelector('.slider__inner');
const slides = document.querySelectorAll('.slide');

let slideId = 1;
let slidePx = 0;

function removeLetters(num) {
    return +num.replace(/\D/g, '');
}

slidesInner.style.width = 100 * slides.length + '%';

slides.forEach(item => item.style.width = width);

const blockCounter = document.createElement('div');
const slidesCounter = [];

blockCounter.classList.add('counter__block');
container.append(blockCounter);

for (let i = 0; i < slides.length; i++) {
    const counter = document.createElement('span');

    counter.classList.add('counter');
    counter.setAttribute('data-slide-i', i + 1);
    counter.textContent = i + 1;

    if (i == 0) {
        counter.classList.add('active');
    }

    blockCounter.append(counter);
    
    slidesCounter.push(counter);
}

next.addEventListener('click', () => {
    if (slidePx == removeLetters(width) * (slides.length - 1)) {
        slidePx = 0;
    } else {
        slidePx += removeLetters(width);
    }

    slidesInner.style.transform = `translateX(-${slidePx}px)`;

    if (slideId == slides.length) {
        slideId = 1;
    } else {
        slideId++;
    }

    slidesCounter.forEach(item => item.classList.remove('active'));
    slidesCounter[slideId - 1].classList.add('active');
});

prev.addEventListener('click', () => {
    if (slidePx == 0) {
        slidePx = removeLetters(width) * (slides.length - 1);
    } else {
        slidePx -= removeLetters(width);
    }

    slidesInner.style.transform = `translateX(-${slidePx}px)`;

    if (slideId == 1) {
        slideId = slides.length;
    } else {
        slideId--;
    }

    slidesCounter.forEach(item => item.classList.remove('active'));
    slidesCounter[slideId - 1].classList.add('active');
});

slidesCounter.forEach(item => {
    item.addEventListener('click', (e) => {
        const slidesAttribute = e.target.getAttribute('data-slide-i');

        slideId = slidesAttribute;
        slidePx = removeLetters(width) * (slidesAttribute - 1);

        slidesInner.style.transform = `translateX(-${slidePx}px)`;

        slidesCounter.forEach(item => item.classList.remove('active'));
        slidesCounter[slideId - 1].classList.add('active');
    });
});
