import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import axios from 'axios';
import './Logout.css';

interface Props {

}

export const Logout: React.FC<Props> = (props) => {
  const navigate = useNavigate();
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
    <div>
      <h1>Logout: </h1>
      <button  type="submit" onClick={handleLogout}>logout</button>
    </div>
  );
}
