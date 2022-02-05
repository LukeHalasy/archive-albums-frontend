import React, { useState } from 'react';
import axios from 'axios';

import { Navbar } from './Navbar';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import add from './images/add.svg'
import record from './images/record.svg'

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

const listenOptions = ['listened', 'want to listen', 'all']
const filterOptions = ['add date', 'publish date']

export const AddAlbum: React.FC<Props> = (props) => {
  const [listenStatus, setListenStatus] = useState('listened')
  const [filterStatus, setFilterStatus] = useState('none');
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



  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="buttonRow">
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={listenOptions} value={listenOptions[0]} placeholder="Listen Status" />
          <div className="addAlbum">
            <img src={ add } className="add"/>
            <img src={ record } className="record"/>
          </div>
          <Dropdown controlClassName="dropdownControl" arrowClassName='arrowStyle' menuClassName='menuStyle' options={filterOptions} value={filterOptions[0]} placeholder="Sort By" />
        </div>
      </div>
    </div>
  );
}
