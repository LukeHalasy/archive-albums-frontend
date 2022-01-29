import React, { useState } from 'react';
import './SignUp.css';

interface Props {

}

/*
interface SignUpResponse {


}
*/
interface Credentials {
  username: string;
  password: string;
}

async function signUpUser(credentials: Credentials) {
  return fetch('http://localhost:4000/api/v1/users/signup', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
   .then(data => data.json())
}

export const SignUp: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleclick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // call API
    const response = await signUpUser({
      username,
      password
    });

    console.log(response);
  }

  return (
    <div>
      <h1>Sign Up: </h1>
      <input type="text"  onChange={e =>setUsername(e.target.value)}/>
      <input type="text"  onChange={e =>setPassword(e.target.value)}/>
      <button  type="submit" onClick={handleclick}>submit</button>
    </div>
  );
}
