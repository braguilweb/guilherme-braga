// ============================================
// SMOOTH SCROLL & NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
    } else {
        navbar.style.backgroundColor = 'rgba(13, 13, 13, 0.8)';
    }
});


// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.expertise-card, .service-card, .contact-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Tecnologias animation
const techContainer = document.querySelector('.tech-marquee');
if (techContainer) {
    techContainer.style.opacity = '0';
    techContainer.style.transform = 'translateY(20px)';
    techContainer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(techContainer);
}

});



// ============================================
// PORTFOLIO CARD INTERACTIONS
// ============================================

// Ripple effect on portfolio cards
document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(166, 140, 0, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to stylesheet
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect on portfolio images
document.querySelectorAll('.portfolio-image img').forEach(img => {
    const card = img.closest('.portfolio-card');
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        img.style.transform = `scale(1.1) translate(${x * 10}px, ${y * 10}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Animated counter for portfolio views (simulated)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

document.querySelectorAll('.portfolio-card').forEach(card => {
    // 1. Quando o mouse ENTRA, tiramos o delay da transição para o movimento ficar instantâneo
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });

    // 2. O movimento 3D acompanhando o mouse
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculando a rotação (Ajustei os sinais para o card inclinar na direção certa)
        const rotateX = (centerY - y) / 20; 
        const rotateY = (x - centerX) / 20;
        
        // Aplica a rotação e mantém o card levantado (-8px)
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    // 3. Quando o mouse SAI, devolvemos a transição suave e limpamos o JS
    card.addEventListener('mouseleave', () => {
        // Devolve a transição do CSS para voltar suavemente
        card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease';
        
        // Limpa o estilo inline, devolvendo o controle total pro CSS original
        card.style.transform = ''; 
    });
});




//efeito de luz seguindo o mouse nas tecnologias

document.querySelectorAll('.tech-item').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.background = `
            radial-gradient(circle at ${x}px ${y}px,
            rgba(166,140,0,0.2),
            transparent 60%)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = 'rgba(255,255,255,0.02)';
    });
});

// ============================================
// MOBILE MENU LOGIC
// ============================================

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item, .mobile-cta');

if (mobileMenuBtn) {
    // 1. Abrir/Fechar ao clicar no ícone
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Troca o ícone de hambúrguer para um 'X'
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 2. Fechar o menu automaticamente ao clicar em qualquer link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Fechar o menu se o usuário clicar fora dele
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Keyboard navigation for buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            btn.click();
        }
    });
});

// ============================================
// PERFORMANCE: Lazy load images (if added in future)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// SCROLL TO TOP BUTTON (optional enhancement)
// ============================================

window.addEventListener('scroll', () => {
    // Add scroll-to-top button logic here if needed
});

// ============================================
// FORM VALIDATION (if contact form is added)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// ANALYTICS TRACKING (optional)
// ============================================

// Track page views and interactions
function trackEvent(eventName, eventData = {}) {
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const text = btn.textContent.trim();
        trackEvent('button_click', { button_text: text });
    });
});

// ============================================
// DARK MODE (already set as default)
// ============================================

// Ensure dark mode is always active
document.documentElement.style.colorScheme = 'dark';

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
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

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// ============================================
// INITIALIZATION
// ============================================

console.log('Guilherme Braga Agency - Site loaded successfully');
