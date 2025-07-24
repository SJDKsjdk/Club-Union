document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
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
          { name: '조직도', url: 'introduce' },
        ],
        '공약보고': [
          { name: '회장단 공약', url: 'introduce' }
        ],
        '로고/슬로건': [
          { name: '공식 로고', url: 'logo' },
          { name: '슬로건', url: 'logo' }
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
          { name: '이용 방법', url: 'help' },
          { name: '대여 목록', url: 'help' },
        ],
        '상주': [
          { name: '상주 활동 소개', url: 'help' }
        ],
        '제휴업체': [
          { name: '업체 목록', url: 'help'},
          { name: '업체 혜택 소개', url: 'help'}
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
=======
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
        { name: '연혁', url: 'history' },
        { name: '조직도', url: 'introduce' },
      ],
      '공약보고': [
        { name: '회장단 공약', url: 'introduce' }
      ],
      '로고/슬로건': [
        { name: '공식 로고', url: 'logo' },
        { name: '슬로건', url: 'logo' }
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
        { name: '이용 방법', url: 'help' },
        { name: '대여 목록', url: 'help' },
      ],
      '상주': [
        { name: '상주 활동 소개', url: 'help' }
      ],
      '제휴업체': [
        { name: '업체 목록', url: 'help' },
        { name: '업체 혜택 소개', url: 'help' }
      ]
    },
    Communication: {
      'SNS': [
        { name: '카카오톡 오픈채팅 바로가기', url: 'https://open.kakao.com/o/goqQFNkh' },
        { name: '인스타그램 바로가기', url: 'https://www.instagram.com/ku_club_union/' },
      ],
      '위치': [
        { name: '오시는 길', url: 'https://www.google.com/maps/place/고려대학교+세종캠퍼스+학생회관/data=!3m1!4b1!4m6!3m5!1s0x357ad2c9b054dd75:0x641e42fdcccfe16f!8m2!3d36.610424!4d127.2896703!16s%2Fg%2F11sskr3kpv?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D' }
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
>>>>>>> fec4f30730cab62eb7779e40c6fd68d308a42c58
});


const canvas = document.getElementById('meteor-canvas');
if (canvas) {
<<<<<<< HEAD
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
=======
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

document.addEventListener('DOMContentLoaded', function () {
>>>>>>> fec4f30730cab62eb7779e40c6fd68d308a42c58
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
});


// 여기서 부터 이미지 컨테이너 부분 (2025.04.23 수정정)

/* --- 갤러리 스크립트 (main.js 아래 부분) ------------------ */
const gallery = document.getElementById('gallery');

<<<<<<< HEAD
let isDown   = false;
let startX   = 0;
let scroll0  = 0;
=======
let isDown = false;
let startX = 0;
let scroll0 = 0;
>>>>>>> fec4f30730cab62eb7779e40c6fd68d308a42c58

/* 1) 이미지 기본 drag 차단 */
gallery.addEventListener('dragstart', e => e.preventDefault());

/* 2) pointer down ─ 모든 입력(마우스·터치·펜) 대응 */
gallery.addEventListener('pointerdown', e => {
<<<<<<< HEAD
  isDown  = true;
  startX  = e.clientX;
=======
  isDown = true;
  startX = e.clientX;
>>>>>>> fec4f30730cab62eb7779e40c6fd68d308a42c58
  scroll0 = gallery.scrollLeft;
  gallery.setPointerCapture(e.pointerId);
  gallery.classList.add('dragging');
});

/* 3) pointer move */
gallery.addEventListener('pointermove', e => {
  if (!isDown) return;
  const dx = e.clientX - startX;
  gallery.scrollLeft = scroll0 - dx * 1.2;   // 감도 계수
});

/* 4) pointer up / cancel */
['pointerup', 'pointercancel'].forEach(type => {
  gallery.addEventListener(type, e => {
    if (!isDown) return;
    isDown = false;
    gallery.releasePointerCapture(e.pointerId);
    gallery.classList.remove('dragging');
    snapToCard();
  });
});

/* 5) 카드 폭 단위로 스냅 정렬 */
<<<<<<< HEAD
function snapToCard(){
  const card = gallery.querySelector('.gallery-item');
  if (!card) return;
  const gap   = parseInt(getComputedStyle(gallery).gap) || 0;
  const step  = card.offsetWidth + gap;                 // 한 장 + 간격
  const left  = gallery.scrollLeft;
=======
function snapToCard() {
  const card = gallery.querySelector('.gallery-item');
  if (!card) return;
  const gap = parseInt(getComputedStyle(gallery).gap) || 0;
  const step = card.offsetWidth + gap;                 // 한 장 + 간격
  const left = gallery.scrollLeft;
>>>>>>> fec4f30730cab62eb7779e40c6fd68d308a42c58
  const snapX = Math.round(left / step) * step;
  gallery.scrollTo({ left: snapX, behavior: 'smooth' });
}

/* --- 갤러리 등장 애니메이션 ----------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.querySelector('.custom-gallery-wrap');
  if (!wrap) return;

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wrap.classList.add('reveal');   // 2초 뒤 애니메이션 시작
        obs.unobserve(entry.target);    // 한 번만 실행
      }
    });
  }, { threshold: 0.2 });

  io.observe(wrap);
});
