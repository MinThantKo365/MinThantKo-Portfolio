// ============================================
// 🎯 SIDEBAR FUNCTIONALITY
// ============================================

const navToggle = document.getElementById('nav-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Sidebar
function toggleSidebar() {
  if (!sidebar || !sidebarOverlay || !navToggle) return;
  
  sidebar.classList.toggle('active');
  sidebarOverlay.classList.toggle('active');
  navToggle.classList.toggle('active');
  document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

// Close Sidebar
function closeSidebar() {
  if (!sidebar || !sidebarOverlay || !navToggle) return;
  
  sidebar.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  navToggle.classList.remove('active');
  document.body.style.overflow = '';
}

// Event Listeners
if (navToggle) {
  navToggle.addEventListener('click', toggleSidebar);
}

if (sidebarClose) {
  sidebarClose.addEventListener('click', closeSidebar);
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking on a link
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    setTimeout(closeSidebar, 300);
  });
});

// ============================================
// 🔗 SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    
    if (target) {
      // Get the fixed header height
      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 80;
      
      // Calculate the target position accounting for fixed header
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update active states
      const allLinks = document.querySelectorAll('.nav-link, .sidebar-link');
      allLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    }
  });
});

// ============================================
// 📍 ACTIVE MENU HIGHLIGHT
// ============================================

const sections = document.querySelectorAll("section, div[id]");
const allNavLinks = document.querySelectorAll(".nav-link, .sidebar-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });
  allNavLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// ============================================
// 📜 NAVBAR SCROLL EFFECT
// ============================================

const navbarCustom = document.querySelector('.navbar-custom');
window.addEventListener('scroll', () => {
  if (navbarCustom) {
    if (window.scrollY > 50) {
      navbarCustom.classList.add('scrolled');
    } else {
      navbarCustom.classList.remove('scrolled');
    }
  }
});

// ============================================
// ⬆️ SCROLL-TO-TOP BUTTON
// ============================================

const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTopBtn";
scrollBtn.innerHTML = `<i class="fa fa-chevron-up" aria-hidden="true"></i>`;
scrollBtn.style.cssText = `
  position: fixed; 
  bottom: 30px; 
  right: 30px;
  display: none; 
  background: #46b077; 
  color: white;
  border: none; 
  padding: 0;
  border-radius: 50%; 
  cursor: pointer; 
  font-size: 18px;
  z-index: 999; 
  width: 50px; 
  height: 50px;
  display: flex; 
  align-items: center; 
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(70, 176, 119, 0.3);
`;

document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("mouseenter", () => {
  scrollBtn.style.background = "#388e5c";
  scrollBtn.style.transform = "scale(1.1)";
});

scrollBtn.addEventListener("mouseleave", () => {
  scrollBtn.style.background = "#46b077";
  scrollBtn.style.transform = "scale(1)";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});

// ============================================
// ✨ FADE-IN ANIMATION ON SCROLL
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
});

// ============================================
// 🌊 WATER RIPPLE EFFECT
// ============================================

function createWaterRipple(event) {
  const ripple = document.createElement('span');
  const rect = event.currentTarget.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(70, 176, 119, 0.4) 0%, transparent 70%);
    transform: scale(0);
    animation: waterRipple 0.6s ease-out;
    pointer-events: none;
    z-index: 1000;
  `;
  
  event.currentTarget.style.position = 'relative';
  event.currentTarget.style.overflow = 'hidden';
  event.currentTarget.appendChild(ripple);
  
  setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation style
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes waterRipple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Add ripple to interactive elements
document.querySelectorAll('.btn4, .bg-light, .nav-link, .sidebar-link').forEach(element => {
  element.addEventListener('click', createWaterRipple);
});

// ============================================
// 🌊 SMOOTH WAVE MOTION ON SCROLL
// ============================================

let lastScrollTop = 0;
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const sections = document.querySelectorAll('section');
  
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible) {
      const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
      const waveOffset = Math.sin(scrollProgress * Math.PI * 2 + index) * 3;
      section.style.transform = `translateY(${waveOffset}px)`;
      section.style.transition = 'transform 0.1s ease-out';
    }
  });
  
  lastScrollTop = scrollTop;
});

// ============================================
// 🚀 SMOOTH PAGE LOAD
// ============================================

window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});
