import React from 'react';
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
    inactiveButtonText: {
        color: '#A2A2A2',
        fontWeight: 'bold'
    },
    whiteIcon: {
        color: 'white',
        marginBottom: 16
    }
});

export default styles;