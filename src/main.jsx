import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import './styles/index.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#2B1D14',
            color: '#F5E6D3',
            fontSize: '14px'
          }
        }}
      />
    </HashRouter>
  </React.StrictMode>
);
