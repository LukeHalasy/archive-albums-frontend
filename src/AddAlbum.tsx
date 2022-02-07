import React, { useState } from 'react';
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

  const handleSearchStart  = async (e: React.MouseEvent) => {
    e.preventDefault();

    setSearching(!searching);
  }

  
  const addAlbum = async (albumDetails: AlbumDetails) => {
    const result = await axios.post('http://localhost:4000/api/v1/albums/addAlbum', JSON.stringify(albumDetails), {
      headers: {
       'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    console.log(result);
    setSearching(false);
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="buttonRow">
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={listenOptions} value={listenOptions[0]} placeholder="Listen Status" />
          <div className="addAlbum" onClick={handleSearchStart}>
            <img src={ add } className="add"/>
            <img src={ record } className="record"/>
          </div>
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={filterOptions} value={filterOptions[0]} placeholder="Sort By" />
        </div>

        {searching  && <SearchInput addAlbum={addAlbum}/>}
        <div className="albumsContainer"></div>
      </div>
    </div>
  );
}
