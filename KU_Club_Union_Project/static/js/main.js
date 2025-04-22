document.addEventListener('DOMContentLoaded', () => {
    /* ===========================
       1. Hero Slider Script
    =========================== */
    const sliderContainer = document.querySelector('.slider-container');
    const slides = document.querySelectorAll('.slide');
    const currentSpan = document.querySelector('.wrap_visual .now');
    const totalSpan = document.querySelector('.wrap_visual .total');
    const prevBtn = document.querySelector('.wrap_visual .vis-prev');
    const nextBtn = document.querySelector('.wrap_visual .vis-next');

    let currentSlide = 0;
    const totalSlides = slides.length;
    let slideInterval;

    const startInterval = () => { slideInterval = setInterval(nextSlide, 5000); };
    const resetInterval = () => { clearInterval(slideInterval); startInterval(); };

    if (totalSpan) totalSpan.textContent = totalSlides.toString().padStart(2, '0');

    function goToSlide(idx) {
      currentSlide = (idx + totalSlides) % totalSlides;
      sliderContainer.style.transform = `translateX(-${currentSlide * 25}%)`;

      slides.forEach(s => {
        s.querySelector('.text_1')?.classList.remove('show');
        s.querySelector('.text_2')?.classList.remove('show');
        s.querySelector('.text_3')?.classList.remove('show');
      });

      const active = slides[currentSlide];
      const text1 = active.querySelector('.text_1');
      const text2 = active.querySelector('.text_2');
      const text3 = active.querySelector('.text_3');

      if (text1) {
        const span1 = text1.querySelector('span');
        if (span1) {
          span1.style.color = span1.getAttribute('data-color') || '#8B0029';
          span1.style.fontFamily = `'Comic Sans MS', serif`;
        }
        setTimeout(() => text1.classList.add('show'), 100);
      }
      if (text2) {
        const strong = text2.querySelector('strong');
        if (strong) {
          strong.style.fontFamily = `'Noto Sans KR', sans-serif`;
          strong.style.fontWeight = '500';
        }
        setTimeout(() => text2.classList.add('show'), 700);
      }
      if (text3) setTimeout(() => text3.classList.add('show'), 1200);

      if (currentSpan) currentSpan.textContent = (currentSlide + 1).toString().padStart(2, '0');
    }

    const nextSlide = () => { goToSlide(currentSlide + 1); resetInterval(); };
    const prevSlide = () => { goToSlide(currentSlide - 1); resetInterval(); };

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', prevSlide);
      nextBtn.addEventListener('click', nextSlide);
    }

    startInterval();
    goToSlide(0);

    let touchStartX = 0;
    sliderContainer.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    sliderContainer.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(dx) > 50) {
        dx < 0 ? nextSlide() : prevSlide();
      }
    });

    /* ===========================
       2. GNB Overlay Script
    =========================== */
    const menuBtn = document.getElementById('menuBtn');
    const gnbMenu = document.getElementById('gnbMenu');
    const closeBtn = document.querySelector('.btn-mgnb-close');
    const mainMenuItems = document.querySelectorAll('#mainMenu li');
    const midWrap = document.getElementById('midMenuContainer');
    const subWrap = document.getElementById('subMenuContainer');
    const bgLayer = document.getElementById('gnbBg');

    const bgImages = {
      ClubUnion: '/static/images/menu-bg1.jpg',
      Clubs: '/static/images/menu-bg2.jpg',
      Notification: '/static/images/menu-bg3.jpg',
      Service: '/static/images/menu-bg6.jpg',
      Communication: '/static/images/menu-bg5.jpg',
    };

    const menuHierarchy = {
      ClubUnion: {
        '연합회': [
          { name: '소개', url: 'introduce' },
          { name: '연혁', url: '/univ/vision' },
          { name: '조직도', url: '/univ/goal' },
        ],
        '공약보고': [
          { name: '회장단 공약', url: '/univ/president' },
          { name: '실행 현황', url: '/univ/president' }
        ],
        '로고/슬로건': [
          { name: '공식 로고', url: '/univ/vice-president' },
          { name: '슬로건', url: '/univ/vice-president' }
        ]
      },
      Clubs: {
        '동아리 분과': [
          { name: '공연예술분과', url: 'clubs' },
          { name: '과학기술분과', url: 'clubs' },
          { name: '기악예술분과', url: 'clubs' },
          { name: '사회공헌분과', url: 'clubs' },
          { name: '스포츠분과', url: 'clubs' },
          { name: '전시창작분과', url: 'clubs' },
          { name: '학술분과', url: 'clubs' }
        ]
      },
      Notification: {
        '공지사항': [
          { name: '안내사항', url: '/univ/status' },
          { name: '일반공지', url: '/univ/status' },
        ],
        '자료실': [
          { name: '가등록 동아리 신청서', url: '/univ/president' },
          { name: '회칙 및 규정', url: '/univ/president' }
        ]
      },
      Service: {
        '물품대여서비스': [
          { name: '이용 방법', url: '/univ/status' },
          { name: '대여 목록', url: '/univ/vision' },
        ],
        '상주': [
          { name: '상주 활동 소개', url: '/univ/president' }
        ],
        '제휴업체': [
          { name: '업체 목록', url: '/univ/symbol'},
          { name: '업체 혜택 소개', url: '/univ/symbol'}
        ]
      },
      Communication : {
        'SNS': [
          { name: '카카오톡 오픈채팅 바로가기', url: '/univ/status' },
          { name: '인스타그램 바로가기', url: '/univ/vision' },
        ],
        '위치': [
          { name: '오시는 길', url: '/univ/president' }
        ]
      }
    };

    menuBtn.addEventListener('click', () => {
      gnbMenu.classList.add('active');
      menuBtn.classList.add('hidden');
      document.body.style.overflow = 'hidden';
      midWrap.innerHTML = '';
      subWrap.innerHTML = '';
      mainMenuItems.forEach(v => v.classList.remove('active'));

      const defaultKey = 'ClubUnion';
      bgLayer.style.backgroundImage = `url('${bgImages[defaultKey]}')`;
      
    });

    closeBtn.addEventListener('click', () => {
      gnbMenu.classList.remove('active');
      menuBtn.classList.remove('hidden');
      document.body.style.overflow = '';
      clearGnb();
    });

    mainMenuItems.forEach(li => {
      li.addEventListener('click', () => {
        mainMenuItems.forEach(v => v.classList.remove('active'));
        li.classList.add('active');
        const key = li.dataset.menu;
        bgLayer.style.backgroundImage = `url('${bgImages[key]}')`;
        renderMidMenus(key);
        subWrap.innerHTML = '';
      });
    });

    function renderMidMenus(mainKey) {
      const mids = Object.keys(menuHierarchy[mainKey] || {});
      if (mids.length === 0) {
        midWrap.innerHTML = '<div class="midmenu-item">중분류 없음</div>';
        return;
      }

      midWrap.innerHTML = '';
      mids.forEach((mid, i) => {
        const el = document.createElement('div');
        el.className = 'midmenu-item';
        el.dataset.mid = mid;
        el.dataset.parent = mainKey;
        el.textContent = mid;
        el.style.opacity = '0';
        el.style.transform = 'translateY(-20px)';
        el.style.transition = `all 0.4s ease ${i * 0.1}s`;

        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 10);

        el.addEventListener('click', () => {
          midWrap.querySelectorAll('.midmenu-item').forEach(v => v.classList.remove('active'));
          el.classList.add('active');
          renderSubMenus(el.dataset.parent, el.dataset.mid);
        });
        midWrap.appendChild(el);
      });
    }

    function renderSubMenus(mainKey, midKey) {
      const subs = menuHierarchy[mainKey][midKey] || [];
      subWrap.innerHTML = subs.map(sub =>
        `<div class="submenu-item"><a href="${sub.url}">${sub.name}</a></div>`
      ).join('');
    }

    function clearGnb() {
      midWrap.innerHTML = '';
      subWrap.innerHTML = '';
      mainMenuItems.forEach(v => v.classList.remove('active'));
      bgLayer.style.backgroundImage = 'none';
    }
});


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

document.addEventListener('DOMContentLoaded', function() {
  // 1) 스크롤 텍스트(in-view) 관찰
  const txt = document.getElementById('scrollText');
  if (txt) {
    const ioText = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    ioText.observe(txt);
  }

  // 2) 슬라이더(in-view) 관찰
  const sliderEl = document.querySelector('.newsMain .Main-slider');
  if (sliderEl) {
    const ioSlider = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    ioSlider.observe(sliderEl);
  }

  // 3) Slick 슬라이더 초기화 (centerMode + centerPadding 적용)
  $('.newsMain .Main-slider > ul.list').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    adaptiveHeight: false,
    centerMode: false, // 센터 모드 비활성화
    centerPadding: '0px', // 센터 패딩 초기화
    slide: 'li'
  });
});




