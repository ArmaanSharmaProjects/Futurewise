import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen';
import TranscriptScreen from './screens/TranscriptScreen';
import HomeScreen from './screens/HomeScreen';
import ClassScreen from './screens/ClassScreen';
import GPAScreen from './screens/GPAScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import AssignmentScreen from './screens/AssignmentScreen';
import { GpaProvider } from '../gpa-calc-test/Storage/GpaContext';
import { UsernamePasswordProvider } from '../gpa-calc-test/Storage/UsernamePasswordContext';
import { LinkProvider } from '../gpa-calc-test/Storage/LinkContext';
import { TranscriptProvider } from './Storage/TranscriptContext';
import { ClassProvider } from './Storage/ClassContext';
import { ScheduleProvider } from './Storage/ScheduleContext';



const Stack = createStackNavigator();

export default function App() {
  return (
    <UsernamePasswordProvider>
      <LinkProvider>
      <GpaProvider>
      <ClassProvider>
        <TranscriptProvider>
          <ScheduleProvider>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name = "Home" component = {HomeScreen} />
                <Stack.Screen name="Transcript" component={TranscriptScreen} />
                <Stack.Screen name="Classes" component={ClassScreen} />
                <Stack.Screen name="Assignments" component={AssignmentScreen} />
                <Stack.Screen name="GPA" component={GPAScreen} />  
                <Stack.Screen name="Schedule" component={ScheduleScreen} />  
              </Stack.Navigator>
            </NavigationContainer>
            </ScheduleProvider>
        </TranscriptProvider>
        </ClassProvider>
        </GpaProvider>
      </LinkProvider>
    </UsernamePasswordProvider>
  );
}
