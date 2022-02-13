import React from 'react';
import HomePage from './components/pages/HomePage';
import { AppProvider } from './providers/app';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <HomePage />
      </div>
    </AppProvider>
  );
}

export default App;
