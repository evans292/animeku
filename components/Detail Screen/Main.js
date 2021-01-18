import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const Main = (props) => {
    const malId = props.route.params.malId
    const [animeData, setAnimeData] = useState([]);
    const [studio, setStudio] = useState('');
    const [premiere, setPremiere] = useState('');

    const fetchData = async (malId) => {
        const result = await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)
        .then(res => {
            // console.log('result', res.data);
            res.data.studios[0] ? setStudio(res.data.studios[0].name) : setStudio('Unknown')
            res.data.premiered ? setPremiere(res.data.premiered) : setPremiere('Unknown')
            setAnimeData(res.data)
        })
        .catch(err => console.log('ini error ', err))
    }

    useEffect(() => {
        fetchData(malId)
    }, [])

    return (
       <View style={styles.container}>
            <Image source={{uri: animeData.image_url}} style={styles.image}/>
            <View style={styles.details}>
                <Text style={styles.score}>
                    <AntDesign name="star" size={25} color="#ffb26b"/> <Text style={{fontFamily: 'montserrat-bold', fontSize: hp('3%')}}>{animeData.score}</Text> <Text style={{fontFamily: 'montserrat-bold', fontSize: hp('1.5%')}}>({animeData.scored_by} users)</Text>
                </Text>
                <Text style={styles.rank}>
                    Ranked #{animeData.rank}
                </Text>
                <Text style={styles.eps}>
                    {animeData.type} ({animeData.episodes} eps)
                </Text>
                <Text style={styles.airedStudio}>
                    Aired
                </Text>
                <Text style={styles.studioPremiere}>
                    {premiere}
                </Text>
                <Text style={styles.airedStudio}>
                    Studio
                </Text>
                <Text style={styles.studioPremiere}>
                    {studio}
                </Text>
            </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: hp('30%'),
        position: 'relative',
        flexDirection: 'row',
    },
    image: {
        width: wp('40%'),
        height: hp('35%'),
        bottom: 100,
        margin: 20,
        borderRadius: 10
    },
    score: {
        marginTop: 8,
    },
    rank: {
        marginTop: 5,
        fontFamily: 'montserrat-medium',
        color: '#0e49b5',
        fontSize: hp('2%')
    },
    eps: {
        marginVertical: 10,
        fontFamily: 'montserrat-medium',
        fontSize: hp('2%')
    },
    airedStudio: {
        fontSize: hp('1.5%'),
        fontFamily: 'montserrat-medium',
        color: 'gray'
    },
    studioPremiere: {
        fontFamily: 'montserrat-medium',
        color: '#0e49b5',
        fontSize: hp('2%')
    }
})

export default Main