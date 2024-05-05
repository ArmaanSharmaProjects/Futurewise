import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useGpa } from '../Storage/GpaContext';
import { useTranscript } from '../Storage/TranscriptContext';

const GPAScreen = () => {
  const { gpa, setGpa, gpaQuarter, setGpaQuarter } = useGpa();
  const { gpaTranscriptW, gpaTranscriptU } = useGpa();
  const { classWeight } = useTranscript();
  const weightedGPA = gpaTranscriptW;
  const unweightedGPA = gpaTranscriptU;

  const quarterWeight = 100 / (classWeight + 1);
  const oldWeight = 100 - quarterWeight;

  const projectedGpa = ((parseFloat(weightedGPA) * oldWeight) + (gpaQuarter * quarterWeight)) / 100;

  setGpa(projectedGpa);


  return (
    <View style={styles.container}>
      <View style={styles.gpaContainer}>
        <View style={styles.circleWrapper}>
          <AnimatedCircularProgress
            size={150} // Increase the size for better visibility
            width={15}
            fill={(weightedGPA / 6.0) * 100}
            tintColor="#FF5733"
            backgroundColor="black"
            rotation={0}
            duration={1000}
          >
            {fill => (
              <Text style={styles.progressText}>{(fill / 100 * 6.0).toFixed(2)}</Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.label}>Weighted GPA</Text>
      </View>

      <View style={styles.gpaContainer}>
        <View style={styles.circleWrapper}>
          <AnimatedCircularProgress
            size={150} // Increase the size for better visibility
            width={15}
            fill={(unweightedGPA / 4.0) * 100}
            tintColor="#FFCC33"
            backgroundColor="black"
            rotation={0}
            duration={1000}
          >
            {fill => (
              <Text style={styles.progressText}>{(fill / 100 * 4.0).toFixed(2)}</Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.label}>Unweighted GPA</Text>
      </View>

      <View style={styles.gpaContainer}>
        <View style={styles.circleWrapper}>
          <AnimatedCircularProgress
            size={150} // Increase the size for better visibility
            width={15}
            fill={(projectedGpa / 6.0) * 100}
            tintColor="#3399FF"
            backgroundColor="black"
            rotation={0}
            duration={1000}
          >
            {fill => (
              <Text style={styles.progressText}>{(fill / 100 * 6.0).toFixed(2)}</Text>
            )}
          </AnimatedCircularProgress>
        </View>
        <Text style={styles.label}>Projected GPA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#33CC33', // Background color for the entire container
  },
  gpaContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circleWrapper: {
    width: 150,
    height: 150,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white', // Label text color
  },
  progressText: {
    fontSize: 24, // Larger font size for better visibility
    textAlign: 'center',
    marginTop: 5,
    color: 'white', // Text color
  },
});

export default GPAScreen;
