import React from 'react';
import './SplitScreen.css'; // Asegúrate de tener un archivo CSS para aplicar estilos

const SplitScreen = ({ children }) => {
  return (
    <div className="split-screen">
      {children}
    </div>
  );
};

export default SplitScreen;
