import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';
import { ScrollTrigger } from './lib/gsap';

// Refresh ScrollTrigger once web fonts are fully loaded to ensure precision measurements
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find root element');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
