import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './useAuth';

import { Navbar } from './Navbar';
import { Login }  from './Login';
import { SignUp }  from './SignUp';

import { AddAlbum } from './AddAlbum';

import './App.css';

export const App: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div className="content">
          <div className="leftArea">
          <div className="header">
            <p className="title">Archive albums</p>
            <p className='description'>you want to listen to.</p>
          </div>
          
          {(auth.authenticated) ?
            <div>
              <Link to="/albums">albums</Link>
            </div>
            :
            <div className='buttonsContainer'>
              <Login />
            </div>
          }
          </div>
          <div className='previewArea'>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
