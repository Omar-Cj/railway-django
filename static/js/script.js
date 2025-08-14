// Django Template Demo - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Portfolio Filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // Update project count
                const visibleItems = document.querySelectorAll('.portfolio-item[style*="block"]').length;
                const totalProjectsElement = document.getElementById('total-projects');
                if (totalProjectsElement) {
                    totalProjectsElement.textContent = filter === 'all' ? '9' : visibleItems.toString();
                }
            });
        });
    }
    
    // Contact Form Enhancement
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Form validation
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fix the errors before submitting.', 'error');
            } else {
                showNotification('Submitting your message...', 'info');
            }
        });
    }
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';
        
        // Remove existing error styles
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required.';
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address.';
            }
        }
        
        // Message length validation
        if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            message = 'Message must be at least 10 characters long.';
        }
        
        // Add error styling and message
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.85rem';
            errorDiv.style.marginTop = '4px';
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    function showNotification(message, type = 'info') {
        // Remove existing notification
        const existing = document.querySelector('.notification');
        if (existing) {
            existing.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            zIndex: '10000',
            animation: 'slideIn 0.3s ease',
            maxWidth: '300px'
        });
        
        // Type-specific styling
        const colors = {
            info: '#17a2b8',
            error: '#dc3545',
            success: '#28a745'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    // Responsive breakpoint detection
    function updateBreakpointIndicator() {
        const width = window.innerWidth;
        const indicator = document.getElementById('current-breakpoint');
        const navState = document.getElementById('nav-state');
        
        if (indicator) {
            if (width <= 480) {
                indicator.textContent = 'Mobile';
            } else if (width <= 768) {
                indicator.textContent = 'Tablet';
            } else if (width <= 1024) {
                indicator.textContent = 'Desktop Small';
            } else {
                indicator.textContent = 'Desktop';
            }
        }
        
        if (navState) {
            navState.textContent = width <= 768 ? 'Mobile Menu Mode' : 'Desktop Mode';
        }
    }
    
    // Update on load and resize
    updateBreakpointIndicator();
    window.addEventListener('resize', updateBreakpointIndicator);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add animation classes when elements come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe cards and sections
    document.querySelectorAll('.feature-card, .portfolio-card, .info-card').forEach(card => {
        observer.observe(card);
    });
    
    // Enhanced form reset
    const resetButton = document.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function(e) {
            e.preventDefault();
            const form = this.closest('form');
            if (form) {
                // Reset form
                form.reset();
                
                // Remove error classes and messages
                form.querySelectorAll('.error').forEach(field => {
                    field.classList.remove('error');
                });
                form.querySelectorAll('.error-message').forEach(msg => {
                    msg.remove();
                });
                
                showNotification('Form has been reset.', 'info');
            }
        });
    }
});

// CSS Animations (added via JavaScript for better control)
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
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
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .error {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1) !important;
    }
`;

document.head.appendChild(style);