import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Bell, Menu, User } from 'lucide-react';
import './Header.css';

const Header = ({ onMenuClick, title = "Dashboard", notificationCount = 3 }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="menu-button" onClick={onMenuClick} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
          <h1 className="header-title">{title}</h1>
        </div>
        
        <div className="header-right">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar cursos..." 
              className="search-input"
            />
          </div>
          
          <button className="icon-button notification-button" aria-label="Notifications">
            <Bell size={20} />
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>
          
          <button className="icon-button user-button" aria-label="User menu">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

