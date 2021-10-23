import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/Style';


function ProfileScreen({navigation}) {
    return <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity style={styles.redButton}>
            <Text style={styles.buttonText}>LOG OUT</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
}

export default ProfileScreen;