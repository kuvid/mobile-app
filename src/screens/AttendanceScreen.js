import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import styles from '../styles/Style';
import dummyAttendanceData from '../dummies/dummyAttendanceData';
import ListElement from '../components/ListElement';

function AttendanceScreen({navigation}) {
    return <SafeAreaView style={[styles.container], {justifyContent: 'flex-start',}}>
    <View>
        <FlatList 
            data={dummyAttendanceData} 
            renderItem={({item})=>{
                return <ListElement item={item}/>
            }}
            keyExtractor={item=>item.key}/>
    </View>
</SafeAreaView>
}

export default AttendanceScreen;