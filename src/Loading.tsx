import React from 'react';
import './Loading.css';

import record from './images/record.svg';
import { Navbar } from './Navbar';

interface Props {

}

export const Loading: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="loadContainer">
        <img alt="loading record animation" className="recordLoadIcon" src={ record } />
      </div>
    </React.Fragment>
    
  );
}
