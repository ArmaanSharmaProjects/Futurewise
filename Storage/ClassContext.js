import React, { createContext, useContext, useState } from 'react';

const ClassContext = createContext();

export const ClassProvider = ({ children }) => {
  const [classData, setClassData] = useState(null); // Initial value can be anything


  return (
    <ClassContext.Provider value={{ classData, setClassData }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  return useContext(ClassContext);
};
