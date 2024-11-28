import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' in React 18
import App from './App';
import Modal from 'react-modal';

// Set the app element globally, usually in your main entry file (like App.jsx or index.js)
Modal.setAppElement('#root');  // Use the root element or whichever is appropriate


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
