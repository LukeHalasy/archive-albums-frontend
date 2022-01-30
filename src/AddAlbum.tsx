import React, { useState } from 'react';
import './AddAlbum.css';

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
  return fetch('http://localhost:4000/api/v1/albums/addAlbum', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(albumDetails)
  })
   .then(data => data.json())
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
      <h1>Add Album: </h1>
      <input type="text"  onChange={e =>setTitle(e.target.value)}/>
      <input type="text"  onChange={e =>setArtist(e.target.value)}/>
      <button  type="submit" onClick={handleclick}>add</button>
    </div>
  );
}
