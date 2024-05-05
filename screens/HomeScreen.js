import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useUsernamePassword } from '../Storage/UsernamePasswordContext';
import { useLink } from '../Storage/LinkContext';
import { useGpa } from '../Storage/GpaContext';
import { useTranscript } from '../Storage/TranscriptContext';
import { useClass } from '../Storage/ClassContext';
import { useSchedule } from '../Storage/ScheduleContext';


const HomeScreen = ({ navigation }) => {
    const { username } = useUsernamePassword();
    const { password } = useUsernamePassword();
    const {setGpaTranscriptW }= useGpa();
    const {setGpaTranscriptU} = useGpa();
    const {link} = useLink();
    const {setClassWeight, setTranscriptData} = useTranscript();
    const {setClassData} = useClass();
    const {setStudentSchedule} = useSchedule();

    let {dataGPA} = "";
    
  

    const [loadedData, setLoadedData] = useState(false);

    useEffect(() => {
        const fetchRequiredData = async () => {
            try{
                //GPA Data Fetch:
                const apiUrlGPA = `https://friscoisdhacapi.vercel.app/api/gpa?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
                const responseGPA = await fetch(apiUrlGPA);
                dataGPA = await responseGPA.json();
            
                setGpaTranscriptW(parseFloat(dataGPA.weightedGPA));
                setGpaTranscriptU(parseFloat(dataGPA.unweightedGPA));

                //schedule data Fetch
                //const apiUrlSchedule = `https://friscoisdhacapi.vercel.app/api/schedule?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
                //const responseSchedule = await fetch(apiUrlSchedule);
                //setStudentSchedule(await responseSchedule.json());

                //class Data Fetch
                const apiUrlClasses = `https://friscoisdhacapi.vercel.app/api/currentclasses?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
                const responseClasses = await fetch(apiUrlClasses);
                const dataClass = await responseClasses.json();
                setClassData(dataClass);

                
                //Transcript Data Fetch
                const apiUrlTranscript = `https://homeaccesscenterapi.vercel.app/api/transcript?link=${encodeURIComponent(link)}&user=${encodeURIComponent(username)}&pass=${encodeURIComponent(password)}`;
                const responseTranscript = await fetch(apiUrlTranscript);
                const dataTranscript = await responseTranscript.json();
                setTranscriptData(dataTranscript);

                let numSemesters = 0;
                for (const year in dataTranscript) {
                    if (year.includes("20")) { // Assuming years in your data have "20" in their names
                        const dataC = dataTranscript[year].data;
                        for (let i = 1; i < dataC.length; i++) {
                            const classData = dataC[i];
                            const className = classData[1];
                            const sem1Grade = classData[2];
                            const sem2Grade = classData[3];


                            // Exclude Exam for Acceleration Tests
                            if (!className.includes('EA ')) {
                                
                                numSemesters += isNaN(parseFloat(sem1Grade))|| sem1Grade === '0' ? 0 : 1; // Count semester 1 if not empty
                                numSemesters += isNaN(parseFloat(sem2Grade)) || sem2Grade === '0' ? 0 : 1; // Count semester 2 if not empty
                            }
                        }
                        
                        
                    }
                }

                console.log(numSemesters/8);

                setClassWeight(numSemesters/8);

                setLoadedData(true);

            } catch (error) {
                console.log("Error Fetching Data: ", error);
            }
        };

        fetchRequiredData();

    }, [])

    
    const handleTranscript = () => {
        if(loadedData){
            navigation.navigate('Transcript');
        }
        else{
            console.log("Wait")
        }   
          
    }

    const handleSchedule = () => {
        if(loadedData){
            navigation.navigate('Schedule');
        }
        else{
            console.log("Wait")
        }   
          
    }

    const handleClasses = () => {
        if(loadedData){           
            navigation.navigate('Classes');
        }
        else{
            console.log("Wait");
        }
       
         
    }

    

    const handleGPA = () => {
        if(loadedData){
            navigation.navigate('GPA');
        }

        else{
            console.log("Data is still being fetched. Please wait.");

        }
    }

    return (
        <View style={styles.container}>
            <View style = {styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleTranscript}
                >
                    <Text style={styles.buttonText}>Transcript</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleClasses}
                >
                    <Text style={styles.buttonText}>Classes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleGPA}
                >
                    <Text style={styles.buttonText}>GPA</Text>
                </TouchableOpacity>                
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 400
    },
    button: {
        width: '70%',
        marginVertical: 15,
        backgroundColor: '#03C203',
        borderRadius: 20,
        elevation: 5,
        paddingVertical: 20,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});


export default HomeScreen;
