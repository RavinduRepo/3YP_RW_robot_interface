import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RobotSignupForm = () => {
  const [robotName, setRobotName] = useState('');
  const [message, setMessage] = useState({ error: '', success: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const restaurantId = localStorage.getItem('restaurantId');
  
    if (!robotName || !restaurantId) {
      alert('Robot name and restaurant ID are required.');
      return;
    }
  
    try {
      const res = await api.post('/api/robot/signup', { robotName, restaurantId });
      if (res.status === 409) {
        alert('A robot with this name already exists for this restaurant. Please choose a different name.');
      } else if (res.status === 200 || res.status === 201 || res.data) {
        alert(`Robot registered successfully!`);
        setRobotName('');
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        alert(res.data?.message || 'Failed to register robot.');
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('A robot with this name already exists for this restaurant. Please choose a different name.');
      } else {
        alert('Error occurred during signup.');
        console.error(err);
      }
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
          <h2 className="form-title">Register Robot</h2>
          <p className="form-subtitle">Create a new robot account</p>
        </div>

        <div className="form-fields">
          <div className="input-group">
            <label htmlFor="robotName">Robot Name</label>
            <input
              id="robotName"
              type="text"
              placeholder="Enter robot name"
              value={robotName}
              onChange={(e) => setRobotName(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="signup-button">Register Robot</button>
        </div>

        <div className="form-footer">
          <p>
            Already have a robot account?{' '}
            <span 
              className="form-link" 
              onClick={() => navigate('/robot-login')}
            >
              Login here
            </span>
          </p>
        </div>

        {message.error && <p className="error">{message.error}</p>}
        {message.success && <p className="success">{message.success}</p>}
      </form>
    </div>
  );
};

export default RobotSignupForm;
