import React, { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../../services/api';

function Products({ products, loading, fetchProducts, fetchAnalytics }) {
  const [newProduct, setNewProduct] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    stock: '', 
    description: '' 
  });
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category))).filter(Boolean);

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const query = search.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      (product.description && product.description.toLowerCase().includes(query));
    const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.category) {
      toast.error('Please fill in all required fields: name, price, and category');
      return;
    }
    try {
      const result = await API.products.create(newProduct);
      setNewProduct({ name: '', price: '', category: '', stock: '', description: '' });
      fetchProducts();
      fetchAnalytics();
      toast.success('Product added successfully!');
    } catch (error) {
      toast.error('Error adding product: ' + error.message);
    }
  };

  return (
    <div className="tab-content">
      <div className="form-section">
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct} className="product-form">
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <input
            type="number"
            step="0.01"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </form>
      </div>

      <div className="products-section">
        <h2>Products ({filteredProducts.length})</h2>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="product-search-input"
              style={{ padding: '0.5rem', width: '60%' }}
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              style={{ padding: '0.5rem', width: '40%' }}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        <div className="products-grid">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <p className="category">{product.category}</p>
                <p className={`stock ${product.stock < 20 ? 'low-stock' : ''}`}>Stock: {product.stock}</p>
                <p className="description">{product.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
