// XY-DO Athletic Programs - Register Page
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    // Get role from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const roleParam = urlParams.get('role');
    
    const registerForm = document.getElementById('registerForm');
    const errorDiv = document.getElementById('registerError');
    const successDiv = document.getElementById('registerSuccess');

    // Set role if provided
    if (roleParam && document.getElementById('role')) {
        document.getElementById('role').value = roleParam;
    }

    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear previous messages
            if (errorDiv) errorDiv.style.display = 'none';
            if (successDiv) successDiv.style.display = 'none';

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const role = document.getElementById('role') ? document.getElementById('role').value : 'player';
            const team = document.getElementById('team') ? document.getElementById('team').value : '';

            // Validate
            if (!name || !email || !password) {
                showError('Please fill in all required fields');
                return;
            }

            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }

            if (password.length < 6) {
                showError('Password must be at least 6 characters');
                return;
            }

            // Show loading
            const submitBtn = registerForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Creating Account...';
            submitBtn.disabled = true;

            try {
                // Prepare user data
                const userData = {
                    name,
                    email,
                    password,
                    role
                };

                if (team) {
                    userData.team = team;
                }

                // Call API
                const response = await api.register(userData);

                // Show success
                showSuccess('Account created successfully! Redirecting to dashboard...');

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } catch (error) {
                showError(error.message || 'Registration failed. Please try again.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    function showError(message) {
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
            errorDiv.style.padding = '1rem';
            errorDiv.style.marginBottom = '1rem';
            errorDiv.style.backgroundColor = '#ff4444';
            errorDiv.style.color = 'white';
            errorDiv.style.borderRadius = '5px';
        }
    }

    function showSuccess(message) {
        if (successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
            successDiv.style.padding = '1rem';
            successDiv.style.marginBottom = '1rem';
            successDiv.style.backgroundColor = '#44ff44';
            successDiv.style.color = '#000';
            successDiv.style.borderRadius = '5px';
        }
    }
});

