import React from 'react';
import Spotlight from './atomics/Spotlight';

export default function Features({features, ...optionals}) {
  const { children, maxNumber = 5, ...rest } = optionals;
  return (
    <ul className='list-disc pl-4 mt-2'>
      {Array.isArray(features) ? (
        features.slice(0, maxNumber).map((item) => (
          <Spotlight key={item.keypoint} keypoint={item.keypoint}>
            {item.description}
          </Spotlight>
        ))
      ) : (
        <Spotlight keypoint={features.keypoint}>{features.description}</Spotlight>
      )}
      {children}
    </ul>
  );
}
