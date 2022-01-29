import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export const App: React.FC<{}> = (props) => {
  return (
    <div>
      Test Test  
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
