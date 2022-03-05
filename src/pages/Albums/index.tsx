import React, { useState, useEffect, lazy, Suspense } from 'react';
import fetch from 'node-fetch';

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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/getAlbums`, {
        method: 'get',
        headers: {
         'Content-Type': 'application/json'
        },
        // @ts-ignore
        credentials: 'include' 
      });  

      const data: any = await res.json();

      if (data.status === 'success') {
        for (let i = 0; i < data.albums.length; i++) {
          setAlbums((albums) => [...albums, data.albums[i]] );
        }
      } else {
        // TODO handle
      }
    }

    fetchUsersAlbums();
  }, [])

  const handleSearchStart  = async (e: React.MouseEvent) => {
    e.preventDefault();

    setSearching(!searching);
  }
  
  const addAlbum = async (albumDetails: AlbumDetails) => {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/addAlbum`, {
      method: 'post',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(albumDetails),
      // @ts-ignore
      credentials: 'include' 
    });  

    const data: any = await res.json();
    setAlbums((albums) => [data.album, ...albums ] );
  }


  const deleteAlbum = async (index: number, _id: string) => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/albums/deleteAlbum/${_id}`, {
      method: 'delete',
      headers: {
       'Content-Type': 'application/json'
      },
      // @ts-ignore
      credentials: 'include' 
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
