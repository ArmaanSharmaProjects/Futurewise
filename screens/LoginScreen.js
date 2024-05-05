
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { useUsernamePassword } from '../Storage/UsernamePasswordContext';
import { useLink } from '../Storage/LinkContext';
import { Alert } from 'react-native';



const ISD_OPTIONS = [
  { label: 'Frisco ISD', value: 'https://hac.friscoisd.org/' },
  { label: 'Plano ISD', value: 'https://hac.planoisd.org/' },
  { label: 'Allen ISD', value: 'https://hac.allenisd.org/' },
  { label: 'Prosper ISD', value: 'https://hac.prosper-isd.net/' },
];

const LoginScreen = ({ navigation }) => {
  const {link, setLink} = useLink();
  const { username, setUsername } = useUsernamePassword();
  const { password, setPassword } = useUsernamePassword();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const apiUrlName = `https://homeaccesscenterapi.vercel.app/api/transcript?link=${encodeURIComponent(link)}&user=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
      const responseName = await fetch(apiUrlName);
      if (responseName.ok) {
        navigation.navigate('Home', { link: link, username: username, password: password });
      } else {
        if (responseName.status === 401) {
          Alert.alert(
            'Invalid Credentials',
            'Please check your username and password and try again.',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
        } else {
          Alert.alert(
            'Error',
            `HTTP Error: ${responseName.status}. Please check your internet connection and try again.`,
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
        }
      }
    } catch (error) {
      console.log("Error Fetching Data: ", error);
        Alert.alert(
        'Error',
        'There was an error fetching data. Please check your internet connection and try again.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      );
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSelectLink = (link) => {
    setLink(link);
    toggleModal();
  };

  const handleUsernameChange = (newUsername) => {
    setUsername(newUsername);
  };
  const handlePasswordChange = (pass) => {
    setPassword(pass);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/FutureWise2.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to FutureWise</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.picker} onPress={toggleModal}>
          <Text style={styles.selectedPickerOption}>
            {ISD_OPTIONS.find(option => option.value === link)?.label || 'Select ISD'}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={handleUsernameChange}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>
      <Button title="Login" onPress={handleLogin} />

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        {/* Modal content */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            {ISD_OPTIONS.map(option => (
              <Text
                key={option.value}
                style={styles.modalOption}
                onPress={() => handleSelectLink(option.value)}
              >
                {option.label}
              </Text>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#03C203', // Set background color to green
  },
  logo: {
    width: 150,
    height: 110,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white', // Set text color to white
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: 'white', // Set dropdown background color to white
    borderRadius: 8,
    overflow: 'hidden', // Ensure that the border radius is applied
    borderColor: 'white', // Set border color to white
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    color: 'black', // Set text color to black
  },
  selectedPickerOption: {
    fontSize: 16,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  closeButtonText: {
    color: '#03C203',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOption: {
    fontSize: 18,
    paddingVertical: 10,
    color: 'black'
  },
  input: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'white', // Set input border color to white
    fontSize: 16,
    color: 'white', // Set input text color to white
  },
  pickerContainer: {
    marginBottom: 10,
    backgroundColor: 'white', // Set dropdown background color to white
    borderRadius: 8,
    overflow: 'hidden', // Ensure that the border radius is applied
    borderColor: 'white', // Set border color to white
    borderWidth: 1,
    flexDirection: 'row', // Align text and picker horizontally
    justifyContent: 'space-between', // Space between text and picker
    alignItems: 'center', // Center align text and picker vertically
    paddingHorizontal: 15,
  },
});

export default LoginScreen;
