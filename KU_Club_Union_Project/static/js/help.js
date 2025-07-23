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
    // Parallax Effect for Hero Section
    // ===============================
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (heroSection) {
            heroSection.style.transform = `translateY(${rate}px)`;
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
    // Particle Background Effect
    // ===============================
    function createParticles() {
        const heroSection = document.querySelector('.hero-section');
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = 6 + Math.random() * 10;
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particle-float ${8 + Math.random() * 12}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
                box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);
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
});