import React from 'react';
import './Loading.css';

import record from './images/record.svg';

interface Props {

}

export const Loading: React.FC<Props> = (props) => {
  return (
    <div className="loadContainer">
      <img className="recordLoadIcon" src={ record } />
    </div>
  );
}
