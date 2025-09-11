import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/api/restaurant/login', { email, password });
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem('restaurantId', data.uid);
        localStorage.setItem('restaurantToken', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An error occurred during login');
      }
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-header">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <circle cx="12" cy="18" r="2" fill="currentColor"/>
            </svg>
          </div>
          <h2 className="form-title">Restaurant Management</h2>
          <p className="form-subtitle">Access your restaurant dashboard</p>
        </div>

        <div className="form-fields">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your restaurant email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="button-content">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </div>

        <div className="form-footer">
          <p>
            Don't have an account?{' '}
            <span 
              className="form-link" 
              onClick={() => navigate('/restaurant-signup')}
            >
              Create one here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RestaurantLoginForm;