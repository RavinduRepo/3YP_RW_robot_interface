import React from 'react';
import RobotLoginForm from '../components/robotLoginForm';
import './styles/restaurantSignupPage.css';

const RobotLoginPage = () => {
  return (
    <div className='login-page'>
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
      <RobotLoginForm />
    </div>
  );
};

export default RobotLoginPage;
