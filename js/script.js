(function() {

    function initSlider() {
        createCounterBlock();
        arrowNextSlide();
        arrowPrevSlide();
        activeCounterBlock();
    }
 
    const wrapper = document.querySelector('.slider__wrapper');
    const width = window.getComputedStyle(wrapper).width;
    const slidesInner = document.querySelector('.slider__inner');
    const slides = document.querySelectorAll('.slide');

    let activeSlide = 1;
    let slideOffsetX = 0;

    slidesInner.style.width = 100 * slides.length + '%';

    slides.forEach(item => item.style.width = width);

    const slidesCounter = [];

    function createCounterBlock() {
        const container = document.querySelector('.slider__container');
        const blockCounter = document.createElement('div');
        
        blockCounter.classList.add('counter__block');
        container.append(blockCounter);

        for (let i = 0; i < slides.length; i++) {
            const counter = document.createElement('span');
        
            counter.classList.add('counter');
            counter.textContent = i + 1;
        
            if (i == 0) {
                counter.classList.add('active');
            }
        
            blockCounter.append(counter);
            
            slidesCounter.push(counter);
        }
    }

    function arrowNextSlide() {
        const next = document.querySelector('.slider__arr-next');

        next.addEventListener('click', () => {
            if (slideOffsetX == parseInt(width) * (slides.length - 1)) {
                slideOffsetX = 0;
            } else {
                slideOffsetX += parseInt(width);
            }
        
            slidesInner.style.transform = `translateX(-${slideOffsetX}px)`;
        
            if (activeSlide == slides.length) {
                activeSlide = 1;
            } else {
                activeSlide++;
            }
        
            slidesCounter.forEach(item => item.classList.remove('active'));
            slidesCounter[activeSlide - 1].classList.add('active');
        });
    }

    function arrowPrevSlide() {
        const prev = document.querySelector('.slider__arr-prev');

        prev.addEventListener('click', () => {
            if (slideOffsetX == 0) {
                slideOffsetX = parseInt(width) * (slides.length - 1);
            } else {
                slideOffsetX -= parseInt(width);
            }
        
            slidesInner.style.transform = `translateX(-${slideOffsetX}px)`;
        
            if (activeSlide == 1) {
                activeSlide = slides.length;
            } else {
                activeSlide--;
            }
        
            slidesCounter.forEach(item => item.classList.remove('active'));
            slidesCounter[activeSlide - 1].classList.add('active');
        });
    }

    function activeCounterBlock() {
        slidesCounter.forEach(item => {
            item.addEventListener('click', (e) => {
                const slideIndex = slidesCounter.indexOf(e.target);
                
                activeSlide = slideIndex + 1;
                slideOffsetX = parseInt(width) * slideIndex;

                slidesInner.style.transform = `translateX(-${slideOffsetX}px)`;
        
                slidesCounter.forEach(item => item.classList.remove('active'));
                slidesCounter[activeSlide - 1].classList.add('active');
            });
        });
    }
    
    initSlider();

}());
