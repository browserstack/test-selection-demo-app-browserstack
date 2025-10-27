import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Import services
import API from './services/api';
import ThemeUtils from './services/themeUtils';

// Import components
import Dashboard from './components/dashboard/Dashboard';
import Users from './components/users/Users';
import Products from './components/products/Products';
import Tasks from './components/tasks/Tasks';
import Orders from './components/orders/Orders';
import Search from './components/search/Search';
import FilesAndThemes from './components/themes/FilesAndThemes';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);
  
  // Theme state
  const [backgroundTheme, setBackgroundTheme] = useState('default');
  const [hasImageBackground, setHasImageBackground] = useState(false);

  // Fetch initial data when component mounts
  useEffect(() => {
    fetchMessage();
    fetchUsers();
    fetchProducts();
    fetchTasks();
    fetchOrders();
    fetchAnalytics();
    checkHealth();
  }, []);

  // Initialize default theme on mount
  useEffect(() => {
    const body = document.body;
    body.className = body.className.replace(/theme-\w+/g, '');
    body.classList.add('theme-default');
  }, []);

  const fetchMessage = async () => {
    try {
      const data = await API.system.getMessage();
      setMessage(data.message);
    } catch (error) {
      console.error('Error fetching message:', error);
      setMessage('Error connecting to backend');
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await API.users.getAll();
      setUsers(data.users || data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('Fetching products from /api/products');
      const data = await API.products.getAll();
      console.log('Products data received:', data);
      setProducts(data.products || data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await API.tasks.getAll();
      setTasks(data.tasks || data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await API.orders.getAll();
      setOrders(data.orders || data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const data = await API.system.getAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkHealth = async () => {
    try {
      const data = await API.system.getHealth();
      setHealth(data);
    } catch (error) {
      console.error('Error checking health:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Enhanced Full-Stack React App</h1>
        
        {/* Navigation */}
        <nav className="nav-tabs">
          {['dashboard', 'users', 'products', 'tasks', 'orders', 'search', 'files'].map(tab => (
            <button
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'files' ? 'Files & Themes' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Render the appropriate component based on active tab */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            message={message} 
            health={health} 
            analytics={analytics} 
          />
        )}

        {activeTab === 'users' && (
          <Users 
            users={users} 
            loading={loading} 
            fetchUsers={fetchUsers}
            fetchAnalytics={fetchAnalytics}
          />
        )}

        {activeTab === 'products' && (
          <Products 
            products={products} 
            loading={loading} 
            fetchProducts={fetchProducts}
            fetchAnalytics={fetchAnalytics}
          />
        )}

        {activeTab === 'tasks' && (
          <Tasks 
            tasks={tasks} 
            users={users}
            loading={loading} 
            fetchTasks={fetchTasks}
            fetchAnalytics={fetchAnalytics}
          />
        )}

        {activeTab === 'orders' && (
          <Orders 
            orders={orders} 
            users={users} 
            products={products} 
            loading={loading} 
            fetchOrders={fetchOrders}
            fetchProducts={fetchProducts}
            fetchAnalytics={fetchAnalytics}
          />
        )}

        {activeTab === 'search' && (
          <Search 
            loading={loading}
            setLoading={setLoading}
          />
        )}

        {activeTab === 'files' && (
          <FilesAndThemes 
            backgroundTheme={backgroundTheme}
            setBackgroundTheme={setBackgroundTheme}
            hasImageBackground={hasImageBackground}
            setHasImageBackground={setHasImageBackground}
          />
        )}
      </header>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
