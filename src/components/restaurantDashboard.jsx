import React, { useEffect, useState } from 'react';
import EmployeeList from './employeeList';
import RobotList from './robotList';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const RestaurantDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [robots, setRobots] = useState([]);
  const navigate = useNavigate();

  const restaurantId = localStorage.getItem('restaurantId');

  useEffect(() => {
    const fetchData = async () => {
      const restaurantToken = localStorage.getItem('restaurantToken');
      if (!restaurantToken) {
        console.error("No token found. Please log in.");
        return;
      }
      try {
        const res = await api.get(`/api/restaurant/${restaurantId}/entities`, {
          headers: {
            'Authorization': `Bearer ${restaurantToken}`
          },
        });
        setEmployees(res.data.employees);
        setRobots(res.data.robots);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, [restaurantId]);

  return (
    <div className="dashboard-container">
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-icon floating-icon-1">🍽️</div>
        <div className="floating-icon floating-icon-2">🤖</div>
        <div className="floating-icon floating-icon-3">👥</div>
        <div className="floating-icon floating-icon-4">🔧</div>
      </div>

      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">Restaurant Dashboard</h1>
          <p className="dashboard-subtitle">Manage your restaurant operations with ease</p>
        </div>
        <button 
          className="add-menu-btn" 
          onClick={() => navigate('/add-menu-item')}
        >
          <span className="btn-icon">+</span>
          Add Menu Item
        </button>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section employees-section">
          <EmployeeList employees={employees} onAdd={() => navigate('/employee-signup')} />
        </div>
        <div className="dashboard-section robots-section">
          <RobotList robots={robots} onAdd={() => navigate('/robot-signup')} restaurantId={restaurantId} />
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;