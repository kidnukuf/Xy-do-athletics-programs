// XY-DO Athletic Programs - Login Page
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    if (isAuthenticated()) {
        window.location.href = 'dashboard.html';
        return;
    }

    const loginForm = document.getElementById('loginForm');
    const errorDiv = document.getElementById('loginError');
    const successDiv = document.getElementById('loginSuccess');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Clear previous messages
            if (errorDiv) errorDiv.style.display = 'none';
            if (successDiv) successDiv.style.display = 'none';

            // Get form data
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Validate
            if (!email || !password) {
                showError('Please enter both email and password');
                return;
            }

            // Show loading
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Logging in...';
            submitBtn.disabled = true;

            try {
                // Call API
                const response = await api.login(email, password);

                // Show success
                showSuccess('Login successful! Redirecting...');

                // Redirect to dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);

            } catch (error) {
                // Check if error is due to unverified email
                if (error.requiresVerification) {
                    showError('Please verify your email before logging in. Check your inbox for the verification link.');
                    
                    // Add a button to resend verification email
                    if (errorDiv) {
                        const resendBtn = document.createElement('button');
                        resendBtn.textContent = 'Resend Verification Email';
                        resendBtn.style.marginTop = '10px';
                        resendBtn.style.padding = '8px 16px';
                        resendBtn.style.backgroundColor = '#667eea';
                        resendBtn.style.color = 'white';
                        resendBtn.style.border = 'none';
                        resendBtn.style.borderRadius = '5px';
                        resendBtn.style.cursor = 'pointer';
                        resendBtn.onclick = () => {
                            window.location.href = `verify-pending.html?email=${encodeURIComponent(email)}`;
                        };
                        errorDiv.appendChild(document.createElement('br'));
                        errorDiv.appendChild(resendBtn);
                    }
                } else {
                    showError(error.message || 'Login failed. Please check your credentials.');
                }
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

