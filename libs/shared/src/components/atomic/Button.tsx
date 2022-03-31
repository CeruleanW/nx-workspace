import React from 'react';

export function Button(props) {
  const { className, ...rest } = props;
  return (
    <>
      <button className={`w-max ${className}`} {...rest} />
    </>
  );
}
