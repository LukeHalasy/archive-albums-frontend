import React, { useState } from 'react';
import './SignUp.css';
import { useAuth } from './useAuth'
import { useNavigate } from 'react-router-dom'

interface Props {

}

/*
interface SignUpResponse {


}
*/

export const SignUp: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    <div>
      <h1>Sign Up: </h1>
      <input type="text"  onChange={e =>setEmail(e.target.value)}/>
      <input type="text"  onChange={e =>setPassword(e.target.value)}/>
      <button  type="submit" onClick={handleSignup}>submit</button>
    </div>
  );
}
