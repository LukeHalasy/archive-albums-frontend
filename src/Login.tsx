import React, { useState } from 'react';
import './Login.css';

interface Props {

}

/*
interface LoginResponse {


}
*/
interface Credentials {
  username: string;
  password: string;
}

async function loginUser(credentials: Credentials) {
  return fetch('http://localhost:4000/api/v1/users/login', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
   .then(data => data.json())
}

export const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleclick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // call API
    const response = await loginUser({
      username,
      password
    });

    console.log(response);
  }

  return (
    <div>
      <input type="text"  onChange={e =>setUsername(e.target.value)}/>
      <input type="text"  onChange={e =>setPassword(e.target.value)}/>
      <button  type="submit" onClick={handleclick}>submit</button>
    </div>
  );
}
