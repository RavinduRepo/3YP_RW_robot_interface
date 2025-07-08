import React from 'react';
import './roleCard.css';

const RoleCard = ({ image, title, description, onClick }) => {
  return (
    <div className="role-card" onClick={onClick}>
      <div className="role-card-inner">
        <div className="role-image-container">
          <img src={image} alt={title} className="role-image" />
          <div className="image-glow"></div>
        </div>
        <div className="role-content">
          <h2 className="role-title">{title}</h2>
          <p className="role-description">{description}</p>
        </div>
        <div className="role-card-accent"></div>
      </div>
    </div>
  );
};

export default RoleCard;