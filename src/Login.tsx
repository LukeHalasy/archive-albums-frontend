import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'
import axios from 'axios';
import './Login.css';

interface Props {

}

/*
interface LoginResponse {


}
*/

interface AlbumDetails {
  title: string
  artist: string
}

async function addAlbum(albumDetails: AlbumDetails) {
  return axios.post('http://localhost:4000/api/v1/albums/addAlbum', JSON.stringify(albumDetails), {
    headers: {
     'Content-Type': 'application/json'
    },
    withCredentials: true
  })
   .then(data => data)
}

export const Login: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
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

  const handleclicktwo = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // call API
    const response = await addAlbum({
      title,
      artist
    });

    console.log(response);
  }


  return (
    <div>
      <h1>Login: </h1>
      <input type="text"  onChange={e =>setUsername(e.target.value)}/>
      <input type="text"  onChange={e =>setPassword(e.target.value)}/>
      <button  type="submit" onClick={handleLogin}>submit</button>

      <br />

      <h1>Add Album: </h1>
      <input type="text"  onChange={e =>setTitle(e.target.value)}/>
      <input type="text"  onChange={e =>setArtist(e.target.value)}/>
      <button  type="submit" onClick={handleclicktwo}>add</button>
    </div>
  );
}
