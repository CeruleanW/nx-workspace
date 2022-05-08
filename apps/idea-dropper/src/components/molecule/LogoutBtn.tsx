import React from 'react';
import { signOut } from 'next-auth/client';
import MenuItem from '@mui/material/MenuItem';

export function LogoutBtn(props) {
  const {onFulfilled, ...rest} = props;

  const handleLogout = (event) => {
    signOut();
    onFulfilled && onFulfilled();
  }

  return (
    <MenuItem onClick={handleLogout}>Logout</MenuItem>
  )
}
