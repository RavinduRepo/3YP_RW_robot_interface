import React, { useEffect, useState } from 'react';
import api from '../api/api';
import '../pages/styles/menuListColumn.css';

const MenuListColumn = () => {
  const [menuData, setMenuData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const restaurantId = localStorage.getItem('restaurantId');

  const fetchMenu = async () => {
    const restaurantToken = localStorage.getItem('restaurantToken');
    if (!restaurantToken) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      setIsLoading(true);
      // Fetching the menu data from the backend
      const res = await api.get(`/api/restaurant/${restaurantId}/menu`,{
        headers: {
          'Authorization': `Bearer ${restaurantToken}`
        },
      });

      // Grouping the menu data by category
      const grouped = res.data.menu.reduce((acc, item) => {
        const cat = item.category;
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
      }, {});
      setMenuData(grouped);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this menu item?')) return;
    const restaurantToken = localStorage.getItem('restaurantToken');
    if (!restaurantToken) {
      console.error("No token found. Please log in.");
      return;
    }
    try {
      await api.delete(`/api/restaurant/${restaurantId}/menu/${id}`, {
        headers: {
          'Authorization': `Bearer ${restaurantToken}`
        },
      });  // Use item id for deletion
      fetchMenu(); // Refresh the menu after deletion
    } catch (err) {
      console.error('Error deleting menu item:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="menu-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-list">
      <div className="floating-decoration floating-decoration-1"></div>
      <div className="floating-decoration floating-decoration-2"></div>
      <div className="floating-decoration floating-decoration-3"></div>
      
      {Object.entries(menuData).length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🍽️</div>
          <h3>No menu items found</h3>
          <p>Start building your menu by adding your first item!</p>
        </div>
      ) : (
        Object.entries(menuData).map(([category, items]) => (
          <div key={category} className="menu-category">
            <div className="category-header">
              <h3>{category}</h3>
              <span className="item-count">{items.length} items</span>
            </div>
            <div className="menu-items-grid">
              {items.map(item => (
                <div
                  key={item.id}
                  className="menu-item"
                  onClick={() => handleDelete(item.id)}
                  title="Click to delete"
                >
                  <div className="menu-item-image">
                    <img src={item.imageUrl} alt={item.name} />
                    <div className="delete-overlay">
                      <span className="delete-icon">🗑️</span>
                    </div>
                  </div>
                  <div className="menu-item-info">
                    <h4 className="item-name">{item.name}</h4>
                    <p className="item-description">{item.Includings}</p>
                    <div className="item-details">
                      <span className="menu-number">#{item.menuNumber}</span>
                      <span className="item-price">Rs. {item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MenuListColumn;