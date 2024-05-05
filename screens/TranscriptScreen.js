import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTranscript } from '../Storage/TranscriptContext';

const TranscriptScreen = () => {
  const { transcriptData } = useTranscript();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.transcriptContainer}>
        {Object.entries(transcriptData).map(([key, value]) => {
          if (key === 'rank' || key === 'Weighted GPA' || key === '4.0 College GPA') {
            return (
              <Text key={key} style={styles.transcriptItem}>
                {key}: {value}
              </Text>
            );
          } else if (key.includes('Semester')) {
            return (
              <View key={key} style={styles.semesterContainer}>
                <Text style={styles.semesterTitle}>{key}</Text>
                <View style={styles.semesterInfoContainer}>
                  <Text style={styles.transcriptItem}>Year: {value.year}</Text>
                  <Text style={styles.transcriptItem}>Grade: {value.grade}</Text>
                  <Text style={styles.transcriptItem}>School: {value.school}</Text>
                  <Text style={styles.transcriptItem}>Credits: {value.credits}</Text>
                </View>
                <View style={styles.transcriptTable}>
                  {value.data.map((row, index) => (
                    <View key={index} style={styles.transcriptTableRow}>
                      {row.map((item, i) => (
                        <Text key={i} style={styles.transcriptTableItem}>
                          {item}
                        </Text>
                      ))}
                    </View>
                  ))}
                </View>
              </View>
            );
          }
          return null;
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#33CC33', // Background color for the entire container
  },
  transcriptContainer: {
    marginTop: 20,
  },
  transcriptItem: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white', // Text color
  },
  semesterContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'black', // Background color for each semester container
    borderRadius: 10,
  },
  semesterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white', // Text color
  },
  semesterInfoContainer: {
    marginBottom: 10,
  },
  transcriptTable: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    backgroundColor: 'black', // Background color for the table
  },
  transcriptTableRow: {
    flexDirection: 'row',
  },
  transcriptTableItem: {
    flex: 1,
    padding: 5,
    textAlign: 'center',
    color: 'white', // Text color
  },
  classBubblesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  classBubble: {
    backgroundColor: 'black',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
  },
  classBubbleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default TranscriptScreen;
