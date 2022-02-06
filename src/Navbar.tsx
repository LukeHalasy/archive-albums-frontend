import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { authContext } from './useAuth'
import logo from './images/logo.svg'
import './Navbar.css';

interface Props {

}

export const Navbar: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const logoTagLine = (auth.authenticated) ? auth.username : "archivealbums.com";

  return (
    <div className='bar'>
      <div className='home'>
        <img src={ logo }/>
        <p>{logoTagLine}</p>
      </div>
      <div className='logout'>
        <div className='topBar'>
        </div>
        <div className='bottomBar'>
        </div>
      </div>
    </div>
  );
}
