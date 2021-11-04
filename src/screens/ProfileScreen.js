import React, {useContext} from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from '../styles/Style';
import AuthContext from '../context/AuthContext';


export default function ProfileScreen() {

    const { signOut } = useContext(AuthContext);

    return <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity style={styles.redButton}>
            <Text style={styles.whiteButtonText} onPress={()=>signOut()}>LOG OUT</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
}