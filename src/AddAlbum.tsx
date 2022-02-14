import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from './Navbar';
import { SearchInput } from './SearchInput';

import add from './images/add.svg'
import record from './images/record.svg'

import './AddAlbum.css';

interface Props {

}

interface AlbumDetails {
  name: string
  artist: string
  image: string
  _id: string
}

export const AddAlbum: React.FC<Props> = (props) => {
  const [searching, setSearching]= useState(false);
  const [albums, setAlbums] = useState<AlbumDetails[]>([]);

  useEffect(() => {
    async function fetchUsersAlbums() {
      const result = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/getAlbums`, {
        headers: {
         'Content-Type': 'application/json'
        },
        withCredentials: true
      });  


      if (result.status == 200) {
        for (let i = 0; i < result.data.albums.length; i++) {
          setAlbums((albums) => [...albums, result.data.albums[i]] );
        }
      } else {
        console.log("ERROR fetching")
        // TODO handle
      }

      // setAlbums((albums) => [...albums, albumDetails] );
    }

    fetchUsersAlbums();
  }, [])

  const handleSearchStart  = async (e: React.MouseEvent) => {
    e.preventDefault();

    setSearching(!searching);
  }
  
  const addAlbum = async (albumDetails: AlbumDetails) => {
    const result = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/addAlbum`, JSON.stringify(albumDetails), {
      headers: {
       'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    setAlbums((albums) => [result.data.album, ...albums ] );
  }


  const deleteAlbum = async (index: number, _id: string) => {
    const result = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/deleteAlbum/${_id}`, {
      headers: {
       'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    setAlbums([...albums.slice(0, index), ...albums.slice(index + 1)] );
  }

  return (
    <React.Fragment>
      <Navbar />
      
      <div className='albumsPageContainer'>
        {searching  && <SearchInput addAlbum={addAlbum}/>}
        <div className="buttonRow">
          <div className="addAlbum" onClick={handleSearchStart}>
            <img src={ add } style={(searching) ? {'transform': 'rotate(-45deg)'} : {}} className="add"/>
            <img src={ record } className="record"/>
          </div>
        </div>  

        <div className={(searching) ? "shiftForSearch albumsContainer" : "regular albumsContainer"}>
          {(albums.length > 0) ? albums.map((album, index) => (
            <div key={index} className='albumContainer'>
              <div className="album">
                {(album.image) ? <img src={album.image} /> : <div className="imageNotFound"></div>}
                <div className="description">
                  <div className="albumName">{album.name}</div>
                  <div className="artistName">{album.artist}</div>
                </div>
              </div>
              <div className='delete' onClick={() => {deleteAlbum(index, album._id)}}>
              -
              </div>
            </div>
          )) : ""}
        </div>
      </div>
    </React.Fragment>
  );
}
