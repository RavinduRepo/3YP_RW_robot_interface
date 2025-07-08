import React from 'react';
import AddMenuItemForm from '../components/addMenuItemForm';
import MenuListColumn from '../components/menuListColumn';
import './styles/addMenuItemPage.css';

const AddMenuItemPage = () => {
  return (
    <div className="menu-page-container">
      {/* Floating decorative elements */}
      <div className="floating-elements">
        <div className="floating-icon floating-icon-1">🍽️</div>
        <div className="floating-icon floating-icon-2">📋</div>
        <div className="floating-icon floating-icon-3">🍕</div>
        <div className="floating-icon floating-icon-4">✨</div>
      </div>

      <div className="menu-page-header">
        <h1 className="page-title">Menu Management</h1>
        <p className="page-subtitle">Add new items and manage your restaurant's menu</p>
      </div>

      <div className="menu-page-two-col">
        <div className="menu-column form-column">
          <div className="column-header">
            <h2>Add New Menu Item</h2>
            <div className="header-accent"></div>
          </div>
          <AddMenuItemForm />
        </div>
        
        <div className="menu-column list-column">
          <div className="column-header">
            <h2>Current Menu Items</h2>
            <div className="header-accent"></div>
          </div>
          <MenuListColumn />
        </div>
      </div>
    </div>
  );
};

export default AddMenuItemPage;