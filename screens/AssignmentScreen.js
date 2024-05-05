// screens/AssignmentScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AssignmentScreen = ({ route }) => {
  const { assignments } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.transcriptContainer}>
        {assignments.map((assignment, index) => (
          <View key={index} style={styles.assignmentCard}>
            <Text style={styles.assignmentName}>{assignment.name}</Text>
            <Text style={styles.assignmentCategory}>{assignment.category}</Text>
            <Text style={styles.assignmentDate}>
              Assigned: {assignment.dateAssigned} - Due: {assignment.dateDue}
            </Text>
            {assignment.score !== '' && (
              <Text style={styles.assignmentScore}>Score: {assignment.score}</Text>
            )}
            {assignment.score == '' && (
              <Text style={styles.assignmentScore}>Score: {'Not Graded'}</Text>
            )}
            {assignment.totalPoints !== '' && (
              <Text style={styles.assignmentTotalPoints}>
                Total Points: {assignment.totalPoints}
              </Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 20,
      backgroundColor: '#f0f0f0',
    },
    transcriptContainer: {
      marginTop: 10,
    },
    classCard: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      elevation: 3,
    },
    className: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    classGrade: {
      fontSize: 16,
      color: '#666',
    },
    assignmentCard: {
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 10,
      marginTop: 10,
    },
    assignmentName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 3,
    },
    assignmentCategory: {
      fontSize: 14,
      color: '#444',
      marginBottom: 3,
    },
    assignmentDate: {
      fontSize: 14,
      color: '#777',
    },
  });

export default AssignmentScreen;
