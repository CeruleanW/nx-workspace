import React from 'react';
import ThemeProvider from './Theme';
import { AuthProvicder } from '@idea/features/auth/components/AuthProvicder';

export function AppProvider(props) {
  return (
    <ThemeProvider>
      <AuthProvicder>{props.children}</AuthProvicder>
    </ThemeProvider>
  );
}
