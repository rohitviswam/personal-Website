// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const APP_CFG = window.APP_CONFIG || {};
    const API_BASE = (APP_CFG.API_BASE || '').replace(/\/$/, ''); // no trailing slash
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

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

    // Smooth scrolling for anchor links (use CSS scroll-margin-top for offset)
    const smoothScroll = (e, targetId) => {
        const targetSection = document.querySelector(targetId);
        if (!targetSection) return;
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(e, targetId);
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                smoothScroll(e, targetId);
            }
        });
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Handling - Simple mailto implementation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const subject = formData.get('subject').trim();
            const message = formData.get('message').trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Create mailto link with all details
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
                'Sent from Rohit Viswam\'s Portfolio Website'
            ];
            
            const mailtoLink = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
            
            // Open default mail app
            window.location.href = mailtoLink;
            
            // Optional: Reset form after a short delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }    // Final fallback: compose an email in the user's mail client
    function fallbackToMailto(contactData) {
        const to = 'rohitviswam@gmail.com';
        const finalSubject = `Portfolio Contact: ${contactData.subject}`;
        const bodyLines = [
            `Name: ${contactData.name}`,
            `Email: ${contactData.email}`,
            `Subject: ${contactData.subject}`,
            '',
            'Message:',
            contactData.message,
            '',
            '--',
            'Sent from Rohit Viswam\'s Portfolio Website'
        ];
        
        const mailtoHref = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;
        
        try {
            window.location.href = mailtoHref;
            showFormStatus('📧 Opening your default email app to send the message...', 'info');
            
            // Auto-reset form after a delay (user likely sent via email client)
            setTimeout(() => {
                contactForm.reset();
                clearAllErrors();
                hideFormStatus();
            }, 3000);
            
        } catch (error) {
            showFormStatus('❌ Unable to open email client. Please email me directly at rohitviswam@gmail.com', 'error');
        }
    }

    function tryEmailJsOrMailto(name, email, subject, message) {
        const cfg = window.APP_CONFIG || {};
        const hasEmailJsCfg = cfg.EMAILJS_PUBLIC_KEY && cfg.EMAILJS_SERVICE_ID && cfg.EMAILJS_TEMPLATE_ID;
        if (window.emailjs && hasEmailJsCfg) {
            try {
                emailjs.init(cfg.EMAILJS_PUBLIC_KEY);
                emailjs.send(cfg.EMAILJS_SERVICE_ID, cfg.EMAILJS_TEMPLATE_ID, {
                    from_name: name,
                    from_email: email,
                    subject,
                    message
                }).then(() => {
                    showNotification('Message sent successfully. Thank you!', 'success');
                    contactForm.reset();
                }).catch(() => fallbackToMailto(name, email, subject, message));
            } catch (_) {
                fallbackToMailto(name, email, subject, message);
            }
        } else {
            fallbackToMailto(name, email, subject, message);
        }
    }

    function postToApi(url, body) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            mode: 'cors'
        }).then(async (res) => {
            if (!res.ok) {
                let errText = 'Failed';
                try { const j = await res.json(); errText = j.error || errText; } catch (_) {}
                throw new Error(errText);
            }
            return res.json();
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .timeline-item, .education-item, .project-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroTitle.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Skills progress animation
    function animateSkills() {
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach((skill, index) => {
            setTimeout(() => {
                skill.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    skill.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });
    }

    // Trigger skills animation when skills section is visible
    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    skillsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillsObserver.observe(skillsSection);
    }

    // Counter animation for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-item h3');
        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace('+', ''));
            const increment = target / 50;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = target + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.floor(current) + '+';
                }
            }, 50);
        });
    }

    // Trigger counter animation when about section is visible
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        aboutObserver.observe(aboutSection);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });

    // Auto close after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Theme toggle functionality (optional)
function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.contains('dark-theme');
    
    if (isDark) {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Lazy loading for images (when you add real images)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Performance optimization: debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
    // Add any scroll-heavy operations here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);
