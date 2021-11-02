import React, { useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Style';
import dummyUserData from '../dummies/dummyUserData';
import DataContext from '../context/DataContext';

function HomeScreen({navigation}) {
    const {addAttendanceData} = useContext(DataContext);

    return <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
            <Image source={require('../images/girl.png')} style={styles.profileImage}/>
            <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>{dummyUserData[0].name} {dummyUserData[0].surname}</Text>
            <Text style={styles.regularText}>{dummyUserData[0].email}</Text>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.lightPurpleButton} onPress={()=>navigation.navigate("Attendance")}>
                    <Icon iconStyle={styles.purpleIcon} size={48} name='school' type='material-community'/>
                    <Text style={styles.purpleButtonText}>My Attendance</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.lightPurpleButton} onPress={addAttendanceData}>
                    <Icon iconStyle={styles.purpleIcon} size={48} name='wifi' type='material-community'/>
                    <Text style={styles.purpleButtonText}>Self-Register</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
        <TouchableOpacity style={styles.purpleButton}>
            <Icon iconStyle={styles.whiteIcon} size={48} name='doctor' type='material-community'/>
            <Text style={styles.whiteButtonText}>I HAVE COVID-19</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
}


export default HomeScreen;