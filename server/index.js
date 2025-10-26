const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// In-memory storage (replace with database in production)
let users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: new Date().toISOString() },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: new Date().toISOString() },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user', createdAt: new Date().toISOString() }
];

let products = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics', stock: 50, description: 'High-performance laptop' },
  { id: 2, name: 'Smartphone', price: 699.99, category: 'Electronics', stock: 100, description: 'Latest smartphone model' },
  { id: 3, name: 'Headphones', price: 199.99, category: 'Electronics', stock: 75, description: 'Wireless noise-canceling headphones' },
  { id: 4, name: 'Coffee Maker', price: 89.99, category: 'Home', stock: 30, description: 'Automatic coffee maker' },
  { id: 5, name: 'Book', price: 14.99, category: 'Education', stock: 200, description: 'Programming fundamentals book' }
];

let orders = [];
let tasks = [
  { id: 1, title: 'Complete project setup', completed: false, priority: 'high', assignedTo: 1, createdAt: new Date().toISOString() },
  { id: 2, title: 'Write documentation', completed: true, priority: 'medium', assignedTo: 2, createdAt: new Date().toISOString() },
  { id: 3, title: 'Test API endpoints', completed: false, priority: 'high', assignedTo: 3, createdAt: new Date().toISOString() }
];

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
// Health check endpoint for PM2 and monitoring
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    status: 'OK',
    pid: process.pid,
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.0'
  };
  
  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    healthCheck.status = 'ERROR';
    healthCheck.error = error.message;
    res.status(503).json(healthCheck);
  }
});

app.get('/api', (req, res) => {
  res.json({ 
    message: 'Welcome to the Enhanced Full-Stack API!',
    timestamp: new Date().toISOString(),
    version: '2.0.0',
    endpoints: {
      users: '/api/users',
      products: '/api/products',
      orders: '/api/orders',
      tasks: '/api/tasks',
      analytics: '/api/analytics',
      search: '/api/search',
      health: '/api/health'
    }
  });
});

// ============ USER ROUTES ============
app.get('/api/users', (req, res) => {
  const { role, limit } = req.query;
  let filteredUsers = users;
  
  if (role) {
    filteredUsers = users.filter(user => user.role === role);
  }
  
  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit));
  }
  
  res.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email, role = 'user' } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }
  
  const newUser = {
    id: Date.now(),
    name,
    email,
    role,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { name, email, role } = req.body;
  users[userIndex] = { ...users[userIndex], name, email, role };
  
  res.json({
    message: 'User updated successfully',
    user: users[userIndex]
  });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  
  res.json({
    message: 'User deleted successfully',
    user: deletedUser
  });
});

// ============ PRODUCT ROUTES ============
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, limit, sort } = req.query;
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
  }
  
  if (sort === 'price_asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sort === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }
  
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }
  
  res.json({
    products: filteredProducts,
    total: filteredProducts.length,
    filters: { category, minPrice, maxPrice, sort },
    timestamp: new Date().toISOString()
  });
});

app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, price, category, stock, description } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }
  
  const newProduct = {
    id: Date.now(),
    name,
    price: parseFloat(price),
    category,
    stock: parseInt(stock) || 0,
    description: description || ''
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct
  });
});

