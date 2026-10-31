// a-ccord — shared interactions

document.addEventListener('DOMContentLoaded', () => {
  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });
    navLinks.querySelectorAll('a, button').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  /* Inquiry modal (replaces mailto links on CTA buttons) */
  const inquiryTemplates = {
    project: {
      title: '프로젝트 문의',
      desc: '아래 이메일로 문의해 주세요. 다음 내용을 포함해 주시면 더 빠르게 답변드립니다.',
      items: ['회사명', '업종', '관심 서비스 (맡기기·함께하기)', '예산', '희망 시기', '문의 내용'],
      mailto: 'mailto:strategy@lmtbkrs.com?subject=%5B%EC%97%90%EC%9D%B4%EC%BD%94%EB%93%9C%20%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%20%EB%AC%B8%EC%9D%98%5D',
    },
    education: {
      title: '교육 문의',
      desc: '아래 이메일로 문의해 주세요. 다음 내용을 포함해 주시면 더 빠르게 답변드립니다.',
      items: ['이름', '업종', '수강 인원', '관심 과정', '희망 일정'],
      mailto: 'mailto:strategy@lmtbkrs.com?subject=%5B%EC%97%90%EC%9D%B4%EC%BD%94%EB%93%9C%20%EA%B5%90%EC%9C%A1%20%EB%AC%B8%EC%9D%98%5D',
    },
  };

  const modal = document.getElementById('inquiry-modal');
  if (modal) {
    const titleEl = modal.querySelector('#modal-title');
    const descEl = modal.querySelector('#modal-desc');
    const listEl = modal.querySelector('#modal-template');
    const mailtoEl = modal.querySelector('#modal-mailto');
    const closeEl = modal.querySelector('.modal-close');
    let lastFocused = null;

    const onKeydown = (e) => { if (e.key === 'Escape') closeModal(); };

    function openModal(type) {
      const t = inquiryTemplates[type] || inquiryTemplates.project;
      titleEl.textContent = t.title;
      descEl.textContent = t.desc;
      listEl.innerHTML = t.items.map((i) => `<li>${i}</li>`).join('');
      mailtoEl.href = t.mailto;
      lastFocused = document.activeElement;
      modal.hidden = false;
      closeEl.focus();
      document.addEventListener('keydown', onKeydown);
    }
    function closeModal() {
      modal.hidden = true;
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }

    document.querySelectorAll('[data-inquiry]').forEach((btn) => {
      btn.addEventListener('click', () => openModal(btn.getAttribute('data-inquiry')));
    });
    closeEl.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* Count-up numbers (e.g. stat-number) */
  const countEls = document.querySelectorAll('[data-count-to]');
  if (countEls.length) {
    const animateCount = (el) => {
      const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
      const suffix = el.getAttribute('data-count-suffix') || '';
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if ('IntersectionObserver' in window) {
      const countIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 }
      );
      countEls.forEach((el) => countIo.observe(el));
    } else {
      countEls.forEach((el) => animateCount(el));
    }
  }

  /* Back to top */
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener(
      'scroll',
      () => {
        backToTop.classList.toggle('visible', window.scrollY > 500);
      },
      { passive: true }
    );
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

  /* Email copy buttons */
  document.querySelectorAll('[data-copy-email]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const email = btn.getAttribute('data-copy-email');
      try {
        await navigator.clipboard.writeText(email);
        const original = btn.textContent;
        btn.textContent = '복사됨';
        setTimeout(() => { btn.textContent = original; }, 1600);
      } catch (e) {
        /* clipboard unavailable — no-op */
      }
    });
  });

  /* Industry filter tabs (industry.html) */
  const tabs = document.querySelectorAll('.filter-tab');
  const groups = document.querySelectorAll('.industry-group');
  if (tabs.length && groups.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        groups.forEach((group) => {
          const show = target === 'all' || group.getAttribute('data-category') === target;
          if (show) {
            group.style.display = '';
            group.style.opacity = '0';
            group.style.transform = 'translateY(8px)';
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                group.style.opacity = '1';
                group.style.transform = 'translateY(0)';
              });
            });
          } else {
            group.style.opacity = '0';
            group.style.transform = 'translateY(8px)';
            setTimeout(() => {
              if (group.style.opacity === '0') group.style.display = 'none';
            }, 220);
          }
        });
      });
    });
  }
});
