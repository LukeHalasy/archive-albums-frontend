import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

import { Navbar } from './Navbar';
import Video from './AutoPlaySilentVideo';
import { SpinningRecord } from './SpinningRecord';
import mobileDemo from './images/mobileDemo.mp4';

import './App.css';

const App: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  const [ loadingResponse, setLoadingResponse ] = useState(false);

  const [ signingUp, setSigningUp ] = useState(false);
  const [ serverMessage, setServerMessage ] = useState("");
  
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    setLoadingResponse(true);
    const result = await login({
      email,
      password
    });

    setLoadingResponse(false);
    if (result && result.status == 200) {
      navigate("/albums");
    } else if (result && (result.status == 404 || (result.status == 400 && result.data.message == 'incorrect email or password'))) {
      // display failed login info
      setServerMessage("Incorrect email or password")
    } else {
      setServerMessage("Failed to login")
    }
  }
  
  const handleSignup = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    setLoadingResponse(true);
    const result = await signup({
      email,
      password
    });

    
    setLoadingResponse(false);
    if (result && result.status == 201) {
      navigate("/albums");
    } else if (result && result.data.message) {
      setServerMessage(result.data.message);
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
              <p className='description'>Keep track of albums <br /> you want to listen to.</p>
            </div>
            
            <div className="mobileDemoView">
              <p className="title">Demo</p>
              <Video video={mobileDemo}/>
            </div>

            <div className='buttonsContainer'>
              <div className='userContainer'>
                <div className="title">{(signingUp) ? 'Sign Up' : 'Sign In'}{(loadingResponse) ? <SpinningRecord style={{"width": "1.3em", "marginLeft": "0.5em"}} /> : ""}</div>
                <div className="accountDescription">{(signingUp) ? 'Enter a valid email and password': 'Enter your email and password'}</div>
                <input className='formInput' type="email" placeholder='Email' onChange={e =>setEmail(e.target.value)}/>
                <input className='formInput' type="password" placeholder='Password' onChange={e =>setPassword(e.target.value)}/>
                <button className='submitButton' type="submit" onClick={(signingUp) ? handleSignup : handleLogin}>{(signingUp) ? "Sign Up" : "Sign In"}</button>
                {(serverMessage == '') ? <div className='serverMessage' style={{ 'display': 'none' }}>{serverMessage}</div> : <div className='serverMessage'>{serverMessage}</div>}
                <div className='reverseContainer'><div className='reverse'>{(signingUp) ? 'Already have an account?' : 'Don\'t have an account?'}</div> <div className="reverseText" onClick={() => {setSigningUp(!signingUp)}}>{(signingUp) ? "Sign In" : "Sign Up"}</div></div>
              </div>
            </div>
          </div>
          <div className='previewArea'>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
