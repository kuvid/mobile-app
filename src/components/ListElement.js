import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import styles from '../styles/Style';

const ListElement = ({item}) => {
    return <View style={elementStyles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../images/coding.png')} style={elementStyles.image}/>
        <View style={{paddingLeft:18}}>
            <Text style={styles.regularText}>{item.lecture_name}</Text>
            <Text style={[styles.boldText, {marginTop: '1%'}]}>{item.instructor_name}</Text>
        </View>
        </View>
        <View>
            <Icon iconStyle={{color: "#94DE45"}} size={48} name='check' type='material-community'/>
        </View>
        
    </View>
}


/* const ListElement = ({item}) => {
    return <View style={elementStyles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image source={require('../images/coding.png')} style={elementStyles.image}/>
        <View style={{paddingLeft:18}}>
            <Text style={styles.regularText}>{item.date}, {item.time}</Text>
            <Text style={[styles.boldText, {marginTop: '1%'}]}>{item.lectureName}</Text>
            <View style={{alignItems: 'baseline', marginTop: '5%'}}>
                <View style={{borderColor: "#CBCED8", borderWidth: 2, borderRadius: 20, padding: 8}}>
                    <Text style={[styles.regularText, {color: "#CBCED8"}]}>{item.classroom}</Text>
                </View>
            </View>
        </View>
        </View>
        <View>
            <Icon iconStyle={{color: "#94DE45"}} size={48} name='check' type='material-community'/>
        </View>
        
    </View>
} */

const elementStyles = StyleSheet.create({
    container: {
        paddingHorizontal:18, 
        paddingVertical:12, 
        backgroundColor:'white', 
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        borderBottomWidth: 2, 
        borderBottomColor: "#F2F2F2"
    },
    image: {
        width: 90, 
        height: 90, 
        borderRadius: 10
    },
})

export default ListElement;