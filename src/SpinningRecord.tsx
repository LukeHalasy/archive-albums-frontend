import React from 'react';

import './SpinningRecord.css';
import record from './images/record.svg';

interface Props {
  style?: React.CSSProperties
}

export const SpinningRecord: React.FC<Props> = ({ style }: Props) => {
  return (
    <img style={style} className="recordLoadIcon" src={ record }></img> 
  );
}
