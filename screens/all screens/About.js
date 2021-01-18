import React from "react";
import { StyleSheet, Text, Image, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const About = props => {
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/me.jpg')} style={styles.image}/>
            <Image source={require('../../assets/icon.png')} style={styles.image}/>
            </View>
            <Text style={styles.name}>Tubagus Gusti Fauzy</Text>
            <Text style={{color: 'white', fontFamily: 'monospace'}}>a <Text style={{color: 'salmon', fontFamily: 'monospace', fontSize: hp('2.5%')}}>Student</Text></Text>
            <View style={styles.line} />
            <Text style={{color: 'white', fontFamily: 'monospace', textAlign: 'center'}}>"This app is my gabut time creation, hope you enjoy!"</Text>
            <View style={styles.line} />
            <Text style={{color: '#b088f9', fontFamily: 'monospace', fontSize: hp('2.5%')}}>Thanks to</Text>
            <Image source={require('../../assets/jikan.png')} style={[styles.image, {marginTop: 20, borderRadius: 12}]}/>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 20,
        borderWidth: 3,
        borderColor: '#b088f9',
        marginHorizontal: 10,
    },
    name: {
        fontFamily: 'monospace',
        fontSize: hp('3%'),
        color: '#b088f9'
    },
    line: {
        width: 200,
        height: 1,
        backgroundColor: '#fff',
        marginVertical: 20
    }
});

export default About;