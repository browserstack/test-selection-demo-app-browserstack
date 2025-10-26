// API service for handling all fetch requests
const API = {
  // Generic fetch method with error handling
  async fetchData(endpoint, options = {}) {
    try {
      const response = await fetch(endpoint, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
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
    }),
    delete: (userId) => API.fetchData(`/api/users/${userId}`, {
      method: 'DELETE',
    }),
  },

  products: {
    getAll: () => API.fetchData('/api/products'),
    create: (productData) => API.fetchData('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    }),
  },

  tasks: {
    getAll: () => API.fetchData('/api/tasks'),
    create: (taskData) => API.fetchData('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    }),
    toggleComplete: (taskId, completed) => API.fetchData(`/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    }),
  },

  orders: {
    getAll: () => API.fetchData('/api/orders'),
    create: (orderData) => API.fetchData('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    }),
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
