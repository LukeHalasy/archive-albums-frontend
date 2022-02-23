import React, { useState, useEffect, lazy, Suspense } from 'react';
import axios from 'axios';

import Navbar from '@components/Navbar';
import LoadingPage from '@pages/LoadingPage';

import add from '@assets/images/add.svg'
import record from '@assets/images/record.svg'

import './index.css';

const SearchInput = lazy(() => import('./SearchInput'));

interface Props {}

interface AlbumDetails {
  name: string
  artist: string
  image: string
  _id: string
}

const Albums: React.FC<Props> = (props) => {
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


      if (result.status === 200) {
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
  }, [props])

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
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/deleteAlbum/${_id}`, {
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
        {searching  && <Suspense fallback={<LoadingPage />}><SearchInput addAlbum={addAlbum}/></Suspense>}
        <div className="buttonRow">
          <div className="addAlbum" onClick={handleSearchStart}>
            <img alt="Plus button part of add button" src={ add } style={(searching) ? {'transform': 'rotate(-45deg)'} : {}} className="add"/>
            <img alt="Record, on add button" src={ record } className="record"/>
          </div>
        </div>  

        <Suspense fallback={<div>Fetching albums...</div>}>
          <div className={(searching) ? "shiftForSearch albumsContainer" : "regular albumsContainer"}>
            {(albums.length > 0) ? albums.map((album, index) => (
              <div key={index} className='albumContainer'>
                <div className="album">
                  {(album.image) ? <img alt={`${album.name} - ${album.artist}`} src={album.image} /> : <div className="imageNotFound"></div>}
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
        </Suspense>
      </div>
    </React.Fragment>
  );
}

export default Albums;
