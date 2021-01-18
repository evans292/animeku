import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from "axios";

const Today = (props) => {
    const [animeData, setAnimeData] = useState([]);

    const date = new Date()
    var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const fetchData = async (day) => {
        const result = await axios.get(`https://api.jikan.moe/v3/schedule`)
        .then(res => {  
            let today = {}
            switch (days[date.getDay()]) {
                case "sunday":
                    today = res.data.sunday  
                break;
                case "monday":
                    today = res.data.monday  
                break;
                case "tuesday":
                    today = res.data.tuesday  
                break;
                case "wednesday":
                    today = res.data.wednesday  
                break;
                case "thursday":
                    today = res.data.thursday  
                break;
                case "friday":
                    today = res.data.friday  
                break;
                case "saturday":
                    today = res.data.saturday  
                break;
                default:
                break;
            }
            // console.log('result', today);
            setAnimeData(today)
        })
        .catch(err => console.log('ini error ', err))
    }

    useEffect(() => {
        fetchData(days[date.getDay()])
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Today Releases</Text>

            <FlatList 
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.mal_id.toString()}
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
        flex: 1,
        // backgroundColor: 'salmon'
    },
    sectionTitle: {
        padding: 15,
        fontFamily: 'montserrat-bold',
        color: 'black',
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
        marginBottom: -15,
        fontSize: hp('2%'),
        width: wp('35%'),
        alignSelf: 'center'
    },
    imagesContainer: {
        flexDirection: 'row',
    },
});

export default Today;