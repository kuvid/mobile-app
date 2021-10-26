import React from 'react';
import { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import styles from '../styles/Style';

function LoginScreen({navigation}) {

    const [email, onChangeEmail] = useState("asdfg@ku.edu.tr");
    const [password, onChangePassword] = useState("****");

    return <SafeAreaView style={{flex: 1, backgroundColor: '#7719B2'}}>
            <ImageBackground source={require("../images/koc-background.jpg")} style={styles.backgroundImage} imageStyle={{opacity: 0.6}}>
                <Text style={styles.inputText}>KU Mail Address</Text>
                <TextInput
                    style={styles.input}
                    onChangeEmail={onChangeEmail}
                    value={email}
                    keyboardType='email-address'
                />
                <Text style={styles.inputText}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangePassword={onChangePassword}
                    value={password}
                />
                <TouchableOpacity style={styles.greenButton} onPress={()=>navigation.jumpTo("Home")}>
                    <Text style={styles.whiteButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </ImageBackground>
    </SafeAreaView>
}

export default LoginScreen;