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
    const links = document.querySelectorAll('a, button, .history-box, .social-icons a');
    
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
  const historyItems = document.querySelectorAll('.history-item');
  
  window.addEventListener('scroll', () => {
    // 섹션 스크롤 애니메이션
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if(sectionTop < window.innerHeight * 0.75) {
        section.classList.add('show');
      }
    });
    
    // 연혁 아이템 애니메이션
    historyItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;
      if(itemTop < window.innerHeight * 0.8) {
        item.classList.add('show');
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
  const historySection = document.querySelector('#history');
  
  scrollDown.addEventListener('click', () => {
    historySection.scrollIntoView({ behavior: 'smooth' });
  });
  
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
  
  // 연혁 박스 호버 효과 강화
  const historyBoxes = document.querySelectorAll('.history-box');
  
  historyBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    box.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // 연혁 아이템 순차적 등장 애니메이션
  function animateHistoryItems() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 200); // 200ms 간격으로 순차 등장
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    historyItems.forEach(item => observer.observe(item));
  }
  
  animateHistoryItems();
  
  // 패럴랙스 효과 (연혁 박스들) - 더 가까운 겹침
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    historyItems.forEach((item, index) => {
      const rate = scrolled * (0.08 + index * 0.03);
      if (item.classList.contains('show')) {
        item.style.transform = `translateY(${-rate}px)`;
      }
    });
  });
  
  // 이미지 로드 오류 처리
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = 'https://via.placeholder.com/400x300?text=총동아리연합회';
    });
  });
  
  // 초기 애니메이션 트리거
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 500);
});