import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import axios from 'axios';
import './Login.css';

interface Props {

}

export const Login: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await login({
      username,
      password
    });

    if (result.status == 200) {
      navigate("/");
    } else {
      // display failed login info
      console.log(result);
    }
  } 

  return (
    <div>
      <h1>Login: </h1>
      <input type="text"  onChange={e =>setUsername(e.target.value)}/>
      <input type="text"  onChange={e =>setPassword(e.target.value)}/>
      <button  type="submit" onClick={handleLogin}>submit</button>
    </div>
  );
}
