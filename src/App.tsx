import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export const App: React.FC<{}> = (props) => {
  return (
    <div>
      Test Test <br /> 
      <Link to="/login">Login</Link> <br />
      <Link to="/signup">Sign Up</Link> <br />
      <Link to="/addalbum">Add Album</Link> <br />
    </div>
  );
}
