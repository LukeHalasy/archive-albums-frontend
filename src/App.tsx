import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from './useAuth';
import './App.css';
import { AddAlbum } from './AddAlbum';

export const App: React.FC<{}> = () => {
  const { auth } = useContext(authContext);

  if (auth.authenticated) {
    return (
      <AddAlbum />
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
