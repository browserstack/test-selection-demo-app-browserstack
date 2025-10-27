import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';

function Orders({ orders, users, products, loading, fetchOrders, fetchProducts, fetchAnalytics }) {
  const [newOrder, setNewOrder] = useState({ userId: '', productId: '', quantity: 1 });
  
  const handleAddOrder = async (e) => {
    e.preventDefault();
    if (!newOrder.userId || !newOrder.productId) return;

    try {
      await API.orders.create(newOrder);
      setNewOrder({ userId: '', productId: '', quantity: 1 });
      fetchOrders();
      fetchProducts(); // Refresh to update stock
      fetchAnalytics();
      toast.success('Order created successfully!');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error(`Error: ${error.message || 'Error creating order'}`);
    }
  };

  return (
    <div className="tab-content">
      <div className="form-section">
        <h2>Create New Order</h2>
        <form onSubmit={handleAddOrder} className="order-form">
          <select
            value={newOrder.userId}
            onChange={(e) => setNewOrder({ ...newOrder, userId: e.target.value })}
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <select
            value={newOrder.productId}
            onChange={(e) => setNewOrder({ ...newOrder, productId: e.target.value })}
          >
            <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>
                {product.name} - ${product.price} (Stock: {product.stock})
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={(e) => setNewOrder({ ...newOrder, quantity: parseInt(e.target.value) })}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Order'}
          </button>
        </form>
      </div>

      <div className="orders-section">
        <h2>Orders ({orders.length})</h2>
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h3>Order #{order.id}</h3>
              <p>User: {users.find(u => u.id === order.userId)?.name || 'Unknown'}</p>
              <p>Product: {products.find(p => p.id === order.productId)?.name || 'Unknown'}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ${order.totalPrice}</p>
              <span className={`status-badge ${order.status}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
