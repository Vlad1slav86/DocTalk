import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
