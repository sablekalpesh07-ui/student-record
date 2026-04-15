// ============================================
// NAVIGATION & MOBILE MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Set active nav link based on current page
window.addEventListener('load', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================



// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.project-card, .skill-card, .education-item, .certification-card').forEach(el => {
    observer.observe(el);
});

// ============================================
// SMOOTH SCROLL TO TOP
// ============================================

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Create scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (!document.querySelector('.scroll-to-top')) {
            const scrollBtn = document.createElement('button');
            scrollBtn.classList.add('scroll-to-top');
            scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollBtn.addEventListener('click', scrollToTop);
            document.body.appendChild(scrollBtn);
        }
    } else {
        const scrollBtn = document.querySelector('.scroll-to-top');
        if (scrollBtn) {
            scrollBtn.remove();
        }
    }
});

// ============================================
// SKILL PROGRESS BARS ANIMATION
// ============================================

const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Trigger animation when skills section is visible
window.addEventListener('load', () => {
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateProgressBars();
                    skillsObserver.unobserve(entry.target);
                }
            });
        });
        
        skillsObserver.observe(skillsSection);
    }
});

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// EXPERTISE CARD HOVER EFFECT
// ============================================

document.querySelectorAll('.expertise-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ============================================
// PARTICLE EFFECT (Optional Enhancement)
// ============================================

const createParticles = (x, y) => {
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = [
            'var(--primary-color)',
            'var(--secondary-color)',
            'var(--accent-color)',
            'var(--neon-color)'
        ][Math.floor(Math.random() * 4)];
        
        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    }
};

// Add particles on button click
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (e.type === 'click') {
            createParticles(e.clientX, e.clientY);
        }
    });
});

// ============================================
// STAT COUNTER ANIMATION
// ============================================

const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    const duration = 2000; // 2 seconds
    const frameRate = 30; // 30 fps

    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / (duration / (1000 / frameRate));
        let current = 0;

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = stat.textContent; // Keep original format
                clearInterval(counter);
            } else {
                const displayValue = Math.floor(current);
                stat.textContent = displayValue + (stat.textContent.includes('+') ? '+' : 
                                                   stat.textContent.includes('%') ? '%' :
                                                   stat.textContent.includes('/') ? '/10' :
                                                   stat.textContent.includes(':') ? ':7' : '');
            }
        }, 1000 / frameRate);
    });
};

// Trigger counter animation when stats section is visible
window.addEventListener('load', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        });
        
        statsObserver.observe(statsSection);
    }
});

// ============================================
// CURSOR GLOW EFFECT (Premium Feature)
// ============================================

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // Update glow position for interactive elements
    document.querySelectorAll('.btn, .nav-link, .project-card').forEach(el => {
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        const distance = Math.hypot(x - elX, y - elY);

        if (distance < 100) {
            el.style.filter = `drop-shadow(0 0 ${20 - distance / 5}px rgba(102, 126, 234, 0.6))`;
        } else {
            el.style.filter = 'drop-shadow(none)';
        }
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }

    // Arrow keys for navigation (if needed)
    if (e.key === 'ArrowDown') {
        window.scrollBy({ top: 100, behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp') {
        window.scrollBy({ top: -100, behavior: 'smooth' });
    }
});

// ============================================
// LOCAL STORAGE - REMEMBER USER PREFERENCES
// ============================================

// Dark/Light mode toggle (if implemented)
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// ============================================
// PERFORMANCE MONITORING
// ============================================

if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

// ============================================
// ERROR HANDLING FOR IMAGES
// ============================================

document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', this.src);
        this.src = 'https://via.placeholder.com/400x250/667eea/764ba2?text=Image+Not+Found';
    });
});

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Focus visible for keyboard users
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ============================================
// UTILITY FUNCTION - SMOOTH ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// RANDOM GREETINGS
// ============================================

const greetings = [
    "Welcome back! 👋",
    "Great to see you! 🚀",
    "Ready to create something amazing? 💡",
    "Let's build something great! 🔨",
    "Welcome to my portfolio! ✨"
];

window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero-subtitle');
    if (heroSection) {
        console.log(greetings[Math.floor(Math.random() * greetings.length)]);
    }
});

// ============================================
// FORM INPUT VALIDATION ON CHANGE
// ============================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('change', function() {
        // Remove error on input change
        const errorId = this.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });

    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});

// ============================================
// EXPORT FUNCTIONS FOR REUSABILITY
// ============================================

window.portfolio = {
    scrollToTop,
    animateProgressBars,
    animateCounters,
    createParticles
};
