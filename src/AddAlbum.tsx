import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Navbar } from './Navbar';
import { SearchInput } from './SearchInput';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import add from './images/add.svg'
import record from './images/record.svg'

// TODO: DELETE
import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

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
    /*
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
    */

    // Testing positioning and stuff
    
    // generate fake albums
    // 
    const random_albums = [];
    for (var i  = 0; i < 30; i++) {
      const randomTitle: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals]
      });
      
      const randomArtist: string = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals]
      });

      random_albums.push({
        name: randomTitle,
        artist: randomArtist,
        image: ''
      })
    }

    setAlbums(random_albums);
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
              <div className='delete'>
              -
              </div>
            </div>
          )) : <p>No albums</p>}
        </div>
      </div>
    </React.Fragment>
  );
}
