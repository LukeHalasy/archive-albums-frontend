import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'
import './Login.css';

interface Props {

}

export const Login: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await login({
      email,
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
    <div className='signInContainer'>
      <div className="signIn">Sign in </div>
      <div className="loginDescription">Enter your email and password to sign in</div>
      <input className='loginButton' type="email" placeholder='Email' onChange={e =>setEmail(e.target.value)}/>
      <input className='loginButton' type="password" placeholder='Password' onChange={e =>setPassword(e.target.value)}/>
      <button className='loginSubmit' type="submit" onClick={handleLogin}>Sign In</button>
      <div className='dontHaveContainer'><div className='dontHave'>Don't have an account?</div> <Link className="signUpText" to='/signup'>Sign Up</Link></div>
    </div>
  );
}
