import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './useAuth';

import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Login }  from './Login';
import { SignUp }  from './SignUp';

import { AddAlbum } from './AddAlbum';

import './App.css';

export const App: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);

  const [loggingIn, setLoggingIn] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="leftArea">
          <div>
            <p className="title">Archive albums</p>
            <p className='description'>you want to listen to.</p>
          </div>
          
          {(auth.authenticated) ?
            <div>
              <Link to="/albums">albums</Link>
            </div>
            :
            <div className='buttonsContainer'>
              {
                (loggingIn) ?
                  <Login />
                :
                  <div className="button" onClick={() => setLoggingIn(true)}>Login</div>
              }
              {
                (signingUp) ?
                  <SignUp />
                :
                  <div className="button" onClick={() => setSigningUp(true)}>Sign Up</div>
              } 
            </div>
          }
          </div>
          <div className='previewArea'>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};
