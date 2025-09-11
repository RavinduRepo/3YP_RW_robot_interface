import React from 'react';
import RobotSignupForm from '../components/robotSignupForm';
import './styles/restaurantSignupPage.css';

const RobotSignupPage = () => {
  return (
    <div className="signup-page">
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
      <RobotSignupForm />
    </div>
  );
};

export default RobotSignupPage;
