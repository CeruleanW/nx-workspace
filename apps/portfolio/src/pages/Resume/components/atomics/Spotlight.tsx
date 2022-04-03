import React from 'react';

export default function Spotlight(props) {
  const { keypoint } = props;
  return (
    <li className='mb-2'>
      {keypoint ? <span className='font-bold'>{keypoint}:</span> : null}{' '}
      {props.children}
    </li>
  );
}
