import React, { useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import styles from '../styles/Style';
//import dummyAttendanceData from '../dummies/dummyAttendanceData';
import ListElement from '../components/ListElement';
import AttendanceDataContext from '../context/AttendanceDataContext';

function AttendanceScreen({navigation}) {
    
    const {attendanceData} = useContext(AttendanceDataContext);
    
    return <SafeAreaView style={[styles.container], {justifyContent: 'flex-start'}}>
    <View>
        <FlatList 
            data={attendanceData} 
            renderItem={({item})=>{
                return <ListElement item={item}/>
            }}
            keyExtractor={item=>item.key.toString()}/>
    </View>
</SafeAreaView>
}

export default AttendanceScreen;