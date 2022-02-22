import React from 'react';
import './LoadingPage.css';

import { SpinningRecord } from './SpinningRecord';
import { Navbar } from './Navbar';

interface Props {

}

export const LoadingPage: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="loadContainer">
        <SpinningRecord / >
      </div>
    </React.Fragment>
    
  );
}
