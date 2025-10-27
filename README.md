# Test Selection Demo App Browserstack
A comprehensive full-stack web application built with React.js frontend and Node.js/Express.js backend, designed for AI model testing and demonstration purposes.

## 🚀 Features

### Frontend Features
- **Multi-Tab Interface**: Dashboard, Users, Products, Tasks, Orders, and Search
- **Real-time Analytics**: Visual dashboard with key metrics
- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Advanced Search**: Cross-entity search with filtering
- **Responsive Design**: Mobile-friendly interface
- **Interactive UI**: Dynamic forms, modals, and real-time updates

### Backend Features
- **RESTful API**: Complete REST endpoints with proper HTTP methods
- **Data Management**: Users, Products, Tasks, Orders with relationships
- **Advanced Filtering**: Query parameters for sorting, pagination, filtering
- **Bulk Operations**: Create multiple records simultaneously
- **Error Handling**: Comprehensive error responses with proper status codes
- **Test Endpoints**: Special endpoints for AI model testing scenarios

### AI Testing Features
- **Slow Response Simulation**: Test timeout handling
- **Error Code Generation**: Test error handling (400, 401, 403, 404, 500)
- **Large Data Sets**: Generate large JSON responses for performance testing
- **Echo Endpoint**: Return request data for debugging
- **Random Data Generation**: Various data types for testing
- **Pagination**: Test pagination scenarios

## 📁 Enhanced Project Structure

```
├── client/                     # React frontend
│   ├── public/
│   ├── src/
│   │   ├── App.js             # Main React component with tabs
│   │   ├── App.css            # Enhanced styling
│   │   └── index.js           # Entry point
│   └── package.json           # Client dependencies
├── server/                     # Express backend
│   └── index.js               # Enhanced server with multiple endpoints
├── .github/
│   └── copilot-instructions.md # AI assistant instructions
├── .vscode/
│   └── tasks.json             # VS Code tasks
├── package.json               # Root package.json with scripts
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

## 🛠️ Installation & Setup

1. **Install root dependencies:**
   ```bash
   npm install
   ```

2. **Install client dependencies:**
   ```bash
   cd client && npm install && cd ..
   ```

3. **Install server dependencies:**
   ```bash
   cd server && npm install && cd ..
   ```

## 🚀 Running the Application

### Development Mode (Recommended)
```bash
npm run dev
```
This starts both frontend (http://localhost:3000) and backend (http://localhost:5000)

### Individual Components
- **Backend only:** `npm run server`
- **Frontend only:** `npm run client`  
- **Production:** `npm start`

## 🔗 Complete API Documentation

### Core Endpoints

| Method | Endpoint | Description | Query Parameters |
|--------|----------|-------------|------------------|
| GET    | `/api`   | API information and endpoints | - |
| GET    | `/api/health` | System health and metrics | - |

### User Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/users` | Get all users | `role`, `limit` |
| GET    | `/api/users/:id` | Get user by ID | - |
| POST   | `/api/users` | Create new user | `name`, `email`, `role` |
| PUT    | `/api/users/:id` | Update user | `name`, `email`, `role` |
| DELETE | `/api/users/:id` | Delete user | - |
| GET    | `/api/users/paginated` | Paginated users | `page`, `limit` |
| POST   | `/api/users/bulk` | Create multiple users | `users[]` |

### Product Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/products` | Get all products | `category`, `minPrice`, `maxPrice`, `sort`, `limit` |
| GET    | `/api/products/:id` | Get product by ID | - |
| POST   | `/api/products` | Create new product | `name`, `price`, `category`, `stock`, `description` |

### Task Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/tasks` | Get all tasks | `completed`, `priority`, `assignedTo` |
| POST   | `/api/tasks` | Create new task | `title`, `priority`, `assignedTo` |
| PUT    | `/api/tasks/:id` | Update task | `title`, `completed`, `priority`, `assignedTo` |

### Order Management

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/orders` | Get all orders | `userId`, `status` |
| POST   | `/api/orders` | Create new order | `userId`, `productId`, `quantity` |

### Analytics & Search

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/analytics` | Get system analytics | - |
| GET    | `/api/search` | Search across entities | `q` (query), `type` |

