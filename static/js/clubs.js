document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".tab-button");
    const contents = document.querySelectorAll(".tab-content");

    // 첫 번째 탭을 기본으로 활성화
    if (buttons.length > 0 && contents.length > 0) {
        buttons[0].classList.add("active");
        contents[0].classList.add("active");
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const targetId = this.getAttribute("data-tab");
            const targetContent = document.getElementById(targetId);

            // 모든 버튼과 콘텐츠에서 active 클래스 제거
            buttons.forEach(btn => btn.classList.remove("active"));
            contents.forEach(content => content.classList.remove("active"));

            // 클릭한 버튼과 해당 콘텐츠에 active 클래스 추가
            this.classList.add("active");
            if (targetContent) {
                targetContent.classList.add("active");
                
                // 모바일에서 탭 콘텐츠로 부드럽게 스크롤
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        targetContent.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
            }
        });
    });

    // 이미지 로드 오류 처리
    const images = document.querySelectorAll('.image-item img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 200px;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                color: #999;
                font-size: 14px;
            `;
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            this.parentNode.insertBefore(placeholder, this);
        });
    });

    // 터치 스와이프 기능 (모바일용)
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            const activeButton = document.querySelector('.tab-button.active');
            const activeIndex = Array.from(buttons).indexOf(activeButton);
            
            let newIndex;
            if (swipeDistance > 0 && activeIndex > 0) {
                // 오른쪽 스와이프 - 이전 탭
                newIndex = activeIndex - 1;
            } else if (swipeDistance < 0 && activeIndex < buttons.length - 1) {
                // 왼쪽 스와이프 - 다음 탭
                newIndex = activeIndex + 1;
            }
            
            if (newIndex !== undefined) {
                buttons[newIndex].click();
            }
        }
    }

    // 터치 이벤트 리스너 (모바일에서만)
    if (window.innerWidth <= 768) {
        const tabContents = document.querySelector('.tab-contents');
        
        tabContents.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        tabContents.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    // 윈도우 리사이즈 시 레이아웃 재조정
    window.addEventListener('resize', function() {
        // 이미지 크기 재조정
        const imageItems = document.querySelectorAll('.image-item img');
        imageItems.forEach(img => {
            if (window.innerWidth <= 768) {
                img.style.width = '100%';
                img.style.height = 'auto';
            }
        });
    });

    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.tab-button.active');
        const activeIndex = Array.from(buttons).indexOf(activeButton);
        
        let newIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                newIndex = activeIndex > 0 ? activeIndex - 1 : buttons.length - 1;
                break;
            case 'ArrowRight':
                e.preventDefault();
                newIndex = activeIndex < buttons.length - 1 ? activeIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = buttons.length - 1;
                break;
        }
        
        if (newIndex !== undefined) {
            buttons[newIndex].click();
            buttons[newIndex].focus();
        }
    });

    // 버튼에 포커스 가능하도록 설정
    buttons.forEach((button, index) => {
        button.setAttribute('tabindex', '0');
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });

    // 접근성 개선
    contents.forEach((content, index) => {
        content.setAttribute('role', 'tabpanel');
        content.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
});