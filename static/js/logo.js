// ===============================
// Logo Page JavaScript
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================
    // Smooth Scroll Animation
    // ===============================
    function smoothScrollTo(element, duration = 1000) {
        const targetPosition = element.offsetTop - 100;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // ===============================
    // Scroll Reveal Animation
    // ===============================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.logo-item, .meaning-content');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal-active');
            }
        });
    }

    // Add CSS for reveal animation (헤더 섹션 제외하고 바로 보이게)
    const style = document.createElement('style');
    style.textContent = `
        .logo-item, .meaning-content {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.3s ease;
        }
        
        .logo-item:nth-child(2) {
            transition-delay: 0s;
        }
    `;
    document.head.appendChild(style);

    // ===============================
    // Floating Animation for Logo Images (모바일에서도 유지)
    // ===============================
    function addFloatingAnimation() {
        const logos = document.querySelectorAll('.paran-logo, .paran-slogan');
        
        logos.forEach((logo, index) => {
            // 모바일에서는 더 부드러운 애니메이션
            const duration = window.innerWidth <= 768 ? 4 + index * 0.3 : 3 + index * 0.5;
            logo.style.animation = `float ${duration}s ease-in-out infinite`;
        });

        // Add floating keyframes
        const floatingStyle = document.createElement('style');
        floatingStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(${window.innerWidth <= 768 ? '-5px' : '-10px'}); }
            }
        `;
        document.head.appendChild(floatingStyle);
    }

    // ===============================
    // Parallax Effect for Hero Section (데스크톱에서만)
    // ===============================
    function parallaxEffect() {
        if (window.innerWidth > 768) {
            const heroSection = document.querySelector('.hero-section');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        }
    }

    // ===============================
    // Typewriter Effect for Title (모바일에서도 유지, 더 빠르게)
    // ===============================
    function typewriterEffect() {
        const titleLines = document.querySelectorAll('.title-line1, .title-line2, .title-line3');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            // 모바일에서는 더 빠른 타이핑과 짧은 딜레이
            const typingSpeed = window.innerWidth <= 768 ? 30 : 50;
            const delayBetweenLines = window.innerWidth <= 768 ? 500 : 1000;
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, typingSpeed);
            }, index * delayBetweenLines);
        });
    }

    // ===============================
    // Interactive Logo Glow Effect
    // ===============================
    function addGlowEffect() {
        const logoItems = document.querySelectorAll('.logo-item');
        
        logoItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.boxShadow = '0 4px 20px rgba(3, 77, 161, 0.15)';
            });
        });
    }

    // ===============================
    // Particle Background Effect (모바일에서도 가벼운 버전 유지)
    // ===============================
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        
        // 화면 크기에 따라 파티클 수 조정 (모바일에서도 소량 유지)
        let particleCount;
        if (window.innerWidth <= 480) {
            particleCount = 15; // 작은 모바일
        } else if (window.innerWidth <= 768) {
            particleCount = 25; // 모바일
        } else if (window.innerWidth <= 1024) {
            particleCount = 35; // 태블릿
        } else {
            particleCount = 50; // 데스크톱
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 모바일에서는 더 작은 파티클
            const baseSize = window.innerWidth <= 768 ? 4 : 8;
            const sizeRange = window.innerWidth <= 768 ? 6 : 12;
            const size = baseSize + Math.random() * sizeRange;
            
            // 모바일에서는 더 느린 애니메이션
            const animationDuration = window.innerWidth <= 768 ? 
                8 + Math.random() * 12 : 5 + Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${window.innerWidth <= 768 ? 0.3 : 0.4});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${animationDuration}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 ${window.innerWidth <= 768 ? 5 : 10}px rgba(255, 255, 255, 0.2);
            `;
            heroSection.appendChild(particle);
        }

        // Add particle animation
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            @keyframes particle-float {
                0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(particleStyle);
    }



    // Add CSS for hamburger animation
    const hamburgerStyle = document.createElement('style');
    hamburgerStyle.textContent = `
        .toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .toggle .line2 {
            opacity: 0;
        }
        
        .toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        @keyframes navLinkFade {
            from {
                opacity: 0;
                transform: translateX(50px);
            }
            to {
                opacity: 1;
                transform: translateX(0px);
            }
        }
    `;
    document.head.appendChild(hamburgerStyle);

    // ===============================
    // Navigation Menu Functions (clubInfo.js 방식 참고)
    // ===============================
    function initNavigationMenu() {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = document.querySelectorAll('.nav-links li');

        // 햄버거 메뉴 토글
        if (burger) {
            burger.addEventListener('click', () => {
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
                
                navLinks.forEach((link, index) => {
                    if (link.style.animation) {
                        link.style.animation = '';
                    } else {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    }
                });
            });
        }

        // 홈 링크 클릭 시 새로고침
        const homeLink = document.getElementById('home-link');
        if (homeLink) {
            homeLink.addEventListener('click', function(e) {
                e.preventDefault();
                location.reload();
            });
        }

        // 로고, 설명 링크에 스무스 스크롤 적용
        document.querySelectorAll('#logo-link, #meaning-link').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // 모바일 메뉴가 열려있으면 닫기
                    if (nav && nav.classList.contains('nav-active')) {
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                        
                        navLinks.forEach(link => {
                            link.style.animation = '';
                        });
                    }
                }
            });
        });
    }

    // 활성 네비게이션 업데이트
    function updateActiveNav(activeId) {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('nav-active');
        });
        document.getElementById(activeId).classList.add('nav-active');
    }

    // 스크롤 위치에 따른 네비게이션 활성화
    function updateNavOnScroll() {
        const sections = [
            { element: document.querySelector('.hero-section'), id: 'home-link' },
            { element: document.querySelector('.logo-showcase'), id: 'logo-link' },
            { element: document.querySelector('.logo-meaning'), id: 'meaning-link' }
        ];

        const scrollPosition = window.pageYOffset + 200;

        sections.forEach((section, index) => {
            if (section.element) {
                const sectionTop = section.element.offsetTop;
                const sectionBottom = sectionTop + section.element.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    updateActiveNav(section.id);
                }
            }
        });
    }

    // ===============================
    // Initialize All Effects
    // ===============================
    function init() {
        // Initial reveal check
        revealOnScroll();
        
        // Add floating animation
        addFloatingAnimation();
        
        // Add glow effects
        addGlowEffect();
        
        // Create particles
        createParticles();
        
        // Hamburger menu is now handled in initNavigationMenu()
        
        // Initialize navigation menu
        initNavigationMenu();
        
        // Start typewriter effect after a short delay
        setTimeout(typewriterEffect, 500);
        
        // Event listeners
        window.addEventListener('scroll', () => {
            revealOnScroll();
            parallaxEffect();
            updateNavOnScroll();
        });
        
        // Smooth scroll for navigation links (기존 앵커 링크용)
        document.querySelectorAll('a[href^="#"]:not(#home-link):not(#logo-link):not(#meaning-link)').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target);
                }
            });
        });
    }

    // Start everything
    init();
    
    // ===============================
    // Performance Optimization
    // ===============================
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }
    
    function updateAnimations() {
        revealOnScroll();
        parallaxEffect();
        ticking = false;
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick);
    
    // ===============================
    // 추가 반응형 기능들
    // ===============================
    
    // 이미지 로드 오류 처리
    const images = document.querySelectorAll('.paran-logo, .paran-slogan');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 150px;
                background: rgba(255, 255, 255, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                color: #999;
                font-size: 14px;
                text-align: center;
            `;
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            this.parentNode.insertBefore(placeholder, this);
        });
    });
    
    // 윈도우 리사이즈 시 효과 재조정
    window.addEventListener('resize', function() {
        // 플로팅 애니메이션 재조정
        const logos = document.querySelectorAll('.paran-logo, .paran-slogan');
        logos.forEach((logo, index) => {
            const duration = window.innerWidth <= 768 ? 4 + index * 0.3 : 3 + index * 0.5;
            logo.style.animation = `float ${duration}s ease-in-out infinite`;
        });
        
        // 파티클 효과 재조정 (모바일에서도 유지)
        const existingParticles = document.querySelectorAll('.particle');
        if (existingParticles.length > 0) {
            // 기존 파티클 제거 후 새로운 크기로 재생성
            existingParticles.forEach(particle => particle.remove());
            createParticles();
        }
        
        // 네비게이션 메뉴 상태 초기화
        const nav = document.querySelector('.nav-links');
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelectorAll('.nav-links li');
        
        if (window.innerWidth > 768) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(link => {
                link.style.animation = '';
                link.style.opacity = '1';
            });
        }
    });
    
    // 터치 디바이스 감지 및 호버 효과 조정
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // 터치 디바이스에서는 호버 효과를 탭 효과로 변경
        const logoItems = document.querySelectorAll('.logo-item');
        logoItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 15px 40px rgba(74, 144, 226, 0.3)';
            });
            
            item.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0)';
                    this.style.boxShadow = '0 4px 20px rgba(3, 77, 161, 0.15)';
                }, 150);
            });
        });
    }
    
    // 키보드 네비게이션 지원
    document.addEventListener('keydown', function(e) {
        const navLinks = document.querySelectorAll('.nav-links a');
        const currentActive = document.querySelector('.nav-links a.nav-active');
        const currentIndex = Array.from(navLinks).indexOf(currentActive);
        
        let newIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                newIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                newIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : 0;
                break;
            case 'Home':
                e.preventDefault();
                newIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                newIndex = navLinks.length - 1;
                break;
            case 'Enter':
            case ' ':
                if (currentActive) {
                    e.preventDefault();
                    currentActive.click();
                }
                break;
        }
        
        if (newIndex !== undefined && navLinks[newIndex]) {
            navLinks[newIndex].focus();
            navLinks[newIndex].click();
        }
    });
    
    // 접근성 개선
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach((link, index) => {
        link.setAttribute('tabindex', '0');
        link.setAttribute('role', 'menuitem');
        if (index === 0) {
            link.setAttribute('aria-current', 'page');
        }
    });
    
    // 스크롤 위치 복원 (페이지 새로고침 시)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }, 1000);
    }
});