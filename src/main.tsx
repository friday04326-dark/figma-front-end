import React from 'react';
import ReactDOM from 'react-dom/client';
import VendorDashboard from './app/components/VendorDashboard';
import './app/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <VendorDashboard />
  </React.StrictMode>
);
