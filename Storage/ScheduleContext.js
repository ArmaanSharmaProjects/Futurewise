import React, { createContext, useContext, useState } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [studentSchedule, setStudentSchedule] = useState(null);

  return (
    <ScheduleContext.Provider value={{ studentSchedule, setStudentSchedule }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export const useSchedule = () => {
  return useContext(ScheduleContext);
};