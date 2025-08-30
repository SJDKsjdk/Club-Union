document.addEventListener('DOMContentLoaded', () => {
  /* ===========================
     1. Hero Slider Script
   =========================== */
  const heroSlider = document.querySelector('.hero-slider');
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
    sliderContainer.style.transform = `translateX(-${currentSlide * 100 / totalSlides}%)`;

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
      if (span1 && span1.dataset.color) {
        span1.style.color = span1.dataset.color;
      } else if (span1) {
        span1.style.color = '#FFFFFF';
      }
    }

    setTimeout(() => {
      if (text1) setTimeout(() => text1.classList.add('show'), 200);
      if (text2) setTimeout(() => text2.classList.add('show'), 600);
      if (text3) setTimeout(() => text3.classList.add('show'), 1000);
    }, 50);

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

  setTimeout(() => {
    heroSlider.classList.add('slider-initialized');
  }, 100);


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
     2. GNB Overlay Script (REVISED FOR SLIDING PANELS)
   =========================== */
  const menuBtn = document.getElementById('menuBtn');
  const gnbMenu = document.getElementById('gnbMenu');
  const closeBtn = document.querySelector('.btn-mgnb-close');
  const mainMenu = document.getElementById('mainMenu');
  const mainMenuPanel = document.getElementById('mainMenuPanel');
  const midMenuPanel = document.getElementById('midMenuPanel');
  const subMenuPanel = document.getElementById('subMenuPanel');
  const bgLayer = document.getElementById('gnbBg');

  const panels = [mainMenuPanel, midMenuPanel, subMenuPanel];
 
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
        { name: '소개', url: 'introduce' }, { name: '연혁', url: 'history' }, { name: '조직도', url: 'introduce' },
      ],
      '공약보고': [{ name: '회장단 공약', url: 'introduce' }],
      '로고/슬로건': [{ name: '공식 로고', url: 'logo' }, { name: '슬로건', url: 'logo' }]
    },
    Clubs: {
      '동아리 분과': [
        { name: '공연예술분과', url: 'clubs' }, { name: '과학기술분과', url: 'clubs' }, { name: '기악예술분과', url: 'clubs' },
        { name: '사회공헌분과', url: 'clubs' }, { name: '스포츠분과', url: 'clubs' }, { name: '전시창작분과', url: 'clubs' },
        { name: '학술분과', url: 'clubs' }
      ]
    },
    Notification: {
      '공지사항': [{ name: '안내사항', url: '/univ/status' }, { name: '일반공지', url: '/univ/status' }],
      '자료실': [{ name: '가등록 동아리 신청서', url: '/univ/president' }, { name: '회칙 및 규정', url: '/univ/president' }]
    },
    Service: {
      '물품대여서비스': [{ name: '이용 방법', url: 'help' }, { name: '대여 목록', url: 'help' }],
      '상주': [{ name: '상주 활동 소개', url: 'help' }],
      '제휴업체': [{ name: '업체 목록', url: 'help' }, { name: '업체 혜택 소개', url: 'help' }]
    },
    Communication: {
      'SNS': [
        { name: '카카오톡 오픈채팅 바로가기', url: 'https://open.kakao.com/o/goqQFNkh' },
        { name: '인스타그램 바로가기', url: 'https://www.instagram.com/ku_club_union/' },
      ],
      '위치': [{ name: '오시는 길', url: 'https://www.google.com/maps/place/고려대학교+세종캠퍼스+학생회관/data=!3m1!4b1!4m6!3m5!1s0x357ad2c9b054dd75:0x641e42fdcccfe16f!8m2!3d36.610424!4d127.2896703!16s%2Fg%2F11sskr3kpv?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D' }]
    }
  };

  function navigateTo(level, context = {}) {
    panels.forEach((panel, i) => {
      panel.classList.remove('is-active', 'is-parent');
      if (i < level) {
        panel.classList.add('is-parent');
      } else if (i === level) {
        panel.classList.add('is-active');
      }
    });

    // Desktop: make sure parent panels are visible
    if (window.innerWidth >= 1024) {
      panels.forEach((panel, i) => {
        if (i <= level) panel.classList.add('is-active');
      });
    }
  }
 
  function resetMenu() {
    navigateTo(0);
    setTimeout(() => {
        midMenuPanel.innerHTML = '';
        subMenuPanel.innerHTML = '';
        mainMenu.querySelectorAll('li').forEach(li => li.classList.remove('active'));
        bgLayer.classList.remove('visible');
    }, 500); // Wait for transition to finish
  }

  menuBtn.addEventListener('click', () => {
    gnbMenu.classList.add('active');
    menuBtn.classList.add('hidden');
    document.body.style.overflow = 'hidden';
    navigateTo(0);
  });

  closeBtn.addEventListener('click', () => {
    gnbMenu.classList.remove('active');
    menuBtn.classList.remove('hidden');
    document.body.style.overflow = '';
    resetMenu();
  });

  mainMenu.addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
   
    mainMenu.querySelectorAll('li').forEach(item => item.classList.remove('active'));
    li.classList.add('active');
   
    const mainKey = li.dataset.menu;
   
    // Update background
    bgLayer.style.backgroundImage = `url('${bgImages[mainKey]}')`;
    bgLayer.classList.add('visible');

    // Render mid-menu
    const midMenus = menuHierarchy[mainKey];
    if (!midMenus || Object.keys(midMenus).length === 0) {
      midMenuPanel.innerHTML = '<div class="midmenu-list"><div class="midmenu-item">하위 메뉴가 없습니다.</div></div>';
    } else {
      const midMenuHTML = `
        <div class="gnb-back-btn" data-level="0">뒤로 가기</div>
        <div class="midmenu-list">
          ${Object.keys(midMenus).map(midKey => `
            <div class="midmenu-item" data-main-key="${mainKey}" data-mid-key="${midKey}">${midKey}</div>
          `).join('')}
        </div>
      `;
      midMenuPanel.innerHTML = midMenuHTML;
    }
   
    navigateTo(1);
  });

  midMenuPanel.addEventListener('click', (e) => {
    if (e.target.classList.contains('gnb-back-btn')) {
        navigateTo(parseInt(e.target.dataset.level));
        return;
    }

    const midItem = e.target.closest('.midmenu-item');
    if (!midItem) return;

    midMenuPanel.querySelectorAll('.midmenu-item').forEach(item => item.classList.remove('active'));
    midItem.classList.add('active');

    const { mainKey, midKey } = midItem.dataset;
    const subMenus = menuHierarchy[mainKey][midKey];

    if (!subMenus || subMenus.length === 0) {
        subMenuPanel.innerHTML = '<div class="submenu-list"><div class="submenu-item"><a>하위 메뉴가 없습니다.</a></div></div>';
    } else {
        const subMenuHTML = `
            <div class="gnb-back-btn" data-level="1">뒤로 가기</div>
            <div class="submenu-list">
                ${subMenus.map(item => `
                    <div class="submenu-item"><a href="${item.url}">${item.name}</a></div>
                `).join('')}
            </div>
        `;
        subMenuPanel.innerHTML = subMenuHTML;
    }

    navigateTo(2);
  });

  subMenuPanel.addEventListener('click', (e) => {
      if (e.target.classList.contains('gnb-back-btn')) {
          navigateTo(parseInt(e.target.dataset.level));
      }
  });


  /* ===========================
     3. Meteor Animation Script
   =========================== */
  // ... (기존 코드와 동일하여 생략)
  const canvas = document.getElementById('meteor-canvas');
  if (canvas) { /* ... */ }

  /* ===========================
     4. Scroll Text Animation Script
   =========================== */
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

  /* ===========================
     5. Custom Gallery Script (Final Version)
   =========================== */
  const gallery = document.getElementById('gallery');
  if (gallery) {
      let isDown = false;
      let startX = 0;
      let scroll0 = 0;
      let isDragging = false;
      let lastTap = 0;

      gallery.addEventListener('dragstart', e => e.preventDefault());

      gallery.addEventListener('pointerdown', e => {
        isDown = true;
        startX = e.clientX;
        scroll0 = gallery.scrollLeft;
        gallery.setPointerCapture(e.pointerId);
        gallery.classList.add('dragging');
        isDragging = false; 
      });

      gallery.addEventListener('pointermove', e => {
        if (!isDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 10) { 
          isDragging = true;
        }
        gallery.scrollLeft = scroll0 - dx * 1.2;
      });

      gallery.addEventListener('pointerup', e => {
        if (!isDown) return;
       
        if (!isDragging) {
          toggleOverlay(e);
        }
       
        isDown = false;
        gallery.releasePointerCapture(e.pointerId);
        gallery.classList.remove('dragging');
        snapToCard();
        isDragging = false;
      }, true);

      gallery.addEventListener('pointercancel', e => {
        if (!isDown) return;
        isDown = false;
        gallery.releasePointerCapture(e.pointerId);
        gallery.classList.remove('dragging');
        isDragging = false;
      });

      function toggleOverlay(event) {
          const galleryItem = event.target.closest('.gallery-item');
          if (!galleryItem) return;

          const link = galleryItem.closest('a');
          const isOverlayActive = galleryItem.classList.contains('overlay-active');

          if (link && !isOverlayActive) {
              event.preventDefault();
          }

          document.querySelectorAll('.gallery-item').forEach(item => {
              if (item !== galleryItem) {
                  item.classList.remove('overlay-active');
              }
          });
         
          galleryItem.classList.toggle('overlay-active');
      }

      function snapToCard() {
        const card = gallery.querySelector('.gallery-item');
        if (!card) return;
        const gap = parseInt(getComputedStyle(gallery).gap) || 0;
        const step = card.offsetWidth + gap;
        const left = gallery.scrollLeft;
        const snapX = Math.round(left / step) * step;
        gallery.scrollTo({ left: snapX, behavior: 'smooth' });
      }
  }

  /* ===========================
     6. Custom Gallery Wrap Reveal Animation Script
   =========================== */
  const wrap = document.querySelector('.custom-gallery-wrap');
  if (!wrap) return;
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        wrap.classList.add('reveal');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  io.observe(wrap);
});