import React from 'react';
import ReactDOM from 'react-dom/client';
import VendorDashboard from './app/components/VendorDashboard';

// We removed the CSS import because the file doesn't exist.
// Your UI components (button.tsx, card.tsx) likely have their own styles or import Tailwind directly.

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <VendorDashboard />
  </React.StrictMode>
);
