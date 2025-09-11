import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const EmployeeSignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [status, setStatus] = useState({ loading: false, error: '', success: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '', success: '' });

    const restaurantId = localStorage.getItem('restaurantId');
    if (!restaurantId) {
      setStatus({ loading: false, error: 'No restaurant ID found in localStorage.', success: '' });
      return;
    }

    try {
      const res = await api.post('api/employee/signup', { ...formData, restaurantId });
      setStatus({ loading: false, error: '', success: res.data.message });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      setStatus({ loading: false, error: err.response?.data?.message || 'Signup failed', success: '' });
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
          <h2 className="form-title">Employee Signup</h2>
          <p className="form-subtitle">Create a new employee account</p>
        </div>

        <div className="form-fields">
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input name="name" id="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="signup-button" disabled={status.loading}>
            {status.loading ? 'Signing up...' : 'Signup'}
          </button>
        </div>

        {/* <div className="form-footer">
          <p>
            Already have an account?{' '}
            <span 
              className="form-link" 
              onClick={() => navigate('/employee-login')}
            >
              Login here
            </span>
          </p>
        </div> */}

        {status.error && <p className="error">{status.error}</p>}
        {status.success && <p className="success">{status.success}</p>}
      </form>
    </div>
  );
};

export default EmployeeSignupForm;
