document.addEventListener('DOMContentLoaded', function() {
    // 페이지가 로드될 때 모든 섹션에 'show' 클래스 추가
    setTimeout(() => {
      document.querySelector('#home').classList.add('show');
    }, 100);
  
    // 커스텀 커서 효과
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if(window.innerWidth > 1024) {
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
          cursorFollower.style.left = e.clientX + 'px';
          cursorFollower.style.top = e.clientY + 'px';
        }, 80);
      });
      
      // 링크 및 버튼에 호버 효과 추가
      const links = document.querySelectorAll('a, button, .card, .gallery-item, .social-icons a');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorFollower.style.backgroundColor = 'rgba(106, 90, 205, 0.2)';
        });
        
        link.addEventListener('mouseleave', () => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorFollower.style.backgroundColor = 'rgba(106, 90, 205, 0.3)';
        });
      });
    }
  
    // 네비게이션 토글
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
      // 햄버거 메뉴 애니메이션
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
      
      // 네비게이션 링크 애니메이션
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
      });
    });
    
    // 스크롤 애니메이션 및 현재 섹션 표시
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
      // 섹션 스크롤 애니메이션
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < window.innerHeight * 0.75) {
          section.classList.add('show');
        }
      });
      
      // 현재 섹션 표시
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if(pageYOffset >= (sectionTop - sectionHeight / 3)) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('nav-active');
        if(item.getAttribute('href').substring(1) === current) {
          item.classList.add('nav-active');
        }
      });
      
      // 백투탑 버튼 표시
      const backToTop = document.querySelector('.back-to-top');
      if(pageYOffset > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    
    // 백투탑 버튼 클릭 이벤트
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // 스크롤 다운 버튼 클릭 이벤트
    const scrollDown = document.querySelector('.scroll-down');
    const aboutSection = document.querySelector('#about');
    
    scrollDown.addEventListener('click', () => {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // 숫자 카운팅 애니메이션
    const stats = document.querySelectorAll('.stat-number');
    
    const counterAnim = (el, start = 0, end, duration = 1500) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        el.textContent = Math.floor(progress * (end - start) + start) + '+';
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };
    
    const runCounters = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const endValue = parseInt(el.getAttribute('data-target'));
            counterAnim(el, 0, endValue);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      
      stats.forEach(stat => observer.observe(stat));
    };
    
    runCounters();
    
    // 패럴랙스 효과 (데스크톱에서만)
    const parallaxItems = document.querySelectorAll('.parallax-item');
    
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        parallaxItems.forEach(item => {
          const speed = item.getAttribute('data-speed');
          
          const x = (window.innerWidth - mouseX * speed) / 100;
          const y = (window.innerHeight - mouseY * speed) / 100;
          
          item.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
      });
    }
    
    // 갤러리 필터링
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 활성화된 버튼 스타일 변경
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
          if(filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 100);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
    
    // 3D 틸트 효과
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.2,
    });
    
    // 폼 제출 처리
    const joinForm = document.getElementById('joinForm');
    const formMessage = document.querySelector('.form-message');
    
    if(joinForm) {
      joinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const instrument = document.getElementById('instrument').value;
        const motivation = document.getElementById('motivation').value;
        
        // 실제로는 서버로 데이터를 보내야 하지만, 여기서는 성공 메시지만 표시
        formMessage.innerHTML = `${name}님, 가입 신청이 성공적으로 접수되었습니다! 곧 연락드리겠습니다.`;
        formMessage.classList.add('success');
        formMessage.style.display = 'block';
        
        // 폼 초기화
        joinForm.reset();
        
        // 5초 후 메시지 사라짐
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      });
    }
    
    // 내비게이션 메뉴 스무스 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
          
          // 모바일 메뉴가 열려있으면 닫기
          if (nav.classList.contains('nav-active')) {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinks.forEach(link => {
              link.style.animation = '';
            });
          }
        }
      });
    });
    
    // 타이핑 효과 재활성화 (반응형 개선)
    const typewriterText = document.querySelector('.typewriter-text');
    
    const restartTypewriter = () => {
      if (typewriterText) {
        if (window.innerWidth > 768) {
          typewriterText.style.animation = 'none';
          setTimeout(() => {
            typewriterText.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
          }, 10);
        } else {
          // 모바일에서는 타이핑 효과 제거
          typewriterText.style.animation = 'none';
          typewriterText.style.borderRight = 'none';
          typewriterText.style.whiteSpace = 'normal';
        }
      }
    };
    
    const typewriterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          restartTypewriter();
        }
      });
    }, { threshold: 0.5 });
    
    if (typewriterText) {
      typewriterObserver.observe(typewriterText);
    }
    
    // 윈도우 리사이즈 시 타이핑 효과 재조정
    window.addEventListener('resize', () => {
      restartTypewriter();
    });
    
    // 이미지 로드 오류 처리
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.addEventListener('error', function() {
        this.src = 'https://via.placeholder.com/400x300?text=소리마당';
      });
    });
}); 