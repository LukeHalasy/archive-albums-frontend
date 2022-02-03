import React, { useState } from 'react';
import axios from 'axios';
import './AddAlbum.css';

interface Props {

}

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

export const AddAlbum: React.FC<Props> = (props) => {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const handleclick = async (e: React.MouseEvent) => {
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
      TEXT TETSTEST TETSETSET SETSTSETSET SETSTSETSE TSETSTSET SEtSET
      <h1>Add Album: </h1>
      <input type="text"  onChange={e =>setTitle(e.target.value)}/>
      <input type="text"  onChange={e =>setArtist(e.target.value)}/>
      <button  type="submit" onClick={handleclick}>add</button>
    </div>
  );
}
