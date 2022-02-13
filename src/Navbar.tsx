import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, authContext } from './useAuth'
import logo from './images/logo.svg'
import './Navbar.css';

interface Props {

}

export const Navbar: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const { auth } = useContext(authContext);
  const logoTagLine = (auth.authenticated) ? auth.email : "archivealbums.com";


  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await logout();

    if (result.status == 200) {
      navigate("/");
    } else {
      // display message to user about how they weren't able to be logged out 
      console.log(result);
    }
  }

  return (
    <div className='barContainer' style={(location.pathname == "/") ? { 'position': 'absolute' } : {}}>
      <div className='bar'>
        <div className='home'>
          <img src={ logo } onClick={() => navigate("/")}/>
          <p className='tagLine'>archivealbums.com</p>
          {
            (auth.authenticated) ?
              <div className='menu'>
                <div className="emailName">{auth.email}</div>
                <div className="signOutText" onClick={handleLogout}>Sign Out</div>
              </div>
            : ""
          }
        </div>
        
      </div>
    </div>
  );
}
