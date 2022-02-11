import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, authContext } from './useAuth';

import { Navbar } from './Navbar';
import { AddAlbum } from './AddAlbum';

import './App.css';

export const App: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { auth } = useContext(authContext);
  const { login, signup } = useAuth();
  const [ signingUp, setSigningUp ] = useState(false);
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await login({
      email,
      password
    });

    if (result.status == 200) {
      navigate("/albums");
    } else {
      // display failed login info
      console.log(result);
    }
  }
  
  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const result = await signup({
      email,
      password
    });

    if (result.status == 201) {
      navigate("/");
    } else {
      // display failed login info
      console.log(result);
    }
  }

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
              <div className='userContainer'>
                <div className="title">{(signingUp) ? 'Sign Up' : 'Sign In'}</div>
                <div className="accountDescription">{(signingUp) ? 'Enter a valid email and password to sign up': 'Enter your email and password to sign in'}</div>
                <input className='formInput' type="email" placeholder='Email' onChange={e =>setEmail(e.target.value)}/>
                <input className='formInput' type="password" placeholder='Password' onChange={e =>setPassword(e.target.value)}/>
                <button className='submitButton' type="submit" onClick={(signingUp) ? handleSignup : handleLogin}>{(signingUp) ? "Sign Up" : "Sign In"}</button>
                <div className='reverseContainer'><div className='reverse'>{(signingUp) ? 'Already have an account?' : 'Don\'t have an account?'}</div> <div className="reverseText" onClick={() => {setSigningUp(!signingUp)}}>{(signingUp) ? "Sign In" : "Sign Up"}</div></div>
              </div>
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
