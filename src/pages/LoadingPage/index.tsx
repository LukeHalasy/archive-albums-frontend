import React from 'react';
import './index.css';

import SpinningRecord  from '@components/SpinningRecord';
import Navbar from '@components/Navbar';

interface Props {}

const LoadingPage: React.FC<Props> = () => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="loadContainer">
        <SpinningRecord / >
      </div>
    </React.Fragment>
    
  );
}

export default LoadingPage;
