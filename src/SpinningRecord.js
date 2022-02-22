import React from 'react';

import './SpinningRecord.css';
import record from './images/record.svg';

interface Props {

}

export const SpinningRecord: React.FC<Props> = (props) => {
  return (
    <img alt="loading record animation" className="recordLoadIcon" src={ record } />
  );
}
