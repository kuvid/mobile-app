import React, { useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import styles from '../styles/Style';
//import dummyAttendanceData from '../dummies/dummyAttendanceData';
import ListElement from '../components/ListElement';
import DataContext from '../context/DataContext';

function AttendanceScreen({navigation}) {
    
    const {attendanceData} = useContext(DataContext);
    
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