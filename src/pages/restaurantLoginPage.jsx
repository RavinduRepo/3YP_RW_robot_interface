import React from 'react';
import RestaurantLoginForm from '../components/restaurantLoginForm';
import './styles/restaurantLoginPage.css';

const RestaurantLoginPage = () => {
  return (
    <div className='login-page'>
      <div className="floating-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
      <RestaurantLoginForm />
    </div>
  );
};

export default RestaurantLoginPage;
