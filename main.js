document.addEventListener('DOMContentLoaded', function () {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const currentSpan = document.querySelector('.wrap_visual .now');
    const totalSpan = document.querySelector('.wrap_visual .total');
    const prevBtn = document.querySelector('.wrap_visual .vis-prev');
    const nextBtn = document.querySelector('.wrap_visual .vis-next');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    if (totalSpan) {
        totalSpan.textContent = totalSlides.toString().padStart(2, '0');
    }

    function goToSlide(index) {
        currentSlide = (index + totalSlides) % totalSlides;
        sliderContainer.style.transform = `translateX(-${currentSlide * 25}%)`;

        slides.forEach(slide => {
            slide.querySelector('.text_1')?.classList.remove('show');
            slide.querySelector('.text_2')?.classList.remove('show');
            slide.querySelector('.text_3')?.classList.remove('show');
        });

        const activeSlide = slides[currentSlide];
        const text1 = activeSlide.querySelector('.text_1');
        const text2 = activeSlide.querySelector('.text_2');
        const text3 = activeSlide.querySelector('.text_3');

        if (text1) {
            const span1 = text1.querySelector('span');
            if (span1) {
                span1.style.color = span1.getAttribute('data-color') || '#8B0029';
                span1.style.fontFamily = `'Comic Sans MS', serif`;
            }
            setTimeout(() => {
                text1.classList.add('show');
            }, 100);
        }

        if (text2) {
            const strong = text2.querySelector('strong');
            if (strong) {
                strong.style.fontFamily = `'Noto Sans KR', sans-serif`;
                strong.style.fontWeight = '500';
            }
            setTimeout(() => {
                text2.classList.add('show');
            }, 700);
        }

        if (text3) {
            setTimeout(() => {
                text3.classList.add('show');
            }, 1200);
        }

        if (currentSpan) {
            currentSpan.textContent = (currentSlide + 1).toString().padStart(2, '0');
        }
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
        resetInterval();
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
        resetInterval();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    startInterval();

    let touchStartX = 0;
    let touchEndX = 0;

    sliderContainer.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sliderContainer.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            nextSlide();
        } else if (touchEndX - touchStartX > 50) {
            prevSlide();
        }
    });

    goToSlide(0);
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        alert('문의가 성공적으로 전송되었습니다. 감사합니다!');
        this.reset();
    });
}