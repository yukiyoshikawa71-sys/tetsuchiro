/* ===================================
   てつ加圧カイロ整体院
   JavaScript
   =================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* --- ハンバーガーメニュー（aria-expanded対応） --- */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const body = document.body;

  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  body.appendChild(overlay);

  function openMenu() {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
    hamburger.setAttribute("aria-label", "メニューを閉じる");
    nav.classList.add("open");
    overlay.classList.add("active");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "メニューを開く");
    nav.classList.remove("open");
    overlay.classList.remove("active");
    body.style.overflow = "";
  }

  function toggleMenu() {
    if (nav.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  hamburger.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", closeMenu);

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Escキーでメニューを閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      hamburger.focus();
    }
  });

  /* --- ヒーロースライダー --- */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");
  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");
  let currentSlide = 0;
  let slideInterval;
  const SLIDE_DURATION = 5000;

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlideFn() {
    goToSlide(currentSlide + 1);
  }

  function prevSlideFn() {
    goToSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlideFn, SLIDE_DURATION);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  nextBtn.addEventListener("click", () => { nextSlideFn(); resetAutoSlide(); });
  prevBtn.addEventListener("click", () => { prevSlideFn(); resetAutoSlide(); });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      goToSlide(parseInt(dot.dataset.index, 10));
      resetAutoSlide();
    });
  });

  // キーボード操作（スライダーにフォーカスがある時）
  const heroSection = document.getElementById("hero");
  heroSection.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prevSlideFn(); resetAutoSlide(); }
    if (e.key === "ArrowRight") { nextSlideFn(); resetAutoSlide(); }
  });

  startAutoSlide();

  /* --- スクロール時フェードインアニメーション --- */
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -60px 0px", threshold: 0.1 });

  fadeElements.forEach((el) => fadeObserver.observe(el));

  /* --- ヘッダー スクロール時の影 --- */
  const header = document.getElementById("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = "0 2px 16px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.boxShadow = "0 1px 8px rgba(0, 0, 0, 0.06)";
    }
  }, { passive: true });

  /* --- 固定CTA: スクロール後に表示 --- */
  const fixedCta = document.getElementById("fixedCta");
  if (fixedCta) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        fixedCta.style.transform = "translateY(0)";
      } else {
        fixedCta.style.transform = "translateY(100%)";
      }
    }, { passive: true });
    // 初期状態は非表示
    fixedCta.style.transform = "translateY(100%)";
    fixedCta.style.transition = "transform 0.3s ease";
  }

  /* --- ダミーリンク(#)のpreventDefault --- */
  document.querySelectorAll('a[href="#"]').forEach((a) => {
    // data-placeholder があるものはCTAなのでスキップ
    if (!a.dataset.placeholder) {
      a.addEventListener("click", (e) => e.preventDefault());
    }
  });

});
