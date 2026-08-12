import React from 'react';
import './FloatingObjects.css';

export const FloatingObjects: React.FC = () => {
  return (
    <div className="floating-objects-container">
      <div className="floating-shape shape-1"></div>
      <div className="floating-shape shape-2"></div>
      <div className="floating-shape shape-3"></div>
      <div className="floating-shape shape-4"></div>
      <div className="floating-shape shape-5"></div>
    </div>
  );
};
