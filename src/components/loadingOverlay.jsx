// components/loadingOverlay.jsx
import React from 'react';

const loadingOverlay = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-50">
    <div className="border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
  </div>
);

export default loadingOverlay;
