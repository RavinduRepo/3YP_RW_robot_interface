import React from 'react';
import RestaurantSignupForm from '../components/restaurantSignupForm';
import './styles/restaurantSignupPage.css';

const RestaurantSignupPage = () => {
  return (
    <div className="signup-page">
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
      <RestaurantSignupForm />
    </div>
  );
};

export default RestaurantSignupPage;