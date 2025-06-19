/**
 * Bella Vista Bistro - Main JavaScript
 *
 * This script handles all interactive functionality including:
 * - Header transparency and scroll effects
 * - Mobile menu interactions
 * - Smooth scrolling navigation
 * - Menu filtering system
 * - Contact form validation
 * - Intersection Observer animations
 * - Parallax effects
 */

// ===== DOM Element References =====
// Header and Navigation
const header = document.querySelector(".header");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navLinksArray = document.querySelectorAll(".nav-links a");

// Menu filtering elements
const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

// Contact form elements
const contactForm = document.getElementById("contactForm");

// ===== Intersection Observer for Animations =====
/**
 * Configuration for the Intersection Observer
 * - root: null (viewport)
 * - threshold: 0.1 (10% visibility triggers callback)
 * - rootMargin: "0px" (no margin)
 */
const observerOptions = {
  root: null,
  threshold: 0.1,
  rootMargin: "0px",
};

/**
 * Intersection Observer instance
 * Handles fade-in animations for elements as they enter the viewport
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll(".fade-in").forEach((element) => {
  observer.observe(element);
});

// ===== Mobile Menu Functionality =====
/**
 * Toggle mobile menu visibility and hamburger icon animation
 */
mobileMenuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuToggle.classList.toggle("active");

  // Animate hamburger to X
  const spans = mobileMenuToggle.querySelectorAll("span");
  spans.forEach((span) => span.classList.toggle("active"));
});

/**
 * Close mobile menu when clicking outside
 * Improves user experience by preventing accidental menu persistence
 */
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

// ===== Smooth Scroll Navigation =====
/**
 * Handle smooth scrolling for navigation links
 * Accounts for fixed header height and closes mobile menu
 */
navLinksArray.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const headerHeight = header.offsetHeight;

    // Calculate scroll position accounting for header height
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

// ===== Header Scroll Effects =====
/**
 * Add/remove header background and shadow on scroll
 * Improves readability when content scrolls behind header
 */
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// ===== Active Link Highlighting =====
/**
 * Update active navigation link based on scroll position
 * Highlights current section in navigation
 */
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

// ===== Menu Filtering System =====
/**
 * Handle menu category filtering with animations
 * Smoothly transitions items in/out based on category
 */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Handle the filtering with animations
    menuItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.style.display = "block";
        // Reset opacity and transform for animation
        item.style.opacity = "0";
        item.style.transform = "scale(0.8)";
        // Trigger animation
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1)";
        }, 10);
      } else {
        item.style.display = "none";
      }
    });
  });
});

// ===== Contact Form Handling =====
/**
 * Handle contact form submission with validation
 * Includes:
 * - Required field validation
 * - Email format validation
 * - Phone number format validation (optional)
 * - Success/error message display
 */
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage("Please fill in all required fields.", "error");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFormMessage("Please enter a valid email address.", "error");
      return;
    }

    // Phone validation (if provided)
    if (phone) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""))) {
        showFormMessage("Please enter a valid phone number.", "error");
        return;
      }
    }

    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      showFormMessage(
        "Thank you for your message! We'll get back to you soon.",
        "success"
      );
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 2000);
  });
}

/**
 * Display form submission messages
 * @param {string} message - The message to display
 * @param {string} type - Message type ('success' or 'error')
 */
function showFormMessage(message, type) {
  // Remove existing messages
  const existingMessage = document.querySelector(".form-message");
  if (existingMessage) {
    existingMessage.remove();
  }

  // Create new message element
  const messageElement = document.createElement("div");
  messageElement.className = `form-message ${type}`;
  messageElement.textContent = message;

  // Style the message
  messageElement.style.padding = "var(--spacing-md)";
  messageElement.style.marginTop = "var(--spacing-md)";
  messageElement.style.borderRadius = "var(--border-radius-md)";
  messageElement.style.fontWeight = "500";

  // Set color scheme based on message type
  if (type === "success") {
    messageElement.style.backgroundColor = "#d4edda";
    messageElement.style.color = "#155724";
    messageElement.style.border = "1px solid #c3e6cb";
  } else {
    messageElement.style.backgroundColor = "#f8d7da";
    messageElement.style.color = "#721c24";
    messageElement.style.border = "1px solid #f5c6cb";
  }

  // Insert message after form
  contactForm.parentNode.insertBefore(messageElement, contactForm.nextSibling);

  // Remove message after 5 seconds
  setTimeout(() => {
    if (messageElement.parentNode) {
      messageElement.remove();
    }
  }, 5000);
}

// ===== Parallax Effect =====
/**
 * Create parallax scrolling effect for hero section background
 * Adds depth and visual interest to the hero section
 */
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroBackground = document.querySelector(".hero-background");

  if (heroBackground) {
    heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Ripple effect for buttons
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    const button = e.target;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
});

// Add ripple effect styles
const rippleStyles = document.createElement("style");
rippleStyles.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyles);

// Lazy loading for images
const images = document.querySelectorAll("img");
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.remove("lazy");
      imageObserver.unobserve(img);
    }
  });
});

images.forEach((img) => {
  if (img.dataset.src) {
    imageObserver.observe(img);
  }
});

// Smooth reveal animations for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

// Observe sections for reveal animations
document.querySelectorAll("section").forEach((section) => {
  revealObserver.observe(section);
});

// Add reveal animation styles
const revealStyles = document.createElement("style");
revealStyles.textContent = `
  section {
    opacity: 0;
    transform: translateY(50px);
    transition: all 0.8s ease;
  }
  
  section.revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyles);
