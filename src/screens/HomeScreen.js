import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Style';

function HomeScreen({navigation}) {
    return <SafeAreaView style={styles.container}>
        <View style={styles.row}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.purpleButton}>
                    <Icon iconStyle={styles.whiteIcon} size={48} name='doctor' type='material-community'/>
                    <Text style={styles.buttonText}>I HAVE COVID-19</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.purpleButton}>
                    <Icon iconStyle={styles.whiteIcon} size={48} name='doctor' type='material-community'/>
                    <Text style={styles.buttonText}>I HAVE COVID-19</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
        <TouchableOpacity style={styles.purpleButton}>
            <Icon iconStyle={styles.whiteIcon} size={48} name='doctor' type='material-community'/>
            <Text style={styles.buttonText}>I HAVE COVID-19</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
}


export default HomeScreen;