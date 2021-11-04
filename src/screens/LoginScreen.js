import React from 'react';
import { useState, useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import styles from '../styles/Style';
import Auth from '@aws-amplify/auth';
import AuthContext from '../context/AuthContext';

export default function LoginScreen() {

    const { signIn } = useContext(AuthContext);
    const [email, onChangeEmail] = useState('');
    const [password, onChangePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const login = async () => {
        if (email.length > 4 && password.length > 2) {
          await Auth.signIn(email, password)
            .then((user) => {
              signIn(user);
            })
            .catch((err) => {
              if (!err.message) {
                console.log('1 Error when signing in: ', err);
                Alert.alert('Error when signing in: ', err);
              } else {
                if (err.message) {
                  setErrorMessage(err.message);
                }
              }
            });
        } else {
          setErrorMessage('Provide a valid email and password');
        }
      };

    return <SafeAreaView style={{flex: 1, backgroundColor: '#7719B2'}}>
            <ImageBackground source={require("../images/koc-background.jpg")} style={styles.backgroundImage} imageStyle={{opacity: 0.6}}>
                <Text style={styles.inputText}>KU Mail Address</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(email)=>onChangeEmail(email)}
                    value={email}
                    keyboardType='email-address'
                />
                <Text style={styles.inputText}>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(password)=>onChangePassword(password)}
                    value={password}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.greenButton} onPress={()=>login()}>
                    <Text style={styles.whiteButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </ImageBackground>
    </SafeAreaView>
}