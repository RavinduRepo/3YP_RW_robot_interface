import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    try {
      const res = await api.post('api/restaurant/signup', formData);
      setStatus({ loading: false, error: '', success: res.data.message || 'Registration successful! Redirecting...' });

      setTimeout(() => {
        navigate('/restaurant-login');
      }, 1500);

      setFormData({ name: '', email: '', password: '', phone: '', address: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Registration failed. Please try again.', success: '' });
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <circle cx="12" cy="18" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="form-title">Create Restaurant Account</h2>
          <p className="form-subtitle">Join our smart restaurant management system</p>
        </div>

        <div className="form-fields">
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="name">Restaurant Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter restaurant name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter business email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create secure password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter contact number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-row">
            <div className="input-group">
              <label htmlFor="address">Restaurant Location</label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="Enter restaurant address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="signup-button"
            disabled={status.loading}
          >
            {status.loading ? (
              <span className="button-content">
                <span className="spinner"></span>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          {status.error && (
            <div className="status-message error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {status.error}
            </div>
          )}

          {status.success && (
            <div className="status-message success-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              {status.success}
            </div>
          )}
        </div>

        <div className="form-footer">
          <p>
            Already have an account?{' '}
            <span 
              className="form-link" 
              onClick={() => navigate('/restaurant-login')}
            >
              Sign in here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RestaurantSignupForm;