// 이미지 슬라이더 기능
document.addEventListener('DOMContentLoaded', function() {
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // 슬라이드 이동 함수
    function goToSlide(n) {
        currentSlide = n;
        sliderContainer.style.transform = `translateX(-${currentSlide * 25}%)`;

        // 텍스트 애니메이션
        const currentTexts = slides[currentSlide].querySelectorAll('.text_1, .text_2');
        currentTexts.forEach(text => {
            text.style.opacity = '0';
            text.style.transform = 'translate(-50%, -30%)';
            setTimeout(() => {
                text.style.transition = 'all 1s ease-out';
                text.style.opacity = '1';
                text.style.transform = 'translate(-50%, -50%)';
            }, 100);
        });
    }

    // 다음 슬라이드
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }

    // 자동 슬라이드
    let slideInterval = setInterval(nextSlide, 5000);

    // 터치 슬라이드 지원
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
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            goToSlide(currentSlide);
        }
    });

    // 초기 텍스트 애니메이션
    const initialTexts = slides[0].querySelectorAll('.text_1, .text_2');
    initialTexts.forEach(text => {
        text.style.opacity = '0';
        text.style.transform = 'translate(-50%, -30%)';
        setTimeout(() => {
            text.style.transition = 'all 1s ease-out';
            text.style.opacity = '1';
            text.style.transform = 'translate(-50%, -50%)';
        }, 100);
    });
});

// 문의 폼 제출 처리
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // 성공 메시지 표시
        alert('문의가 성공적으로 전송되었습니다. 감사합니다!');
        this.reset();
    });
}