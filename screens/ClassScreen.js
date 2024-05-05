import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useGpa } from '../Storage/GpaContext';
import { useUsernamePassword } from '../Storage/UsernamePasswordContext';
import { useClass } from '../Storage/ClassContext';

const ClassScreen = ({ navigation }) => {
  
  const{classData} = useClass();
  
  
  const {gpaQuarter, setGpaQuarter } = useGpa();

  const { username } = useUsernamePassword();
  const { password } = useUsernamePassword();

  

  
  const [quarter, setQuarter] = useState('current');
  const [classDataForQuarter, setClassDataForQuarter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classItemName = ''
  
  

  useEffect(() => {
    const fetchClassDataForQuarter = async () => {
      setIsLoading(true);
      try {
        if (quarter === 'debug') {
          // Create mock class items with manual grades
          const mockClasses = [
            {
              name: 'AP Debug Class 1',
              grade: '95',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'On Level Debug Class 2',
              grade: '100',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'Debug Class 3 Adv',
              grade: '85',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'AP Debug Class 2',
              grade: '90',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'Debug Class 2 Adv',
              grade: '76',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'On Level Debug Class 2',
              grade: '92',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'AP Debug Class 2',
              grade: '52',
              lastUpdated: '',
              assignments: [],
            },
            {
              name: 'AP Debug Class 2',
              grade: '94',
              lastUpdated: '',
              assignments: [],
            },
          ];
          setClassDataForQuarter(mockClasses);
        } else {
          const apiUrl = `https://friscoisdhacapi.vercel.app/api/pastclasses?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&quarter=${quarter}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setClassDataForQuarter(data.pastClasses);
        }
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
      setIsLoading(false);
    };
  
    if (quarter !== 'current') {
      fetchClassDataForQuarter();
    } else {
      setClassDataForQuarter(classData.currentClasses);
    }
  }, [quarter]);

  
  // Calculate GPA for each class and sum up
  const calculateGPA = (grade, className) => {
    let gpa = 0;
    let countClasses = 0;
    if (className.includes('AP ')) {
      gpa = 6.0 - ((100 - grade) * 0.1);
      
    } else if (className.includes(' Adv')) {
      gpa = 5.5 - ((100 - grade) * 0.1);
    } else {
      gpa = 5.0 - ((100 - grade) * 0.1);
    }

    return gpa;
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Hide the default header
    });
  }, [navigation]);

 
  let totalGPA = 0;
  let length = classData.currentClasses.length;

  classData.currentClasses.forEach((classItem) => {
    const classGrade = parseFloat(classItem.grade);
    if(classItem.grade == ""){
      length -=1;
    }
    else{
      const classGPA = calculateGPA(classGrade, classItem.name);
      totalGPA += classGPA;
    }
  });

  const gpaQuarterT = totalGPA / length;
  setGpaQuarter(gpaQuarterT);
 
  
  /*Testing Purposes: */ 
  


  const handleHome = () => {
    navigation.navigate('Home');
  };

  
  const getGradeBubbleColor = (grade) => {
    if (!grade || isNaN(grade)) {
      return '#CCCCCC'; // Gray for no grade or invalid grade
    }
    const numericGrade = parseFloat(grade);
    if (numericGrade < 70) {
      return '#FF0000'; // Red for grade < 70
    } else if (numericGrade >= 70 && numericGrade < 80) {
      return '#FFA500'; // Orange for grade between 70 and 80
    } else if (numericGrade >= 80 && numericGrade < 90) {
      return '#3399FF'; // Blue for grade between 80 and 90
    } else {
      return '#00FF00'; // Green for grade >= 90
    }
  };

  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleHome}>
          <Image source={require('../assets/back-arrow.png')} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Classes</Text>
        <View style={styles.placeholderView} /> 
      </View>
      <View style={styles.quarterButtonsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.quarterButtons}>
            <TouchableOpacity
              style={quarter === '1' ? styles.activeQuarterButton : styles.quarterButton}
              onPress={() => setQuarter('1')}
            >
              <Text style={styles.quarterButtonText}>Quarter 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={quarter === '2' ? styles.activeQuarterButton : styles.quarterButton}
              onPress={() => setQuarter('2')}
            >
              <Text style={styles.quarterButtonText}>Quarter 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={quarter === '3' ? styles.activeQuarterButton : styles.quarterButton}
              onPress={() => setQuarter('3')}
            >
              <Text style={styles.quarterButtonText}>Quarter 3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={quarter === '4' ? styles.activeQuarterButton : styles.quarterButton}
              onPress={() => setQuarter('4')}
            >
              <Text style={styles.quarterButtonText}>Quarter 4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={quarter === 'debug' ? styles.activeQuarterButton : styles.quarterButton}
              onPress={() => setQuarter('debug')}
            >
              <Text style={styles.quarterButtonText}>Quarter 5</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={styles.transcriptContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#03C203" />
        ) : (
          <View>
            {classDataForQuarter.map((classItem, index) => (
              <TouchableOpacity
              key={index}
              style={styles.classCard}
              onPress={() => {
                navigation.navigate('Assignments', { assignments: classItem.assignments });
              }}
            >
              <View style={styles.classNameContainer}>
                <Text style={styles.classNameText}>{classItem.name.indexOf('-') != -1 ? classItem.name.substring(classItem.name.indexOf('-')+5) : classItem.name}</Text>
              </View>
              <View 
               style={[
                styles.gradeBubble,
                {
                  backgroundColor: getGradeBubbleColor(classItem.grade),
                },
              ]}
              >
                <Text style={styles.gradeBubbleText}>{classItem.grade}</Text>
              </View>
              </TouchableOpacity>
            ))}
          </View> 
        )}
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
  quarterButtonsContainer: {
    marginBottom: 15,
    marginTop: 15
  },
  quarterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  quarterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  activeQuarterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#03C203',
  },
  quarterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
    position: 'relative', 
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
  classCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  classNameContainer: {
    flex: 1,
  },
  classNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  gradeBubble: {
    height: 40,
    width: 80,
    backgroundColor: '#25FF25',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradeBubbleText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25FF25', // Set the background color of the header
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 40,
    paddingHorizontal: 10,
    
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backButton: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 105
    
  },
  placeholderView: {
    flex: 1, // Take up available space to push "Classes" to the center
  },
  
});

export default ClassScreen;
