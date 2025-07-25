// ===============================
// Help Page JavaScript
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
        const reveals = document.querySelectorAll('.info-card, .contact-card');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal-active');
            }
        });
    }

    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .info-card, .contact-card {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.6s ease;
        }
        
        .info-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .info-card:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);

    // ===============================
    // Card Hover Effects
    // ===============================
    function addCardEffects() {
        const cards = document.querySelectorAll('.info-card, .contact-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===============================
    // Parallax Effect for Hero Section (데스크톱에서만)
    // ===============================
    function parallaxEffect() {
        if (window.innerWidth > 768) {
            const heroSection = document.querySelector('.hero-section');
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        }
    }

    // ===============================
    // Static Title Display (타이핑 애니메이션 제거)
    // ===============================
    function displayStaticTitle() {
        const titleLines = document.querySelectorAll('.title-line1, .title-line2, .title-line3');
        const subtitle = document.querySelector('.subtitle');
        
        // 모든 텍스트를 즉시 표시
        titleLines.forEach(line => {
            line.style.opacity = '1';
        });
        
        if (subtitle) {
            subtitle.style.opacity = '1';
        }
    }

    // ===============================
    // Counter Animation for Numbers
    // ===============================
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 200;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.ceil(current);
                }
            }, 10);
        });
    }

    // ===============================
    // Particle Background Effect (반응형 개선)
    // ===============================
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        
        // 화면 크기에 따라 파티클 수 조정
        let particleCount;
        if (window.innerWidth <= 480) {
            particleCount = 15; // 작은 모바일
        } else if (window.innerWidth <= 768) {
            particleCount = 20; // 모바일
        } else if (window.innerWidth <= 1024) {
            particleCount = 25; // 태블릿
        } else {
            particleCount = 30; // 데스크톱
        }
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // 모바일에서는 더 작은 파티클
            const baseSize = window.innerWidth <= 768 ? 4 : 6;
            const sizeRange = window.innerWidth <= 768 ? 6 : 10;
            const size = baseSize + Math.random() * sizeRange;
            
            // 모바일에서는 더 느린 애니메이션
            const animationDuration = window.innerWidth <= 768 ? 
                10 + Math.random() * 15 : 8 + Math.random() * 12;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, ${window.innerWidth <= 768 ? 0.25 : 0.3});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${animationDuration}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
                box-shadow: 0 0 ${window.innerWidth <= 768 ? 6 : 8}px rgba(255, 255, 255, 0.2);
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
    // Navigation Menu Functions
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

        // 모든 네비게이션 링크에 스무스 스크롤 적용
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                // 홈 링크는 새로고침
                if (this.id === 'home-link') {
                    location.reload();
                    return;
                }
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 클릭한 링크를 활성화
                    updateActiveNav(this.id);
                    
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
        const activeLink = document.getElementById(activeId);
        if (activeLink) {
            activeLink.classList.add('nav-active');
        }
    }

    // 스크롤 위치에 따른 네비게이션 활성화
    function updateNavOnScroll() {
        const sections = [
            { element: document.querySelector('.hero-section'), id: 'home-link' },
            { element: document.querySelector('#rental-section'), id: 'rental-link' },
            { element: document.querySelector('#residence-section'), id: 'residence-link' },
            { element: document.querySelector('#partnership-section'), id: 'partnership-link' }
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
    // Section Animation on Scroll
    // ===============================
    function animateSectionsOnScroll() {
        const sections = document.querySelectorAll('.service-section, .contact-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.8) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Add initial styles for sections
    const sectionStyle = document.createElement('style');
    sectionStyle.textContent = `
        .service-section, .contact-section {
            opacity: 1;
            transform: translateY(0);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(sectionStyle);

    // ===============================
    // Initialize All Effects
    // ===============================
    function init() {
        // Initial reveal check
        revealOnScroll();
        
        // Add card effects
        addCardEffects();
        
        // Create particles
        createParticles();
        
        // Initialize navigation menu
        initNavigationMenu();
        
        // Display static title immediately
        displayStaticTitle();
        
        // Animate counters if they exist
        setTimeout(animateCounters, 1000);
        
        // Event listeners
        window.addEventListener('scroll', () => {
            revealOnScroll();
            parallaxEffect();
            updateNavOnScroll();
            animateSectionsOnScroll();
        });
        
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]:not(#home-link):not(#rental-link):not(#residence-link):not(#partnership-link)').forEach(anchor => {
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
        animateSectionsOnScroll();
        ticking = false;
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', requestTick);
    
    // ===============================
    // 추가 반응형 기능들
    // ===============================
    
    // 이미지 로드 오류 처리
    const images = document.querySelectorAll('.card-image img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: 100%;
                height: 100%;
                background: #f0f0f0;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 10px;
                color: #999;
                font-size: 14px;
                text-align: center;
            `;
            placeholder.textContent = '이미지를 불러올 수 없습니다';
            this.parentNode.appendChild(placeholder);
        });
    });
    
    // 윈도우 리사이즈 시 효과 재조정
    window.addEventListener('resize', function() {
        // 파티클 효과 재조정
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
        const cards = document.querySelectorAll('.info-card, .contact-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px) scale(1.01)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
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
    
    // 모바일에서 스크롤 시 네비게이션 자동 닫기
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        if (window.innerWidth <= 768) {
            const nav = document.querySelector('.nav-links');
            const burger = document.querySelector('.burger');
            const navLinks = document.querySelectorAll('.nav-links li');
            
            if (nav.classList.contains('nav-active')) {
                const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
                
                // 스크롤이 50px 이상 움직이면 메뉴 닫기
                if (Math.abs(currentScrollTop - lastScrollTop) > 50) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
            }
        }
    });
});