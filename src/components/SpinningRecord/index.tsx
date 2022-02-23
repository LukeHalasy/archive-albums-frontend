import React from 'react';

import './index.css';
import record from '@assets/images/record.svg';

interface Props {
  style?: React.CSSProperties
}

const SpinningRecord: React.FC<Props> = ({ style }: Props) => {
  return (
    <img alt="load icon" style={style} className="recordLoadIcon" src={ record }></img> 
  );
}

export default SpinningRecord;
