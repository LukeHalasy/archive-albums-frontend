import React, {  useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '@hooks/useAuth'
import AuthContext from '@context/AuthContext'
import logo from '@/assets/images/logo.svg'
import './index.css';

interface Props {}

const Navbar: React.FC<Props> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useContext(AuthContext);
  const logoTagLine = (auth.authenticated) ? "" : "archivealbums.com";


  const { logout } = useAuth();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await logout();

    if (result && result.status === 200) {
      navigate("../");
    } else {
      // display message to user about how they weren't able to be logged out 
      navigate("../");
    }
  }

  return (
    <div className='barContainer' style={(location.pathname === "/") ? { 'position': 'absolute' } : {}}>
      <div className='bar'>
        <div className='home'>
          <img alt="logo, album folder" style={(auth.authenticated) ? {'alignSelf': 'center'} : {}} src={ logo } onClick={() => navigate("/")}/>
          <p className='tagLine'>{logoTagLine}</p>
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

export default Navbar;
