// UsernamePasswordContext.js

import React, { createContext, useContext, useState } from 'react';

const UsernamePasswordContext = createContext();

export const UsernamePasswordProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <UsernamePasswordContext.Provider value={{ username, setUsername, password, setPassword }}>
      {children}
    </UsernamePasswordContext.Provider>
  );
};

export const useUsernamePassword = () => {
  return useContext(UsernamePasswordContext);
};
