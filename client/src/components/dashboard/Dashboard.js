import React from 'react';

function Dashboard({ message, health, analytics }) {
  return (
    <div className="tab-content">
      {/* Backend Connection Status */}
      <div className="status-section">
        <h2>Backend Status</h2>
        <p className="message">{message}</p>
        {health && (
          <div className="health-info">
            <p>Status: <span className="status-ok">{health.status}</span></p>
            <p>Uptime: {Math.floor(health.uptime)} seconds</p>
          </div>
        )}
      </div>

      {/* Analytics */}
      {analytics && (
        <div className="analytics-section">
          <h2>📊 Analytics Dashboard</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>👥 Users</h3>
              <p>Total: {analytics.users.total}</p>
              <p>Admins: {analytics.users.admins}</p>
              <p>Regular: {analytics.users.regular}</p>
            </div>
            <div className="analytics-card">
              <h3>📦 Products</h3>
              <p>Total: {analytics.products.total}</p>
              <p>Categories: {analytics.products.categories.length}</p>
              <p>Low Stock: {analytics.products.lowStock}</p>
            </div>
            <div className="analytics-card">
              <h3>📋 Tasks</h3>
              <p>Total: {analytics.tasks.total}</p>
              <p>Completed: {analytics.tasks.completed}</p>
              <p>High Priority: {analytics.tasks.highPriority}</p>
            </div>
            <div className="analytics-card">
              <h3>🛒 Orders</h3>
              <p>Total: {analytics.orders.total}</p>
              <p>Pending: {analytics.orders.pending}</p>
              <p>Revenue: ${analytics.orders.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
