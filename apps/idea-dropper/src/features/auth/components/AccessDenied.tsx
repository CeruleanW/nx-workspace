import React from 'react';
import { signIn } from 'next-auth/client';

function handleClick(e) {
  e.preventDefault()
  signIn()
}

export function AccessDenied() {

  return (
    <>
      <h1>Access Denied</h1>
      <p>
        <a href="/api/auth/signin"
          onClick={handleClick}>You must be signed in to view this page</a>
      </p>
    </>
  )
}
