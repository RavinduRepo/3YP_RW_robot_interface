import React from 'react';
import RoleCard from '../components/roleCard';
import adminImg from '../assets/restaurant.svg';
import robotImg from '../assets/robot.svg';
import employeeImg from '../assets/employee.svg';
import './styles/landingPage.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="content-wrapper">
          <div className="welcome-card">
            <div className="brand-header">
              <div className="brand-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                  <circle cx="12" cy="18" r="2" fill="currentColor"/>
                </svg>
              </div>
              <h1 className="landing-title">Smart Restaurant System</h1>
            </div>
            <p className="landing-subtitle">Experience the future of dining with our AI-powered service</p>
            <div className="subtitle-accent">Choose your access level below</div>
          </div>
          
          <div className="role-selection">
            <RoleCard
              image="https://img.icons8.com/?size=160&id=115346&format=png"
              title="Restaurant Management"
              description="Manage your restaurant"
              onClick={() => navigate('/restaurant-login')}
            />
            <RoleCard
              image="https://img.icons8.com/?size=96&id=23347&format=png"
              title="Employee Portal"
              description="Staff login and tools"
              onClick={() => window.location.href = import.meta.env.VITE_EMPLOYEE_APP_URL}
            />
            <RoleCard
              image="https://img.icons8.com/?size=128&id=b2rw9AoJdaQb&format=png"
              title="Robot Interface"
              description="Robot system access"
              onClick={() => navigate('/robot-login')}
            />
          </div>
        </div>
      </div>
      
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
    </div>
  );
};

export default LandingPage;