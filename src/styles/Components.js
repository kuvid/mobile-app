import React from "react";
import { StyleSheet } from "react-native";

const globalBorderRadius = 10;

const components = StyleSheet.create({
  button: {
    borderRadius: globalBorderRadius,
    paddingVertical: 20,
    margin: 18,
    alignItems: "center",
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  regularText: {
    fontWeight: "normal",
    fontSize: 12,
  },
  icon: {
    marginBottom: 16,
  },
  input: {
    padding: 10,
    borderRadius: globalBorderRadius,
    paddingVertical: 20,
    margin: 18,
    backgroundColor: "white",
  },
});

export default components;

/* import React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        margin: 18
    },
    row: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'stretch',
    },
    button: {
        borderRadius: 10,
        paddingVertical: 20,
        margin: 18,
        alignItems: 'center',
    },
    redButton: { 
        backgroundColor: '#EF4836',
        borderRadius: 10,
        paddingVertical: 20,
        margin: 18,
        alignItems: 'center',
    },
    greenButton: { 
        backgroundColor: '#94DE45',
        borderRadius: 10,
        paddingVertical: 20,
        margin: 18,
        alignItems: 'center',
    },
    purpleButton: { 
        backgroundColor: '#7719B2',
        borderRadius: 10,
        paddingVertical: 20,
        margin: 18,
        alignItems: 'center',
    },
    inactiveButton: {
        backgroundColor: '#EDEDED',
        borderRadius: 10,
        paddingVertical: 20,
        margin: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    inwhiteButtonText: {
        color: '#A2A2A2',
        fontWeight: 'bold'
    },
    whiteIcon: {
        color: 'white',
        marginBottom: 16
    }
});

export default styles; */
