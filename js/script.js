(function() {

    function initSlider() {
        setupPaginations();
        setupArrows();
    }

    const wrapper = document.querySelector('.slider__wrapper');
    const wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
    const slidesInner = document.querySelector('.slider__inner');
    const slides = document.querySelectorAll('.slide');

    let activeSlide = 1;
    // let slideOffsetX = 0;

    slidesInner.style.width = 100 * slides.length + '%';

    slides.forEach(item => item.style.width = wrapperWidth);

    const slidesCounter = [];

    function goToSlide(index) {
        const slideOffsetX = wrapperWidth * index;
        activeSlide = index;
        slidesInner.style.transform = `translateX(-${slideOffsetX}px)`;
        slidesCounter.forEach(item => item.classList.remove('active'));
        slidesCounter[index].classList.add('active');
    }

    function paginationHandleItemClick() {
        slidesCounter.forEach(item => {
            item.addEventListener('click', (e) => {
                const slideIndex = slidesCounter.indexOf(e.target);
                goToSlide(slideIndex);
            });
        });
    }

    function setupPaginations() {
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

        paginationHandleItemClick();
    }

    function setupArrows() {
        const next = document.querySelector('.slider__arr-next');
        const prev = document.querySelector('.slider__arr-prev');

        next.addEventListener('click', () => {
            const index = activeSlide == slides.length ? 1 : activeSlide + 1;
            goToSlide(index);
        });

        prev.addEventListener('click', () => {
            const index = activeSlide == slides.length ? slides.length : activeSlide - 1;
            goToSlide(index);
        });
    }

    initSlider();

}());
