import React, { createContext, useContext, useState } from 'react';

const GpaContext = createContext();

export const GpaProvider = ({ children }) => {
  const [gpa, setGpa] = useState(0); // Initial value can be anything
  const [gpaQuarter, setGpaQuarter] = useState(0);
  const [gpaQuarter2, setGpaQuarter2] = useState(0);
  const [gpaTranscriptW, setGpaTranscriptW] = useState(0);
  const [gpaTranscriptU, setGpaTranscriptU] = useState(0);

  return (
    <GpaContext.Provider value={{ gpa, setGpa, gpaTranscriptW, setGpaTranscriptW, gpaTranscriptU, setGpaTranscriptU, gpaQuarter, setGpaQuarter, gpaQuarter2, setGpaQuarter2}}>
      {children}
    </GpaContext.Provider>
  );
};

export const useGpa = () => {
  return useContext(GpaContext);
};
