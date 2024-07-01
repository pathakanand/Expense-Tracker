import React from 'react';
import { Link } from 'react-router-dom';
import AppInfo from './AppInfo';

const HomePage = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to={'/login'}>Login</Link></li>
          <li><Link to={'/register'}>Register</Link></li>
        </ul>
      </nav>
      <AppInfo />
    </div>
  );
};

export default HomePage;
