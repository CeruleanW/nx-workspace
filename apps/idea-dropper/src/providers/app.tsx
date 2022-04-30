import React from 'react';
import Theme from './Theme';
import { AuthProvicder } from '@idea/features/auth/components/AuthProvicder';

export function AppProvider(props) {
  return (
    <Theme>
      <AuthProvicder>{props.children}</AuthProvicder>
    </Theme>
  );
}
