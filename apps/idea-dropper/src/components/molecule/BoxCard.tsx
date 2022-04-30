import React from 'react';

export function BoxCard({ name, ...optionals }) {
  return (
    <div {...optionals}>
      <p>{name}</p>
    </div>
  );
}
