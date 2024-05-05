import React, { createContext, useContext, useState } from 'react';

const TranscriptContext = createContext();

export const TranscriptProvider = ({ children }) => {
  const [classWeight, setClassWeight] = useState(0); // Initial value can be anything
  const [transcriptData, setTranscriptData] = useState(null);

  return (
    <TranscriptContext.Provider value={{ classWeight, setClassWeight, transcriptData, setTranscriptData }}>
      {children}
    </TranscriptContext.Provider>
  );
};

export const useTranscript = () => {
  return useContext(TranscriptContext);
};
