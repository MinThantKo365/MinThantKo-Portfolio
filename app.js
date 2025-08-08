document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// 2. Active menu highlight while scrolling
const sections = document.querySelectorAll("section, div[id]");
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// 3. Scroll-to-top button with Font Awesome icon
const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTopBtn";
scrollBtn.innerHTML = `<i class="fa fa-chevron-up" aria-hidden="true"></i>`;
scrollBtn.style.cssText = `
  position: fixed; bottom: 30px; right: 30px;
  display: none; background: black; color: #46b077;
  border: 2px solid #46b077; padding: 0;
  border-radius: 50%; cursor: pointer; font-size: 18px;
  z-index: 1000; width: 45px; height: 45px;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.3s ease;
`;
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("mouseenter", () => {
  scrollBtn.style.background = "#46b077";
  scrollBtn.style.color = "black";
});
scrollBtn.addEventListener("mouseleave", () => {
  scrollBtn.style.background = "black";
  scrollBtn.style.color = "#46b077";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});


// 4. Card hover effect with JS
document.querySelectorAll("#card-all").forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.03)";
    card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
    card.style.boxShadow = "";
  });
});

// 5. Fade-in animation on scroll
const fadeElements = document.querySelectorAll(".fade-in");

function fadeInOnScroll() {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();