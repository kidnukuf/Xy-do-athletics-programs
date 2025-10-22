// XY-DO Athletic Programs - Dashboard Page
document.addEventListener('DOMContentLoaded', async function() {
    // Require authentication
    if (!requireAuth()) {
        return;
    }

    // Get current user
    const user = api.getUser();
    
    if (!user) {
        // Try to fetch user data
        try {
            const response = await api.getMe();
            if (response.data) {
                api.setUser(response.data);
                loadDashboard(response.data);
            }
        } catch (error) {
            console.error('Error loading user:', error);
            window.location.href = 'login.html';
        }
    } else {
        loadDashboard(user);
    }
});

function loadDashboard(user) {
    // Update welcome message
    const welcomeElement = document.getElementById('welcomeUser');
    if (welcomeElement) {
        welcomeElement.textContent = user.name || 'User';
    }

    // Update user role display
    const roleElement = document.getElementById('userRole');
    if (roleElement) {
        const roleText = user.role === 'coach' ? 'Coach' : 'Athlete';
        roleElement.textContent = roleText;
    }

    // Show/hide content based on role
    if (user.role === 'coach') {
        showCoachContent();
    } else {
        showAthleteContent();
    }

    // Load weekly content
    loadWeeklyContent(user);

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function showCoachContent() {
    const coachSections = document.querySelectorAll('.coach-only');
    coachSections.forEach(section => {
        section.style.display = 'block';
    });

    const athleteSections = document.querySelectorAll('.athlete-only');
    athleteSections.forEach(section => {
        section.style.display = 'none';
    });
}

function showAthleteContent() {
    const athleteSections = document.querySelectorAll('.athlete-only');
    athleteSections.forEach(section => {
        section.style.display = 'block';
    });

    const coachSections = document.querySelectorAll('.coach-only');
    coachSections.forEach(section => {
        section.style.display = 'none';
    });
}

async function loadWeeklyContent(user) {
    try {
        const response = await api.getContent();
        
        if (response.data && response.data.length > 0) {
            displayWeeklyContent(response.data, user.role);
        } else {
            // Show placeholder content
            displayPlaceholderContent(user.role);
        }
    } catch (error) {
        console.error('Error loading content:', error);
        displayPlaceholderContent(user.role);
    }
}

function displayWeeklyContent(content, role) {
    const contentContainer = document.getElementById('weeklyContentContainer');
    if (!contentContainer) return;

    // Filter content by role
    const roleContent = content.filter(item => item.role === role || item.role === 'both');

    if (roleContent.length === 0) {
        displayPlaceholderContent(role);
        return;
    }

    let html = '<div class="content-grid">';
    
    roleContent.forEach(item => {
        html += `
            <div class="content-card">
                <h3>Week ${item.week}: ${item.title}</h3>
                <p>${item.description}</p>
                <a href="weekly_content.html?week=${item.week}" class="btn btn-primary">View Content</a>
            </div>
        `;
    });

    html += '</div>';
    contentContainer.innerHTML = html;
}

function displayPlaceholderContent(role) {
    const contentContainer = document.getElementById('weeklyContentContainer');
    if (!contentContainer) return;

    const roleText = role === 'coach' ? 'coaches' : 'athletes';
    
    contentContainer.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-basketball-ball" style="font-size: 3rem; color: var(--primary-gold); margin-bottom: 1rem;"></i>
            <h3>Welcome to XY-DO Athletic Programs!</h3>
            <p>Weekly training content for ${roleText} will be available soon.</p>
            <p>Check back regularly for new drills, videos, and development resources.</p>
        </div>
    `;
}

