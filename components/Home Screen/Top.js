import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from "axios";

const Top = (props) => {
    const [animeData, setAnimeData] = useState([]);
    const [airing, setAiring] = useState(true);
    const [upcoming, setUpcoming] = useState(false);

    const fetchData = async (link) => {
        const result = await axios.get(`https://api.jikan.moe/v3/top/anime/1/${link}`)
        .then(res => {
            // console.log('result', res.data.top);
            setAnimeData(res.data.top)
        })
        .catch(err => console.log('ini error ', err))
    }

    const airingPressed = (link) => {
        setAiring(true)
        setUpcoming(false)
        console.log(link);
        fetchData(link)
    }

    const upcomingPressed = (link) => {
        setAiring(false)
        setUpcoming(true)
        console.log(link);
        fetchData(link)
    }

    useEffect(() => {
        fetchData('airing')
    }, [])

    return (
        <View style={styles.container}>
        <View style={styles.buttonContainer}>
            <TouchableOpacity 
            onPress={() => airingPressed('airing')}
            >
                <Text style={airing === true ? styles.buttonActive : styles.button}>Airing</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => upcomingPressed('upcoming')}
            >
                <Text style={airing === false ? styles.buttonActive : styles.button}>Upcoming</Text>
            </TouchableOpacity>
        </View>
        <View style={airing === true ? styles.lineAiring : styles.lineUpcoming} />
        
        <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.rank.toString()}
            data={animeData}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => props.navigation.navigate('AnimeDetailScreen', {
                    malId: item.mal_id
                })}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: item.image_url}}/>
                    <Text style={styles.title}>{ item.title }</Text>
                 </View>
                </TouchableOpacity>
            )}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.6,
        // backgroundColor: 'salmon',
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        padding: 15,
        fontFamily: 'montserrat-medium',
        color: '#969696',
        fontSize: hp('2.7%'),
    },
    buttonActive: {
        padding: 15,
        fontFamily: 'montserrat-bold',
        color: '#000',
        fontSize: hp('2.7%'),
    },
    image: {
        width: wp('40%'),
        height: hp('30%'),
        borderRadius: 12,
        marginHorizontal: 10,
        alignSelf: 'center',
    },
    title: {
        fontFamily: 'montserrat-medium',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: -20,
        fontSize: hp('2%'),
        width: wp('35%'),
        alignSelf: 'center'
    },
    imagesContainer: {
        flexDirection: 'row',
    },
    lineAiring: {
        backgroundColor: 'salmon',
        height: hp('1%'),
        width: wp('15%'),
        position: 'absolute',
        left: 15
    },
    lineUpcoming: {
        backgroundColor: 'salmon',
        height: hp('1%'),
        width: wp('15%'),
        position: 'absolute',
        left: 123
    }
});

export default Top