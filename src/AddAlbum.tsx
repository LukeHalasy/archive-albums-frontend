import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from './Navbar';
import { SearchInput } from './SearchInput';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import add from './images/add.svg'
import record from './images/record.svg'

import './AddAlbum.css';

interface Props {

}

interface AlbumDetails {
  name: string
  artist: string
  image: string
}

const listenOptions = ['listened', 'want to listen', 'all']
const filterOptions = ['add date', 'publish date']

export const AddAlbum: React.FC<Props> = (props) => {
  const [listenStatus, setListenStatus] = useState('listened')
  const [filterStatus, setFilterStatus] = useState('none');
  const [searching, setSearching] = useState(false);
  const [albums, setAlbums] = useState<AlbumDetails[]>([]);
  /*
  const handleclick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // call API
    const response = await addAlbum({
      title,
      artist
    });

    console.log(response);
  }
  */

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
      console.log(result);

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

    console.log(result);
    setAlbums((albums) => [...albums, albumDetails] );
    setSearching(false);
  }

  return (
    <React.Fragment>
      <Navbar />
      <div className='albumsPageContainer'>
        <div className="buttonRow">
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={listenOptions} value={listenOptions[0]} placeholder="Listen Status" />
          <div className="addAlbum" onClick={handleSearchStart}>
            <img src={ add } className="add"/>
            <img src={ record } className="record"/>
          </div>
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={filterOptions} value={filterOptions[0]} placeholder="Sort By" />
        </div>

        {searching  && <SearchInput addAlbum={addAlbum}/>}
        <div className="albumsContainer">
          {(albums.length > 0) ? albums.map((album, index) => (
            <div key={index} className="album">
              {(album.image) ? <img src={album.image} /> : <img />}
              <div className="description">
                <p>{album.name}</p>
                <p>{album.artist}</p>
              </div>
            </div>
          )) : <p>No albums</p>}
        </div>
      </div>
    </React.Fragment>
  );
}
