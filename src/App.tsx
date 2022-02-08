import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from './useAuth';
import './App.css';

export const App: React.FC<{}> = () => {
  const { auth } = useContext(authContext);

  if (auth.authenticated) {
    return (
      <div>
        {`Logged in as: ${auth.email}`}<br />
        <Link to="/addalbum">add album</Link> <br />
        <Link to="/logout">logout</Link> <br />
      </div>
    )  
  } else {
    return (
      <div>
        Archive Albums <br /> 
        { /* todo: if user is logged in and goes to login page, redirect to add album */ }
        <Link to="/login">login</Link> <br />
        <Link to="/signup">sign up</Link> <br />
      </div>
    )
  }
}
