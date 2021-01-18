import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList, Dimensions, ScrollView, Image } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from "axios";

const Rest = (props) => {
    const malId = props.route.params.malId
    const [animeData, setAnimeData] = useState([]);
    const [genres, setGenres] = useState([]);
 
    const fetchData = async (malId) => {
        const result = await axios.get(`https://api.jikan.moe/v3/anime/${malId}`)
        .then(res => {
            const dataGenres = res.data.genres.map(item => item.name)
            setGenres(dataGenres)
            setAnimeData(res.data)
        })
        .catch(err => console.log('ini error ', err))
    }

    useEffect(() => {
        fetchData(malId)
    }, [])

    return (
       <View style={styles.container}>
           <View style={styles.genresContainer}>
            <Text style={styles.Title}>Genres</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreContainer}>
            {
                genres.map((item, index) => (
                    <Text key={index} style={styles.genre}>{item}</Text>
                ))
            }
            </ScrollView>
           </View>
           
           <View style={styles.synopsisContainer}>
            <Text style={styles.Title}>Synopsis</Text>
            <Text style={styles.synopsis}>
                {animeData.synopsis}
            </Text>
           </View>

           <View style={styles.trailerContainer}>
           <Text style={styles.Title}>Official Trailer</Text>
           </View>
       </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    genresContainer: {
        marginHorizontal: 20,
    },  
    synopsisContainer: {
        marginVertical: 20,
        marginHorizontal: 20,
    }, 
    trailerContainer: {
        marginLeft: 20,
    }, 
    genreContainer: {
        flexDirection: 'row',
    },
    Title: {
        fontFamily: 'montserrat-bold',
        fontSize: hp('2.8%'),
        marginBottom: 10
    },
    genre: {
        fontFamily: 'montserrat-medium',
        marginRight: 10,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50
    },
    synopsis: {
        fontFamily: 'montserrat-regular',
        textAlign: 'justify',
        lineHeight: 30
    }
})

export default Rest