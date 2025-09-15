// Elegant Glamorous JavaScript

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and effects
    initScrollAnimations();
    initParallaxEffects();
    initLuxuryEffects();
    initNavbarEffects();
    
    // Start countdown if element exists
    if (document.getElementById('countdown')) {
        const threeHours = 3 * 60 * 60;
        startCountdown(threeHours);
    }
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    // Add luxury cursor effect
    initLuxuryCursor();
    
    // Initialize smooth page transitions
    initPageTransitions();
});

// Countdown Timer with elegant animation
function startCountdown(duration) {
    let timer = duration;
    const countdownElement = document.getElementById('countdown');
    
    const interval = setInterval(function() {
        const hours = parseInt(timer / 3600, 10);
        const minutes = parseInt((timer % 3600) / 60, 10);
        const seconds = parseInt(timer % 60, 10);

        const displayHours = hours < 10 ? "0" + hours : hours;
        const displayMinutes = minutes < 10 ? "0" + minutes : minutes;
        const displaySeconds = seconds < 10 ? "0" + seconds : seconds;

        if (countdownElement) {
            countdownElement.style.transition = 'all 0.3s ease';
            countdownElement.textContent = displayHours + ":" + displayMinutes + ":" + displaySeconds;
            
            // Add pulsing effect for last 10 seconds
            if (timer <= 10 && timer > 0) {
                countdownElement.style.animation = 'pulse 1s infinite';
            }
        }

        if (--timer < 0) {
            timer = 10800; // Reset to 3 hours
            if (countdownElement) {
                countdownElement.style.animation = '';
            }
        }
    }, 1000);
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add staggered animation delay for grid items
                if (element.classList.contains('card')) {
                    const cards = document.querySelectorAll('.card');
                    const index = Array.from(cards).indexOf(element);
                    element.style.animationDelay = `${index * 0.1}s`;
                }
                
                element.classList.add('fade-in-up');
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all cards, sections, and animated elements
    document.querySelectorAll('.card, .section h2, .hero-content > *, .map-info > *').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effects for luxury feel
function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrollY = window.pageYOffset;
        
        // Hero parallax - REMOVED for better performance
        
        // Floating elements - REMOVED for cleaner look
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

// Luxury visual effects
function initLuxuryEffects() {
    // Sparkle effect on hover for CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('mouseenter', createSparkleEffect);
        button.addEventListener('click', function(e) {
            // Only redirect to Booksy if button has onclick="redirectToBooksy()" attribute
            if (this.getAttribute('onclick') === 'redirectToBooksy()') {
                e.preventDefault();
                createRippleEffect(e);
                setTimeout(() => redirectToBooksy(), 300);
            } else {
                // For other buttons, just create ripple effect and let normal navigation happen
                createRippleEffect(e);
                // Don't prevent default - let the href work normally
            }
        });
    });
    
    // Elegant hover effects for cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 40px 80px rgba(182, 144, 135, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3)';
        });
    });
}

// Navbar scroll effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.pageYOffset;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
    });
}

// Luxury cursor effect
function initLuxuryCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'luxury-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #E0D0CD, #B69087);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Expand cursor on hover over interactive elements
    document.querySelectorAll('a, button, .card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Page transitions
function initPageTransitions() {
    // Fade in page on load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Smooth page transitions for internal links
    document.querySelectorAll('a[href^="pages/"]:not([href*="booksy"])').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 250);
        });
    });
}

// Sparkle effect
function createSparkleEffect(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #E0D0CD;
            pointer-events: none;
            border-radius: 50%;
            animation: sparkleFloat 1s ease-out forwards;
        `;
        
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        
        button.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Ripple effect
function createRippleEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

// Image lazy loading with elegant fade-in
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Booking redirect with elegant transition
function redirectToBooksy() {
    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #B69087, #E0D0CD);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        letter-spacing: 2px;
    `;
    overlay.innerHTML = 'Przekierowywanie do rezerwacji...';
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        window.open('https://booksy.com/pl-pl/104985_zakatek-piekna_salon-kosmetyczny_11501_debica#ba_s=seo', '_blank');
        overlay.remove();
    }, 800);
}

// Smooth scrolling for anchor links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Form validation with elegant styling
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff6b6b';
            field.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
            isValid = false;
        } else {
            field.style.borderColor = '#E0D0CD';
            field.style.boxShadow = '0 0 10px rgba(224, 208, 205, 0.2)';
        }
    });
    
    return isValid;
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggleButton = document.querySelector('.mobile-menu-toggle');
    
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !toggleButton.contains(e.target)) {
        toggleMobileMenu();
    }
});

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes sparkleFloat {
        0% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
        }
        100% { 
            opacity: 0; 
            transform: translateY(-20px) scale(0); 
        }
    }
    
    @keyframes ripple {
        0% { transform: scale(0); opacity: 1; }
        100% { transform: scale(1); opacity: 0; }
    }
    
    .fade-in-up {
        animation: fadeInUp 0.8s ease-out both;
    }
    
    .luxury-cursor {
        transition: all 0.1s ease;
    }
`;
document.head.appendChild(style);