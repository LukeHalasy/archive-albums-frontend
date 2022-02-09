import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth, authContext } from './useAuth'
import logo from './images/logo.svg'
import './Navbar.css';

interface Props {

}

export const Navbar: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const logoTagLine = (auth.authenticated) ? auth.email : "archivealbums.com";

  const [settingsScreen, setSettingsScreen] = useState(false);

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
    <div className='bar'>
      <div className='home'>
        <img src={ logo }/>
        <p>{logoTagLine}</p>
      </div>
      <div className='logout' onClick={() => setSettingsScreen(!settingsScreen)}>
        {(settingsScreen) ? 
          <div className='settingsScreen'>
            <div className='logout' onClick={handleLogout}>Logout fair maiden</div> 
          </div>
        :
          <div>
            <div className='topBar'>
            </div>
            <div className='bottomBar'>
            </div>
          </div>
        }
        
      </div>
    </div>
  );
}