### AI Testing Endpoints

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET    | `/api/test/slow` | Simulate slow response | `delay` (milliseconds) |
| GET    | `/api/test/error/:code` | Generate specific error | HTTP status code |
| GET    | `/api/test/large-data` | Generate large dataset | `count` |
| POST   | `/api/test/echo` | Echo request data | Any JSON body |
| GET    | `/api/test/random` | Generate random data | `type` (string, number, boolean, array, object) |

## 📊 Sample API Calls

### Create User
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","role":"admin"}'
```

### Search Products
```bash
curl "http://localhost:5000/api/products?category=Electronics&minPrice=100&sort=price_asc"
```

### Test Error Handling
```bash
curl http://localhost:5000/api/test/error/404
```

### Generate Large Dataset
```bash
curl "http://localhost:5000/api/test/large-data?count=5000"
```

## 🎯 AI Model Testing Scenarios

This application is designed to test various AI model capabilities:

1. **API Integration Testing**: Test API calling and response parsing
2. **Error Handling**: Verify proper error response processing
3. **Data Processing**: Handle large datasets and complex JSON structures
4. **User Interface Interaction**: Test form submissions and UI navigation
5. **Search and Filtering**: Test query construction and result processing
6. **CRUD Operations**: Test all database operations
7. **Performance Testing**: Use slow endpoints and large datasets
8. **Authentication Flow**: Test with different user roles

## 🔧 Technologies Used

### Frontend
- React.js 19+ with Hooks
- Modern CSS with Grid/Flexbox
- Fetch API for HTTP requests
- Responsive design principles

### Backend
- Node.js with Express.js 5+
- CORS middleware
- JSON request/response handling
- In-memory data storage (easily replaceable with database)

### Development Tools
- nodemon for auto-reload
- concurrently for running multiple processes
- VS Code tasks and debugging support

## 📱 Frontend Functionality

### Dashboard Tab
- Real-time analytics and metrics
- System health monitoring
- Overview of all entities

### Users Tab
- Add, view, and delete users
- Role-based user management
- User filtering and search

### Products Tab
- Product catalog management
- Category and price filtering
- Stock level monitoring

### Tasks Tab
- Task creation and management
- Priority-based organization
- User assignment
- Task completion tracking

### Orders Tab
- Order creation and tracking
- User and product selection
- Order status management

### Search Tab
- Global search across all entities
- Real-time search results
- Category-specific filtering

## 🚀 Advanced Features

### Data Relationships
- Orders link users and products
- Tasks can be assigned to users
- Analytics aggregate data across entities

### Validation & Error Handling
- Frontend form validation
- Backend data validation
- Comprehensive error messages
- Conflict detection (duplicate emails)

### Performance Features
- Efficient data filtering
- Pagination support
- Optimized search algorithms
- Memory usage monitoring

## 🔄 Development Workflow

1. Start development servers: `npm run dev`
2. Frontend auto-reloads on file changes
3. Backend restarts automatically with nodemon
4. Use browser dev tools for frontend debugging
5. Monitor console for API request logs

## 🧪 Testing Guidelines

### Manual Testing
1. Test all CRUD operations through the UI
2. Verify error handling with invalid data
3. Test search functionality across entities
4. Verify responsive design on different screen sizes

### API Testing
1. Use curl or Postman for endpoint testing
2. Test error scenarios with `/api/test/error/:code`
3. Performance test with `/api/test/large-data`
4. Validate request/response with `/api/test/echo`

### AI Model Testing
1. Test API integration capabilities
2. Verify JSON parsing with complex responses
3. Test error recovery and handling
4. Validate search and filter functionality

## 🆘 Troubleshooting

**Common Issues:**
- **Port conflicts**: Ensure ports 3000 and 5000 are available
- **CORS errors**: Check proxy configuration in client/package.json
- **Module errors**: Run `npm install` in both root and client directories
- **API connection**: Verify backend is running on http://localhost:5000

**Development Tips:**
- Use browser Network tab to debug API calls
- Check console logs for detailed error messages
- Use VS Code debugger for backend debugging
- Monitor memory usage with `/api/health` endpoint

## 📝 License

ISC License - Feel free to use this project for testing, learning, and development purposes.
