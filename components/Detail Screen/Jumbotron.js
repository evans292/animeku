import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from "axios";

const Jumbotron = (props) => {
    const malId = props.route.params.malId
    const [animeData, setAnimeData] = useState([]);

    const fetchData = async (malId) => {
        const result = await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)
        .then(res => {
            setAnimeData(res.data)
        })
        .catch(err => console.log('ini error ', err))
    }

    useEffect(() => {
        fetchData(malId)
    }, [])

    return (
       <View style={styles.container}>
            <Image style={styles.imageJumbotron} source={{uri: animeData.image_url}} blurRadius={0.4} />
            <Text style={styles.title}>
                    {animeData.title}
            </Text>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    imageJumbotron: {
        width: wp('100%'),
        height: hp('60%'),
    },
    title: {
        position: 'absolute',
        top: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: 20,
        fontSize: hp('2.9%'),
        fontFamily: 'montserrat-regular'
    },
})

export default Jumbotron