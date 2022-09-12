import React from 'react'

export function UserProfile({ user }) {
  const displayedName = user?.name ?? user.email;

  return (
    <div>
      <p style={{ marginBottom: '10px' }}> Welcome, {displayedName}</p> <br />
      <img src={user.image} alt={`${displayedName}`} />
    </div>
  )
}
