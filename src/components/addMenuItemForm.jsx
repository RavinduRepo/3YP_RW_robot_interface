import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../pages/styles/menuItemForm.css';

const AddMenuItemForm = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    Includings: '',
    price: '',
    imageUrl: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.name.trim()) newErrors.name = 'Item name is required';
    if (!formData.Includings.trim()) newErrors.Includings = 'Description is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const restaurantId = localStorage.getItem('restaurantId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const restaurantToken = localStorage.getItem('restaurantToken');
    if (!restaurantToken) {
      console.error("No token found. Please log in.");
      return;
    }

    if (!restaurantId) {
      alert('Restaurant ID not found.');
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post(`/api/restaurant/${restaurantId}/add-menu`,
        { ...formData, restaurantId },
        {
          headers: {
            'Authorization': `Bearer ${restaurantToken}`
          },
        }
      );

      // Success feedback
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.textContent = 'Menu item added successfully! 🎉';
      document.body.appendChild(successMessage);
      
      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);

      setFormData({
        category: '',
        name: '',
        Includings: '',
        price: '',
        imageUrl: ''
      });
      navigate(0); // Reload the page
    } catch (error) {
      console.error('Error submitting menu item:', error);
      alert('Error adding menu item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="floating-decoration floating-decoration-1"></div>
      <div className="floating-decoration floating-decoration-2"></div>
      <div className="floating-decoration floating-decoration-3"></div>
      
      <form className="menu-item-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Add New Menu Item</h2>
          <p>Create a delicious addition to your restaurant menu</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="category">
              <span className="label-text">Category</span>
              <span className="label-icon">🍽️</span>
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Appetizers, Main Course, Desserts"
              className={errors.category ? 'error' : ''}
              required
            />
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="name">
              <span className="label-text">Item Name</span>
              <span className="label-icon">🍕</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter the dish name"
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="Includings">
              <span className="label-text">Description & Ingredients</span>
              <span className="label-icon">📝</span>
            </label>
            <textarea
              id="Includings"
              name="Includings"
              value={formData.Includings}
              onChange={handleChange}
              placeholder="Describe the dish and list key ingredients..."
              rows="4"
              className={errors.Includings ? 'error' : ''}
              required
            />
            {errors.Includings && <span className="error-message">{errors.Includings}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">
              <span className="label-text">Price (Rs.)</span>
              <span className="label-icon">💰</span>
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className={errors.price ? 'error' : ''}
              required
              min="0"
              step="1"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="imageUrl">
              <span className="label-text">Image URL</span>
              <span className="label-icon">📸</span>
            </label>
            <input
              type="url"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className={errors.imageUrl ? 'error' : ''}
              required
            />
            {errors.imageUrl && <span className="error-message">{errors.imageUrl}</span>}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Adding Item...
            </>
          ) : (
            <>
              <span className="button-icon">✨</span>
              Add Menu Item
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemForm;