import React, {useContext, useEffect} from 'react';
import {
  StyleSheet, View, ActivityIndicator,
} from 'react-native';
import Auth from '@aws-amplify/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator, MainStackNavigator } from './StackNavigator';
import DrawerNavigator from './DrawerNavigator';
import AuthContext from '../context/AuthContext';
import AttendanceDataContext from '../context/AttendanceDataContext';
import styles from '../styles/Style';

export default function AuthLoadingScreen () {
  const { token, loading, loadApp } = useContext(AuthContext);
  const { pullData, cleanData } = useContext(AttendanceDataContext); 
  
  useEffect(() => {
    cleanData();
    loadApp();
  }, []);
  
  const showLoadingSpinner = (!token && loading);
  var view = '';

  if (showLoadingSpinner) {
    view = (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#aaa" />
      </View>
    );
  } else if (!token) {
    view = <AuthStackNavigator />;
  } else {
    view = <DrawerNavigator />;
  }
  return (
    <NavigationContainer>
      {view}
    </NavigationContainer>
  );
}