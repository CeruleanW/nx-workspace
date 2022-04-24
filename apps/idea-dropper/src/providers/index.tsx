import React from 'react';
import { AuthProvicder } from '@idea/features/auth/components/AuthProvicder';

export function ProviderGroup({ children }) {
  return (
    <>
      <AuthProvicder>{children}</AuthProvicder>
    </>
  )
}
