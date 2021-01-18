import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const Result = (props) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('AnimeDetailScreenSearch', {
            malId: props.id
        })}>
        <View style={styles.container}>
            <Image source={{uri: props.imageUri}} style={styles.image}/>
            <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.score}>
                    <AntDesign name="star" size={25} color="#ffb26b"/> <Text style={{fontFamily: 'montserrat-medium', fontSize: hp('3%')}}>{props.score}</Text> 
            </Text>
            <Text style={styles.eps}>
                    {props.type} ({props.eps} eps)
            </Text>
            </View>
        </View>
        </TouchableOpacity>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 20,
        marginTop: 15,
        flexDirection: 'row',
        paddingBottom: 20,
    },
    image: {
        width: wp('30%'),
        height: hp('25%'),
        borderRadius: 10
    },
    title: {
        fontFamily: 'montserrat-bold',
        marginLeft: 10,
        fontSize: hp('3%'),
        color: '#000',
        width: wp('60%'),
    },
    eps: {
        marginVertical: 10,
        fontFamily: 'montserrat-regular',
        fontSize: hp('2%'),
        marginLeft: 10,
    },
    score: {
        marginLeft: 10,
        marginTop: 5
    },
})

export default Result