import React from 'react';
import './Footer.css';

interface Props {

}

export const Footer: React.FC<Props> = (props) => {
  return (
    <div className='barArea'>
      <div className='topBar'></div>
      <div className='bottomBar'></div>
    </div>
  );
}
