import React from 'react';

export default function Spotlight(props) {
  const { keypoint, ...rest } = props;
  return (
    <li className='mb-2'>
      {keypoint ? <span className='font-bold capitalize'>{keypoint}:</span> : null}{' '}
      {props.children}
    </li>
  );
}