// ============ ORDER ROUTES ============
app.get('/api/orders', (req, res) => {
  const { userId, status } = req.query;
  let filteredOrders = orders;
  
  if (userId) {
    filteredOrders = orders.filter(o => o.userId === parseInt(userId));
  }
  
  if (status) {
    filteredOrders = filteredOrders.filter(o => o.status === status);
  }
  
  res.json({
    orders: filteredOrders,
    total: filteredOrders.length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/orders', (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  
  if (!userId || !productId) {
    return res.status(400).json({ error: 'User ID and Product ID are required' });
  }
  
  const user = users.find(u => u.id === parseInt(userId));
  const product = products.find(p => p.id === parseInt(productId));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Insufficient stock' });
  }
  
  const newOrder = {
    id: Date.now(),
    userId: parseInt(userId),
    productId: parseInt(productId),
    quantity: parseInt(quantity),
    totalPrice: product.price * quantity,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  
  // Update product stock
  const productIndex = products.findIndex(p => p.id === parseInt(productId));
  products[productIndex].stock -= quantity;
  
  res.status(201).json({
    message: 'Order created successfully',
    order: newOrder
  });
});

// ============ TASK ROUTES ============
app.get('/api/tasks', (req, res) => {
  const { completed, priority, assignedTo } = req.query;
  let filteredTasks = tasks;
  
  if (completed !== undefined) {
    filteredTasks = tasks.filter(t => t.completed === (completed === 'true'));
  }
  
  if (priority) {
    filteredTasks = filteredTasks.filter(t => t.priority === priority);
  }
  
  if (assignedTo) {
    filteredTasks = filteredTasks.filter(t => t.assignedTo === parseInt(assignedTo));
  }
  
  res.json({
    tasks: filteredTasks,
    total: filteredTasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
    timestamp: new Date().toISOString()
  });
});

app.post('/api/tasks', (req, res) => {
  const { title, priority = 'medium', assignedTo } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
    priority,
    assignedTo: assignedTo ? parseInt(assignedTo) : null,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  res.status(201).json({
    message: 'Task created successfully',
    task: newTask
  });
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const { title, completed, priority, assignedTo } = req.body;
  tasks[taskIndex] = { 
    ...tasks[taskIndex], 
    title: title || tasks[taskIndex].title,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed,
    priority: priority || tasks[taskIndex].priority,
    assignedTo: assignedTo !== undefined ? assignedTo : tasks[taskIndex].assignedTo
  };
  
  res.json({
    message: 'Task updated successfully',
    task: tasks[taskIndex]
  });
});

// ============ ANALYTICS ROUTES ============
app.get('/api/analytics', (req, res) => {
  const analytics = {
    users: {
      total: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      regular: users.filter(u => u.role === 'user').length
    },
    products: {
      total: products.length,
      categories: [...new Set(products.map(p => p.category))],
      totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
      lowStock: products.filter(p => p.stock < 20).length
    },
    orders: {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      totalRevenue: orders.reduce((sum, o) => sum + o.totalPrice, 0)
    },
    tasks: {
      total: tasks.length,
      completed: tasks.filter(t => t.completed).length,
      pending: tasks.filter(t => !t.completed).length,
      highPriority: tasks.filter(t => t.priority === 'high').length
    },
    timestamp: new Date().toISOString()
  };
  
  res.json(analytics);
});

// ============ SEARCH ROUTE ============
app.get('/api/search', (req, res) => {
  const { q, type } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const query = q.toLowerCase();
  let results = {};
  
  if (!type || type === 'users') {
    results.users = users.filter(u => 
      u.name.toLowerCase().includes(query) || 
      u.email.toLowerCase().includes(query)
    );
  }
  
  if (!type || type === 'products') {
    results.products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
  }
  
  if (!type || type === 'tasks') {
    results.tasks = tasks.filter(t => 
      t.title.toLowerCase().includes(query)
    );
  }
  
  res.json({
    query: q,
    results,
    totalResults: Object.values(results).reduce((sum, arr) => sum + arr.length, 0),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    version: '2.0.0'
  });
});

// ============ TEST ENDPOINTS FOR AI MODELS ============
app.get('/api/test/slow', (req, res) => {
  const delay = req.query.delay || 2000;
  setTimeout(() => {
    res.json({
      message: `Response after ${delay}ms delay`,
      timestamp: new Date().toISOString()
    });
  }, parseInt(delay));
});

app.get('/api/test/error/:code', (req, res) => {
  const code = parseInt(req.params.code);
  const errorMessages = {
    400: 'Bad Request - Invalid parameters',
    401: 'Unauthorized - Authentication required',
    403: 'Forbidden - Access denied',
    404: 'Not Found - Resource does not exist',
    500: 'Internal Server Error - Something went wrong'
  };
  
  res.status(code).json({
    error: errorMessages[code] || 'Unknown error',
    code: code,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test/large-data', (req, res) => {
  const count = parseInt(req.query.count) || 1000;
  const data = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    value: Math.random() * 1000,
    timestamp: new Date().toISOString(),
    metadata: {
      category: ['A', 'B', 'C'][i % 3],
      priority: ['low', 'medium', 'high'][i % 3],
      active: Math.random() > 0.5
    }
  }));
  
  res.json({
    count: data.length,
    data: data,
    generated: new Date().toISOString()
  });
});

app.post('/api/test/echo', (req, res) => {
  res.json({
    message: 'Echo endpoint - returning your data',
    received: req.body,
    headers: req.headers,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test/random', (req, res) => {
  const type = req.query.type || 'number';
  let result;
  
  switch (type) {
    case 'string':
      result = Math.random().toString(36).substring(2, 15);
      break;
    case 'boolean':
      result = Math.random() > 0.5;
      break;
    case 'array':
      result = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));
      break;
    case 'object':
      result = {
        id: Math.floor(Math.random() * 1000),
        name: `Random Item ${Math.floor(Math.random() * 100)}`,
        value: Math.random() * 1000,
        active: Math.random() > 0.5
      };
      break;
    default:
      result = Math.random() * 1000;
  }
  
  res.json({
    type: type,
    result: result,
    timestamp: new Date().toISOString()
  });
});

// ============ PAGINATION ENDPOINT ============
app.get('/api/users/paginated', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedUsers = users.slice(startIndex, endIndex);
  
  res.json({
    users: paginatedUsers,
    pagination: {
      page: page,
      limit: limit,
      total: users.length,
      pages: Math.ceil(users.length / limit),
      hasNext: endIndex < users.length,
      hasPrev: startIndex > 0
    },
    timestamp: new Date().toISOString()
  });
});

// ============ BULK OPERATIONS ============
app.post('/api/users/bulk', (req, res) => {
  const { users: newUsers } = req.body;
  
  if (!Array.isArray(newUsers)) {
    return res.status(400).json({ error: 'Users must be an array' });
  }
  
  const createdUsers = [];
  const errors = [];
  
  newUsers.forEach((userData, index) => {
    if (!userData.name || !userData.email) {
      errors.push({ index, error: 'Name and email are required' });
      return;
    }
    
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      errors.push({ index, error: 'Email already exists' });
      return;
    }
    
    const newUser = {
      id: Date.now() + index,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    createdUsers.push(newUser);
  });
  
  res.status(createdUsers.length > 0 ? 201 : 400).json({
    message: `${createdUsers.length} users created successfully`,
    created: createdUsers,
    errors: errors,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📱 Frontend should run on http://localhost:3000`);
  console.log(`🔗 Backend API available at http://localhost:${PORT}/api`);
});
