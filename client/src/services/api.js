// API service for handling all fetch requests, with CSRF token support

let csrfToken = null;

// Utility to fetch and cache CSRF token
async function getCsrfToken() {
  if (!csrfToken) {
    const response = await fetch('/csrf-token');
    const data = await response.json();
    csrfToken = data.csrfToken;
  }
  return csrfToken;
}

// Utility to reset CSRF token on error (e.g. 403, token expired)
function resetCsrfToken() {
  csrfToken = null;
}

// Helper to include CSRF token in request headers for mutation requests
async function withCsrf(headers = {}) {
  const token = await getCsrfToken();
  return { ...headers, 'csrf-token': token };
}

const API = {
  // Generic fetch method with error handling and CSRF support for mutation
  async fetchData(endpoint, options = {}, requireCsrf = false) {
    try {
      if (requireCsrf) {
        options.headers = await withCsrf(options.headers || {});
      }
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        // Reset CSRF token if forbidden (possible token expiry)
        if (response.status === 403) resetCsrfToken();
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('API Error:', endpoint, error);
      throw error;
    }
  },

  // API endpoints grouped by feature
  users: {
    getAll: () => API.fetchData('/api/users'),
    create: (userData) => API.fetchData('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    }, true),
    delete: (userId) => API.fetchData(`/api/users/${userId}`, {
      method: 'DELETE',
    }, true),
  },

  products: {
    getAll: () => API.fetchData('/api/products'),
    create: (productData) => API.fetchData('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }, true),
  },

  tasks: {
    getAll: () => API.fetchData('/api/tasks'),
    create: (taskData) => API.fetchData('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    }, true),
    toggleComplete: (taskId, completed) => API.fetchData(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    }, true),
  },

  orders: {
    getAll: () => API.fetchData('/api/orders'),
    create: (orderData) => API.fetchData('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }, true),
  },

  search: {
    query: (searchTerm) => API.fetchData(`/api/search?q=${encodeURIComponent(searchTerm)}`),
  },

  system: {
    getMessage: () => API.fetchData('/api'),
    getHealth: () => API.fetchData('/api/health'),
    getAnalytics: () => API.fetchData('/api/analytics'),
  },
};

export default API;
