import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Style';

function HomeScreen({navigation}) {
    return <SafeAreaView style={styles.container}>
        <View style={styles.profileContainer}>
            <Image source={require('../images/girl.png')} style={styles.profileImage}/>
            <Text style={[styles.boldPurpleText, styles.profileTextTopMargin]}>Ayşe Yılmaz</Text>
            <Text style={styles.regularText}>ayilmaz22@ku.edu.tr</Text>
        </View>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.lightPurpleButton}>
                    <Icon iconStyle={styles.purpleIcon} size={48} name='school' type='material-community'/>
                    <Text style={styles.purpleButtonText}>My Attendance</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.lightPurpleButton}>
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