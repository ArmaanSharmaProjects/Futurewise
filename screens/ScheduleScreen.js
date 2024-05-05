import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSchedule } from '../Storage/ScheduleContext';

const ScheduleScreen = () => {
  const { studentSchedule } = useSchedule();

  return (
    <ScrollView style={styles.container}>
      {Object.entries(transcriptData).map(([key, value]) => {
        
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  dayContainer: {
    marginBottom: 20,
  },
  dayText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  classesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  classBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#CCCCCC', // Default gray color
    marginBottom: 10,
    marginRight: 10,
  },
  classBubbleText: {
    color: 'black', // Text color for the class name
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ScheduleScreen;
