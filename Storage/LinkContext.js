import React, { createContext, useContext, useState } from 'react';

const LinkContext = createContext();

export const LinkProvider = ({ children }) => {
  const [link, setLink] = useState('https://hac.friscoisd.org/'); // Initial value can be anything

  return (
    <LinkContext.Provider value={{ link, setLink }}>
      {children}
    </LinkContext.Provider>
  );
};

export const useLink = () => {
  return useContext(LinkContext);
};
