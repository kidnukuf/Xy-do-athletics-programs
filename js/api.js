// XY-DO Athletic Programs - API Configuration
const API_BASE_URL = 'https://5001-izoc0ue7wiktx4rz0hvij-bef9371f.manusvm.computer/api';

// API Helper Functions
const api = {
    // Get auth token from localStorage
    getToken() {
        return localStorage.getItem('token');
    },

    // Set auth token in localStorage
    setToken(token) {
        localStorage.setItem('token', token);
    },

    // Remove auth token
    removeToken() {
        localStorage.removeItem('token');
    },

    // Get current user from localStorage
    getUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    // Set current user
    setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Remove current user
    removeUser() {
        localStorage.removeItem('user');
    },

    // Make API request
    async request(endpoint, options = {}) {
        const token = this.getToken();
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const config = {
            ...options,
            headers
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    },

    // Auth endpoints
    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (data.token) {
            this.setToken(data.token);
            this.setUser(data.data);
        }
        
        return data;
    },

    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (data.token) {
            this.setToken(data.token);
            this.setUser(data.data);
        }
        
        return data;
    },

    async logout() {
        await this.request('/auth/logout');
        this.removeToken();
        this.removeUser();
    },

    async getMe() {
        const data = await this.request('/auth/me');
        if (data.data) {
            this.setUser(data.data);
        }
        return data;
    },

    // User endpoints
    async getUsers() {
        return await this.request('/users');
    },

    async getUser(id) {
        return await this.request(`/users/${id}`);
    },

    async updateUser(id, userData) {
        return await this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    },

    async deleteUser(id) {
        return await this.request(`/users/${id}`, {
            method: 'DELETE'
        });
    },

    // Team endpoints
    async getTeams() {
        return await this.request('/teams');
    },

    async getTeam(id) {
        return await this.request(`/teams/${id}`);
    },

    async createTeam(teamData) {
        return await this.request('/teams', {
            method: 'POST',
            body: JSON.stringify(teamData)
        });
    },

    async updateTeam(id, teamData) {
        return await this.request(`/teams/${id}`, {
            method: 'PUT',
            body: JSON.stringify(teamData)
        });
    },

    async deleteTeam(id) {
        return await this.request(`/teams/${id}`, {
            method: 'DELETE'
        });
    },

    // Content endpoints
    async getContent(week) {
        const query = week ? `?week=${week}` : '';
        return await this.request(`/content${query}`);
    },

    async getContentById(id) {
        return await this.request(`/content/${id}`);
    },

    async createContent(contentData) {
        return await this.request('/content', {
            method: 'POST',
            body: JSON.stringify(contentData)
        });
    },

    async updateContent(id, contentData) {
        return await this.request(`/content/${id}`, {
            method: 'PUT',
            body: JSON.stringify(contentData)
        });
    },

    async deleteContent(id) {
        return await this.request(`/content/${id}`, {
            method: 'DELETE'
        });
    },

    // Feedback endpoints
    async submitFeedback(feedbackData) {
        return await this.request('/feedback', {
            method: 'POST',
            body: JSON.stringify(feedbackData)
        });
    },

    async getFeedback() {
        return await this.request('/feedback');
    }
};

// Check if user is authenticated
function isAuthenticated() {
    return !!api.getToken();
}

// Redirect to login if not authenticated
function requireAuth() {
    if (!isAuthenticated()) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Logout function
async function handleLogout() {
    try {
        await api.logout();
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        // Force logout even if API call fails
        api.removeToken();
        api.removeUser();
        window.location.href = 'index.html';
    }
}



    // Video endpoints
    async getVideos(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/videos?${params}`);
    },

    async getVideo(id) {
        return await this.request(`/videos/${id}`);
    },

    async createVideo(videoData) {
        return await this.request('/videos', {
            method: 'POST',
            body: JSON.stringify(videoData)
        });
    },

    async updateVideo(id, videoData) {
        return await this.request(`/videos/${id}`, {
            method: 'PUT',
            body: JSON.stringify(videoData)
        });
    },

    async deleteVideo(id) {
        return await this.request(`/videos/${id}`, {
            method: 'DELETE'
        });
    },

    // Message endpoints
    async getMessages(filters = {}) {
        const params = new URLSearchParams(filters);
        return await this.request(`/messages?${params}`);
    },

    async getMessage(id) {
        return await this.request(`/messages/${id}`);
    },

    async createMessage(messageData) {
        return await this.request('/messages', {
            method: 'POST',
            body: JSON.stringify(messageData)
        });
    },

    async replyToMessage(id, content) {
        return await this.request(`/messages/${id}/reply`, {
            method: 'POST',
            body: JSON.stringify({ content })
        });
    },

    async likeMessage(id) {
        return await this.request(`/messages/${id}/like`, {
            method: 'POST'
        });
    },

    async updateMessage(id, messageData) {
        return await this.request(`/messages/${id}`, {
            method: 'PUT',
            body: JSON.stringify(messageData)
        });
    },

    async deleteMessage(id) {
        return await this.request(`/messages/${id}`, {
            method: 'DELETE'
        });
    },

    async pinMessage(id) {
        return await this.request(`/messages/${id}/pin`, {
            method: 'PUT'
        });
    }
};

