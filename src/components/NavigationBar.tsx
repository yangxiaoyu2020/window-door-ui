import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavigationBar.css';
import '../App.css';


const NavigationBar: React.FC = () => {
    return (
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/pipeline">Pipeline</Link></li>
            <li><Link to="/orderlist">订单列表</Link></li>
            <li><Link to="/factory">工厂</Link></li>
            <li><Link to="/logistics">物流</Link></li>
            <li><Link to="/aftersales">售后</Link></li>
          </ul>
        </nav>
    );
  };
  

export default NavigationBar;