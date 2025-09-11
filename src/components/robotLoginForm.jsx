import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import webSocketManager from '../utils/webSocketManager';
import { WS_BASE_URL } from '../config';

const RobotLoginForm = () => {
  const [robotId, setRobotId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [websocketStatus, setWebsocketStatus] = useState('Disconnected');
  const [mqttMessageReceived, setMqttMessageReceived] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for MQTT auth messages
    const handleMqttAuth = (event) => {
      console.log('MQTT Auth event received:', event.detail);
      setMqttMessageReceived(true);
      
      // You can add additional handling here
      // For example, automatically navigate or show success message
    };

    window.addEventListener('mqttAuthReceived', handleMqttAuth);

    // Cleanup listener
    return () => {
      window.removeEventListener('mqttAuthReceived', handleMqttAuth);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post('/api/robot/login', { robotId, password });
      const data = res.data;
      console.log('Login response data:', data);
      
      if (res.status === 200) {
        localStorage.setItem('restaurantId', data.restaurantId);
        localStorage.setItem('robotId', data.robotId); // Store robot ID for reference
        
        // Clear any previous MQTT flags
        webSocketManager.clearMqttFlag();
        
        // Setup WebSocket connection after successful login
        webSocketManager.connect(WS_BASE_URL, data.robotId, (message) => {
          console.log('WebSocket message in login form:', message);
          
          // Update WebSocket status
          setWebsocketStatus(webSocketManager.getConnectionStatus());
          
          if (message.type === 'auth') {
            console.log('MQTT auth message received in login form');
            localStorage.setItem('robotAuthToken', message.idToken);
            setMqttMessageReceived(true);
            
            // Optional: Auto-navigate after receiving MQTT message
            // setTimeout(() => navigate('/restaurant-menu'), 2000);
          }
        });

        // Update WebSocket status periodically
        const statusInterval = setInterval(() => {
          setWebsocketStatus(webSocketManager.getConnectionStatus());
          
          // Check if MQTT message was received
          if (webSocketManager.hasMqttMessage() && !mqttMessageReceived) {
            setMqttMessageReceived(true);
          }
        }, 1000);

        // Navigate to menu (you might want to do this after MQTT message)
        navigate('/restaurant-menu');
        
        // Clear interval after navigation
        setTimeout(() => clearInterval(statusInterval), 10000);
        
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('An error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get WebSocket data for debugging
  const getWebSocketData = () => {
    const data = webSocketManager.getDataLocally();
    const history = webSocketManager.getMessageHistory();
    console.log('Current WebSocket data:', data);
    console.log('WebSocket message history:', history);
    return { current: data, history };
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
          <h2 className="form-title">Robot Login</h2>
          <p className="form-subtitle">Access your robot dashboard</p>
        </div>

        <div className="form-fields">
          <div className="input-group">
            <label htmlFor="robotId">Robot ID</label>
            <input
              id="robotId"
              type="text"
              placeholder="Enter your robot ID"
              value={robotId}
              onChange={(e) => setRobotId(e.target.value)}
              required
              disabled={isLoading}
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
              disabled={isLoading}
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
            Don't have a robot account?{' '}
            <span 
              className="form-link" 
              onClick={() => navigate('/robot-signup')}
            >
              Create one here
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RobotLoginForm;