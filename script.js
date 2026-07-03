/**
 * Portfolio — Main JavaScript
 */

(function () {
  'use strict';

  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileClose = document.getElementById('mobile-close');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const allNavLinks = [...navLinks, ...mobileNavLinks];
  const sections = document.querySelectorAll('section[id]');
  const revealElements = document.querySelectorAll('.reveal');
  const backToTop = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');
  const typingText = document.getElementById('typing-text');

  const TITLES = ['Full Stack Developer', 'Database Architect', 'Cloud Enthusiast'];
  let titleIndex = 0, charIndex = 0, isDeleting = false;

  const INITIAL_PROJECT_COUNT = 6;
  let showAllProjects = false;
  let revealObserver = null;
  let projectsAnimating = false;

  const PROJECTS_ANIM_DURATION = 650;

  function initProjectsToggle() {
    const toggleBtn = document.getElementById('projects-toggle');
    const toggleText = document.getElementById('projects-toggle-text');
    const extraCollapse = document.getElementById('projects-extra-collapse');
    const extraCards = document.querySelectorAll('.project-extra');
    if (!toggleBtn || !extraCollapse || !extraCards.length) return;

    function openProjects() {
      extraCollapse.setAttribute('aria-hidden', 'false');
      extraCollapse.classList.remove('is-closing');
      extraCollapse.classList.add('is-open');
      toggleBtn.classList.add('is-expanded');
      if (toggleText) toggleText.textContent = 'Show Less';

      extraCards.forEach(card => {
        if (revealObserver) revealObserver.observe(card);
      });

      setTimeout(() => {
        projectsAnimating = false;
        document.querySelector('.project-extra')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, PROJECTS_ANIM_DURATION + 200);
    }

    function closeProjects() {
      extraCollapse.classList.add('is-closing');
      extraCollapse.classList.remove('is-open');
      toggleBtn.classList.remove('is-expanded');
      if (toggleText) toggleText.textContent = 'See More';

      setTimeout(() => {
        extraCollapse.classList.remove('is-closing');
        extraCollapse.setAttribute('aria-hidden', 'true');
        projectsAnimating = false;
      }, PROJECTS_ANIM_DURATION + 150);
    }

    toggleBtn.addEventListener('click', () => {
      if (projectsAnimating) return;
      projectsAnimating = true;

      if (!showAllProjects) {
        showAllProjects = true;
        openProjects();
      } else {
        showAllProjects = false;
        closeProjects();
      }
    });
  }

  function typeEffect() {
    if (!typingText) return;
    const current = TITLES[titleIndex];
    let speed = isDeleting ? 40 : 80;

    if (isDeleting) {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % TITLES.length;
      speed = 500;
    }

    setTimeout(typeEffect, speed);
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    navbar?.classList.toggle('scrolled', scrollY > 20);
    backToTop?.classList.toggle('visible', scrollY > 400);
    updateActiveNav();
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        allNavLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  function smoothScrollTo(target) {
    const el = document.querySelector(target);
    if (!el) return;
    const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  function initSmoothScroll() {
    allNavLinks.forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) return;
        e.preventDefault();
        smoothScrollTo(href);
        closeMobileMenu();
      });
    });

    document.querySelectorAll('.footer-nav a, .hero-actions a[href^="#"]').forEach(link => {
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href?.startsWith('#')) return;
        e.preventDefault();
        smoothScrollTo(href);
      });
    });
  }

  function openMobileMenu() {
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    navToggle?.classList.add('active');
    navToggle?.setAttribute('aria-expanded', 'true');
    mobileMenu?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    navToggle?.classList.remove('active');
    navToggle?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initMobileMenu() {
    navToggle?.addEventListener('click', () => {
      mobileMenu?.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    });
    mobileClose?.addEventListener('click', closeMobileMenu);
    mobileOverlay?.addEventListener('click', closeMobileMenu);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
  }

  function initScrollReveal() {
    revealObserver = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal:not(.project-extra)').forEach(el => revealObserver.observe(el));
    initProjectsToggle();
  }

  function initBackToTop() {
    backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function initRipple() {
    document.querySelectorAll('.ripple-btn').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.classList.add('ripple');
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  const validators = {
    name: v => !v.trim() ? 'Name is required' : v.trim().length < 2 ? 'Name must be at least 2 characters' : '',
    email: v => !v.trim() ? 'Email is required' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Please enter a valid email' : '',
    subject: v => !v.trim() ? 'Subject is required' : '',
    message: v => !v.trim() ? 'Message is required' : v.trim().length < 10 ? 'Message must be at least 10 characters' : ''
  };

  function validateField(name, value) {
    const errorEl = document.getElementById(`${name}-error`);
    const inputEl = document.getElementById(name);
    const error = validators[name](value);
    if (errorEl) errorEl.textContent = error;
    if (inputEl) inputEl.classList.toggle('error', !!error);
    return !error;
  }

  function initContactForm() {
    if (!contactForm) return;
    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach(field => {
      const input = document.getElementById(field);
      input?.addEventListener('blur', () => validateField(field, input.value));
      input?.addEventListener('input', () => {
        if (input.classList.contains('error')) validateField(field, input.value);
      });
    });

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      if (!fields.every(f => validateField(f, document.getElementById(f).value))) return;

      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      formSuccess.hidden = true;

      await new Promise(r => setTimeout(r, 1800));

      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
      formSuccess.hidden = false;
      contactForm.reset();
      fields.forEach(f => {
        document.getElementById(f)?.classList.remove('error');
        const err = document.getElementById(`${f}-error`);
        if (err) err.textContent = '';
      });
    });
  }

  function init() {
    typeEffect();
    initSmoothScroll();
    initMobileMenu();
    initScrollReveal();
    initBackToTop();
    initRipple();
    initContactForm();
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();
