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

const canvas = document.getElementById('meteor-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    const heroSection = document.querySelector('.hero');
    let meteors = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function createMeteor() {
        // 화면 상단의 랜덤한 x 위치 또는 왼쪽의 랜덤한 y 위치에서 시작
        const startFromTop = Math.random() < 0.5;
    
        let x, y;
        if (startFromTop) {
            // 화면 위쪽에서 시작하되 x 위치는 화면 전체로 확장
            x = Math.random() * canvas.width;
            y = -Math.random() * 100; // 살짝 위쪽
        } else {
            // 왼쪽에서 시작하되 y 위치도 다양화
            x = -Math.random() * 100;
            y = Math.random() * canvas.height;
        }
    
        return {
            x,
            y,
            length: Math.random() * 60 + 20,
            speed: Math.random() * 2 + 2,
            angle: Math.PI / 4, // 그대로 45도 유지
            alpha: Math.random() * 0.5 + 0.5
        };
    }

    function drawMeteor(meteor) {
        const { x, y, length, angle, alpha } = meteor;
        const xEnd = x + Math.cos(angle) * length;
        const yEnd = y + Math.sin(angle) * length;
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
    }

    function updateMeteors() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        meteors.forEach((meteor, index) => {
            meteor.x += meteor.speed;
            meteor.y += meteor.speed;

            drawMeteor(meteor);

            if (meteor.x > canvas.width || meteor.y > canvas.height) {
                meteors[index] = createMeteor();
            }
        });

        requestAnimationFrame(updateMeteors);
    }

    for (let i = 0; i < 15; i++) {
        meteors.push(createMeteor());
    }
    updateMeteors();
}
