// Smooth cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Active nav link on scroll with Intersection Observer
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

function setActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// Simple form submission simulation with modern feedback
const form = document.getElementById('callbackForm');
const formMessage = document.getElementById('formMessage');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!name || !email || !message) {
            showFormMessage('Пожалуйста, заполните все поля', 'error');
            return;
        }

        // Simulate sending request
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Отправка...';
        submitBtn.disabled = true;

        setTimeout(() => {
            showFormMessage(`Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.`, 'success');
            form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1200);
    });
}

function showFormMessage(text, type) {
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.style.color = type === 'success' ? '#86efac' : '#f87171';
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }
}

// Scroll reveal animation for service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s ease';
    revealObserver.observe(card);
});

// Initial animation for hero badge
window.addEventListener('load', () => {
    const heroBadge = document.querySelector('.hero-badge');
    if (heroBadge) {
        heroBadge.style.animation = 'fadeInUp 0.8s ease';
    }
    document.querySelectorAll('.hero-title, .hero-desc, .hero-buttons, .hero-stats').forEach((el, idx) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.6s ease forwards ${idx * 0.1 + 0.2}s`;
    });
});

// Additional keyframes dynamic injection for fadeInUp if not in CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    .hero-title, .hero-desc, .hero-buttons, .hero-stats {
        opacity: 1;
    }
`;
document.head.appendChild(styleSheet);