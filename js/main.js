/**
 * XYDO ATHLETIC PROGRAMS
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize any components that need setup
    initializeComponents();
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Set up form handlers
    setupForms();
});

/**
 * Initialize UI components
 */
function initializeComponents() {
    // Add animation classes to elements
    document.querySelectorAll('.content-section, .feature-card, .blog-card, .testimonial-card').forEach((section, index) => {
        // Stagger animations for a nicer effect
        setTimeout(() => {
            section.classList.add('fade-in');
        }, index * 100);
    });
    
    // Initialize rating systems if they exist
    const ratingContainers = document.querySelectorAll('.rating-container');
    if (ratingContainers.length > 0) {
        ratingContainers.forEach(container => {
            setupRatingSystem(container);
        });
    }
    
    // Initialize progress bars if they exist
    const progressBars = document.querySelectorAll('.progress-bar');
    if (progressBars.length > 0) {
        progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress') || '0';
            bar.style.width = `${progress}%`;
        });
    }
}

/**
 * Set up global event listeners
 */
function setupEventListeners() {
    // Path selection hover effects
    const pathOptions = document.querySelectorAll('.path-option');
    if (pathOptions.length > 0) {
        pathOptions.forEach(option => {
            option.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            });
            
            option.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Blog card hover effects
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
        blogCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // Logout button handler (if present on page)
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Simulate logout
            showNotification('You have been logged out successfully.', 'success');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }
}

/**
 * Initialize animations
 */
function initializeAnimations() {
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
}

/**
 * Set up form handlers
 */
function setupForms() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Your message has been sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            
            // Reset form
            newsletterForm.reset();
        });
    }
    
    // Login form
    const loginForm = document.getElementById('user-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate login
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        });
    }
    
    // Admin login form
    const adminLoginForm = document.getElementById('admin-login-form');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate admin login
            showNotification('Admin login successful! Redirecting to admin dashboard...', 'success');
            
            // Redirect to admin dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'admin/dashboard.html';
            }, 1500);
        });
    }
    
    // Registration form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate registration
            showNotification('Registration successful! Please check your email to verify your account.', 'success');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        });
    }
}

/**
 * Handle star ratings
 * @param {HTMLElement} container - The rating container element
 */
function setupRatingSystem(container) {
    const stars = container.querySelectorAll('.star');
    const contentId = container.dataset.content;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = this.dataset.value;
            
            // Clear all active stars
            stars.forEach(s => {
                s.classList.remove('active');
            });
            
            // Set active stars up to the clicked one
            for (let i = 1; i <= value; i++) {
                container.querySelector(`.star[data-value="${i}"]`).classList.add('active');
            }
            
            // In a real implementation, this would send the rating to a server
            console.log(`Content ${contentId} rated ${value} stars`);
            
            // Show confirmation
            showNotification(`Thank you for rating this content ${value} stars!`, 'success');
        });
        
        // Hover effect
        star.addEventListener('mouseenter', function() {
            const value = this.dataset.value;
            
            // Highlight stars up to the hovered one
            for (let i = 1; i <= value; i++) {
                container.querySelector(`.star[data-value="${i}"]`).style.color = 'var(--primary-gold)';
            }
        });
        
        star.addEventListener('mouseleave', function() {
            // Reset stars to their active/inactive state
            stars.forEach(s => {
                if (s.classList.contains('active')) {
                    s.style.color = 'var(--primary-gold)';
                } else {
                    s.style.color = '#ccc';
                }
            });
        });
    });
}

/**
 * Update user progress
 * @param {string} section - The section identifier
 * @param {boolean} completed - Whether the section is completed
 */
function updateProgress(section, completed) {
    // In a real implementation, this would update the user's progress on the server
    console.log(`Section ${section} ${completed ? 'completed' : 'in progress'}`);
    
    // Update UI to reflect progress
    const progressBar = document.querySelector(`.progress-bar[data-section="${section}"]`);
    if (progressBar) {
        progressBar.style.width = completed ? '100%' : '50%';
    }
    
    // Show notification
    if (completed) {
        showNotification(`Congratulations! You've completed the ${section} section.`, 'success');
    }
}

/**
 * Show notification to user
 * @param {string} message - The notification message
 * @param {string} type - The notification type (success, error, info)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Set up close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Toggle visibility of an element
 * @param {string} elementId - The ID of the element to toggle
 */
function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        if (element.style.display === 'none' || getComputedStyle(element).display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
}

/**
 * Generate a referral link
 * @returns {string} - The generated referral link
 */
function generateReferralLink() {
    // In a real implementation, this would generate a unique referral code
    const referralCode = 'XYD' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Return the referral link
    return `https://xydoathletic.com/register?ref=${referralCode}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 */
function copyToClipboard(text) {
    // Create a temporary input element
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    
    // Select and copy the text
    input.select();
    document.execCommand('copy');
    
    // Remove the temporary input element
    document.body.removeChild(input);
    
    // Show notification
    showNotification('Copied to clipboard!', 'success');
}
