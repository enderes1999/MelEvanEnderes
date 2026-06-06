// --- TYPING EFFECT ---
const typingText = [
    "Web Developer",
    "Project Manager",
    "Data Analyst",
    "Information Systems Student"
];

let textIndex = 0;
let charIndex = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect() {
    const typingSpan = document.getElementById("typing");
    if (!typingSpan) return;

    if (textIndex >= typingText.length) {
        textIndex = 0;
    }

    currentWord = typingText[textIndex];

    if (!isDeleting) {
        typingSpan.textContent = currentWord.substring(0, charIndex++);
        if (charIndex > currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1500); // Wait after completing word
            return;
        }
    } else {
        typingSpan.textContent = currentWord.substring(0, charIndex--);
        if (charIndex < 0) {
            isDeleting = false;
            textIndex++;
            charIndex = 0;
            setTimeout(typeEffect, 300); // Small pause before next word
            return;
        }
    }

    setTimeout(typeEffect, isDeleting ? 40 : 80);
}

// --- MOBILE NAVIGATION ---
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        menuBtn.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    // Close menu when clicking link
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            menuBtn.classList.remove("open");
            navLinks.classList.remove("open");
        });
    });
}

// --- SCROLL PROGRESS & NAVBAR SCROLL STATE ---
const scrollBar = document.getElementById("scrollBar");
const navbar = document.getElementById("navbar");
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
    // Scroll progress indicator
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        if (scrollBar) {
            scrollBar.style.width = scrolled + "%";
        }
    }

    // Sticky navbar backdrop state
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }

    // Scroll to Top Button Visibility
    if (topBtn) {
        if (window.scrollY > 300) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
});

// Scroll to Top action
if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// --- SCROLL REVEAL & SKILLS PROGRESS ANIMATION ---
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");

            // If it's the skills section, animate individual progress bars inside
            if (entry.target.id === "skills" || entry.target.classList.contains("skills-category")) {
                animateProgressBars(entry.target);
            }

            // Unobserve once active animation completes to avoid re-triggering
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

function animateProgressBars(parent) {
    const bars = parent.querySelectorAll(".skill-progress-fill");
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-width");
        bar.style.width = targetWidth;
    });
}

// --- NAV SECTION ACTIVE LINK HIGHLIGHTING ---
const sections = document.querySelectorAll("section");

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute("id");
            navItems.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${currentId}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.5,
    rootMargin: "-20% 0px -40% 0px"
});

sections.forEach(section => {
    navObserver.observe(section);
});

// --- CERTIFICATES LIGHTBOX MODAL ---
const certificates = document.querySelectorAll(".certificate-card");
const lightbox = document.getElementById("lightbox");
const modalImg = document.getElementById("modalImg");
const modalCaption = document.getElementById("modalCaption");
const modalClose = document.getElementById("modalClose");

if (certificates.length > 0 && lightbox && modalImg && modalCaption) {
    certificates.forEach(cert => {
        cert.addEventListener("click", () => {
            const imgSrc = cert.getAttribute("data-img");
            const caption = cert.getAttribute("data-caption");

            modalImg.src = imgSrc;
            modalCaption.textContent = caption;

            lightbox.classList.add("show");
            document.body.style.overflow = "hidden"; // Prevent background scroll
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("show");
        document.body.style.overflow = ""; // Re-enable scroll
        setTimeout(() => {
            modalImg.src = "";
            modalCaption.textContent = "";
        }, 300); // Matches transition duration
    };

    if (modalClose) {
        modalClose.addEventListener("click", closeLightbox);
    }

    // Close on clicking outer dark space
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox || e.target.classList.contains("modal-close")) {
            closeLightbox();
        }
    });

    // Close on Esc key
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("show")) {
            closeLightbox();
        }
    });
}

// --- SIMULATED CONTACT FORM SUBMISSION ---
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("formName").value.trim();
        const email = document.getElementById("formEmail").value.trim();
        const subject = document.getElementById("formSubject").value.trim();
        const message = document.getElementById("formMessage").value.trim();
        const submitBtn = contactForm.querySelector("button[type='submit']");
        const submitBtnText = submitBtn.querySelector("span");
        const submitBtnIcon = submitBtn.querySelector("i");

        if (!name || !email || !subject || !message) {
            formStatus.className = "form-status error";
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        // Visual loading state
        submitBtn.disabled = true;
        submitBtnText.textContent = "Sending...";
        submitBtnIcon.className = "fas fa-circle-notch fa-spin";
        formStatus.style.display = "none";

        // Simulate network API delay
        setTimeout(() => {
            // Restore button
            submitBtn.disabled = false;
            submitBtnText.textContent = "Send Message";
            submitBtnIcon.className = "fas fa-paper-plane";

            // Show Success Alert
            formStatus.className = "form-status success";
            formStatus.textContent = `Thank you, ${name}! Your message has been sent successfully. I will get back to you soon.`;
            formStatus.style.display = "block";

            // Reset form input values
            contactForm.reset();

            // Auto hide message after 6 seconds
            setTimeout(() => {
                formStatus.style.display = "none";
            }, 6000);
        }, 1500);
    });
}

// --- INITIALIZE ---
document.addEventListener("DOMContentLoaded", () => {
    // Run typing effect
    typeEffect();

    // Check initial scroll position to set nav scroll state
    if (navbar && window.scrollY > 50) {
        navbar.classList.add("scrolled");
    }
});
