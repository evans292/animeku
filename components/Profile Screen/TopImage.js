import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialIcons, Ionicons, AntDesign } from '@expo/vector-icons';

const DEVICE_WIDTH = Dimensions.get("window").width;

const TopImage = props => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{uri: props.coverImageUri}} style={styles.coverImage} blurRadius={0.4}/>
                <Image source={{uri: props.profileImageUri}} style={styles.profileImage}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{props.userName} <TouchableOpacity onPress={() => props.handlePress([])}><MaterialIcons name="logout" size={20} color="#c8c8c8" /></TouchableOpacity></Text>
                <View style={styles.info}>
                    <View style={styles.dotOne}>
                    <Ionicons name="rocket-sharp" size={15} color="salmon" /> 
                        <Text style={styles.status}>Joined :</Text>
                        <Text style={{fontFamily: 'montserrat-regular', fontSize: hp('1.8%')}}>{props.joined}</Text>
                    </View>
                    <View style={styles.dotOne}>
                    <AntDesign name="checksquare" size={15} color="salmon" />
                        <Text style={styles.status}>Last Online : </Text>
                        <Text style={{fontFamily: 'montserrat-regular', fontSize: hp('1.8%')}}>{props.lastOnline}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderTopStartRadius: 24
    },
    coverImage: {
        width: DEVICE_WIDTH,
        height: hp('40%'),
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        position: 'absolute',
        left: '27%',
        top: '50%',
        borderWidth: 2,
        borderColor: '#c8c8c8'
    },
    imageContainer: {
        flex: 1,
        marginBottom: 45
    },
    infoContainer: {
        flex: 1,
        // marginTop: 25,
        marginBottom: 30
    },
    name: {
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'montserrat-bold',
        fontSize: hp('4%'),
        textAlign: 'center'
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#000',
        borderRadius: 5,
        marginTop: 4,
        marginRight: 6
    },
    dotOne: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
        marginLeft: 40
    },
    info: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#c8c8c8',
        borderRadius: 15
    },
    status: {
        fontFamily: 'montserrat-bold',
        fontSize: hp('1.8%'),
        marginHorizontal: 5,
    }
})

export default TopImage;


