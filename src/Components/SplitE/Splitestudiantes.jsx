import React from 'react';
import './Splitestudiantes.css';

const Splitestudiantes = ({ children }) => {
  return (
    <div className="splitestudiante">
      {children}
    </div>
  );
};

export default Splitestudiantes;