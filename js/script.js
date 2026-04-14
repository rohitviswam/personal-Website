// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const APP_CFG = window.APP_CONFIG || {};
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    const smoothScroll = (e, targetId) => {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(e, targetId);
            }
        });
    });

    // Navbar: scrolled class + active link highlighting
    window.addEventListener('scroll', function() {
        // Scrolled class for shadow
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active nav link
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            if (pageYOffset >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    });

    // ===== SCROLL REVEAL =====
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Add reveal class to elements and observe them with staggered delays
    const revealGroups = [
        { selector: '.stat-item',            delay: [0.05, 0.15, 0.25] },
        { selector: '.skill-category',        delay: [0, 0.1, 0.2, 0.3] },
        { selector: '.timeline-item',         delay: [0, 0.1, 0.2] },
        { selector: '.education-item',        delay: [0, 0.15] },
        { selector: '.cert-category',         delay: [0] },
        { selector: '.achievements-category', delay: [0.1] },
        { selector: '.publications',          delay: [0.1] },
        { selector: '.project-card',          delay: [0, 0.1, 0.2, 0, 0.1, 0.2] },
        { selector: '.contact-item',          delay: [0, 0.1, 0.2] },
        { selector: '.section-header',        delay: [0] },
    ];

    revealGroups.forEach(({ selector, delay }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
            el.classList.add('reveal');
            const d = delay[Math.min(i, delay.length - 1)] || 0;
            if (d > 0) el.style.transitionDelay = `${d}s`;
            revealObserver.observe(el);
        });
    });

    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== COUNTER ANIMATION (About stats) =====
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutSection);
    }

    function animateCounters() {
        document.querySelectorAll('.stat-item h3').forEach(counter => {
            const raw = counter.innerText.replace('+', '').replace('.', '');
            const target = parseFloat(counter.innerText.replace('+', ''));
            if (isNaN(target)) return;

            const hasDecimal = counter.innerText.includes('.');
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = (hasDecimal ? target.toFixed(1) : Math.round(target)) + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = (hasDecimal ? current.toFixed(1) : Math.floor(current)) + '+';
                }
            }, 40);
        });
    }

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const name    = formData.get('name').trim();
            const email   = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();

            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const to = 'rohitviswam@gmail.com';
            const mailtoSubject = `Portfolio Contact: ${subject}`;
            const bodyLines = [
                `Name: ${name}`,
                `Email: ${email}`,
                `Subject: ${subject}`,
                '',
                'Message:',
                message,
                '',
                '--',
                "Sent from Rohit Viswam's Portfolio Website"
            ];

            window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

            setTimeout(() => contactForm.reset(), 1000);
        });
    }
});

// ===== MODAL POPUP =====
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const modalClose = document.querySelector('.modal-close');
    const projectContactBtns = document.querySelectorAll('.project-contact-btn');
    const modalForm = document.getElementById('modalContactForm');

    projectContactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectCard  = this.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const buttonText   = this.textContent.trim();

            document.getElementById('modal-subject').value = `Inquiry about ${projectTitle} - ${buttonText}`;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    modalClose.addEventListener('click', closeModal);

    window.addEventListener('click', event => {
        if (event.target === modal) closeModal();
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

    modalForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name    = document.getElementById('modal-name').value;
        const email   = document.getElementById('modal-email').value;
        const subject = document.getElementById('modal-subject').value;
        const message = document.getElementById('modal-message').value;

        const to = 'rohitviswam@gmail.com';
        const mailtoSubject = `Portfolio Contact: ${subject}`;
        const bodyLines = [
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            '',
            'Message:',
            message,
            '',
            '--',
            "Sent from Rohit Viswam's Portfolio Website"
        ];

        window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

        setTimeout(() => {
            closeModal();
            modalForm.reset();
        }, 500);
    });
});

// ===== UTILITIES =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white; padding: 1rem 1.5rem; border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15); z-index: 10001;
        transform: translateX(400px); transition: transform 0.3s ease;
        max-width: 300px; font-family: 'Inter', sans-serif; font-size: 0.9rem;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 50);

    const remove = () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => { if (document.body.contains(notification)) document.body.removeChild(notification); }, 300);
    };

    notification.addEventListener('click', remove);
    setTimeout(remove, 5000);
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
});
