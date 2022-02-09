import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from './useAuth';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { AddAlbum } from './AddAlbum';

import './App.css';

export const App: React.FC<{}> = () => {
  const { auth } = useContext(authContext);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        {(auth.authenticated) ? 
            <AddAlbum />
           : 
            <div>
              Archive Albums <br /> 
              { /* todo: if user is logged in and goes to login page, redirect to add album */ }
              <Link to="/login">login</Link> <br />
              <Link to="/signup">sign up</Link> <br />
            </div>
          
        }
      </div>
      <Footer />
    </React.Fragment>
  );
};
