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
    // Floating Animation for Logo Images
    // ===============================
    function addFloatingAnimation() {
        const logos = document.querySelectorAll('.paran-logo, .paran-slogan');
        
        logos.forEach((logo, index) => {
            logo.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        });

        // Add floating keyframes
        const floatingStyle = document.createElement('style');
        floatingStyle.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(floatingStyle);
    }

    // ===============================
    // Parallax Effect for Hero Section
    // ===============================
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    }

    // ===============================
    // Typewriter Effect for Title
    // ===============================
    function typewriterEffect() {
        const titleLines = document.querySelectorAll('.title-line1, .title-line2, .title-line3');
        
        titleLines.forEach((line, index) => {
            const text = line.textContent;
            line.textContent = '';
            line.style.opacity = '1';
            
            setTimeout(() => {
                let i = 0;
                const timer = setInterval(() => {
                    if (i < text.length) {
                        line.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                    }
                }, 50);
            }, index * 1000);
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
    // Particle Background Effect
    // ===============================
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = 8 + Math.random() * 12; // 8px ~ 20px 랜덤 크기
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${5 + Math.random() * 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
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
});