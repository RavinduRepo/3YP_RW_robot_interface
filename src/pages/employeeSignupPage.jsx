import React from 'react';
import EmployeeSignupForm from '../components/employeeSignupForm';
import './styles/restaurantSignupPage.css';

const EmployeeSignupPage = () => {
  return (
    <div className="signup-page">
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
      <EmployeeSignupForm />
    </div>
  );
};

export default EmployeeSignupPage;
