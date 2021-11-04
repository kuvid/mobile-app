import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/Style';


export default function ProfileScreen({ signout }) {
    return <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity style={styles.redButton}>
            <Text style={styles.whiteButtonText} onPress={()=>signout()}>LOG OUT</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
}