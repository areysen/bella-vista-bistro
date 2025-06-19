// DOM Elements
const header = document.querySelector(".header");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksArray = document.querySelectorAll(".nav-links a");

// Intersection Observer for animations
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Unobserve after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

// Mobile Menu Toggle
mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");

  // Animate hamburger to X
  const spans = mobileMenuToggle.querySelectorAll("span");
  spans.forEach((span) => span.classList.toggle("active"));
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".nav-container") &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    const spans = mobileMenuToggle.querySelectorAll("span");
    spans.forEach((span) => span.classList.remove("active"));
  }
});

// Smooth scroll for navigation links
navLinksArray.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const headerHeight = header.offsetHeight;

    // Calculate scroll position
    const scrollPosition = targetSection.offsetTop - headerHeight;

    // Smooth scroll to target
    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      const spans = mobileMenuToggle.querySelectorAll("span");
      spans.forEach((span) => span.classList.remove("active"));
    }
  });
});

// Header background change on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add/remove background when scrolling down/up
  if (currentScroll > 50) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "var(--shadow-sm)";
  } else {
    header.style.background = "transparent";
    header.style.boxShadow = "none";
  }

  // Update last scroll position
  lastScroll = currentScroll;
});

// Active link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const headerHeight = header.offsetHeight;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - headerHeight - 20;
    const sectionBottom = sectionTop + section.offsetHeight;
    const currentScroll = window.pageYOffset;
    const sectionId = section.getAttribute("id");

    if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
      navLinksArray.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
});
