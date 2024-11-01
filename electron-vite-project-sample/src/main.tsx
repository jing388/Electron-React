import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter'; // Import your new router component
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRouter /> {/* Use the AppRouter here */}
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message);
});
