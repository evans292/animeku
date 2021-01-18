import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, TouchableOpacity, FlatList } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const FavoriteAnime = props => {
    const favorites = props.favorites
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Favorite Anime</Text>
            <View style={styles.line} />
            {
                favorites.length === 0 ? <Text style={styles.err}>Favorite anime empty!</Text> : <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.mal_id.toString()}
                data={favorites}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('AnimeDetailScreenProfile', {
                        malId: item.mal_id
                    })}>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{uri: item.image_url}}/>
                     </View>
                    </TouchableOpacity>
                )}
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'montserrat-bold',
        textTransform: 'uppercase',
        fontSize: hp('2.5%'),
        textAlign: 'center'
    },
    line: {
        width: 200,
        height: 1,
        backgroundColor: '#c8c8c8',
        alignSelf: 'center',
        marginBottom: 20
    },
    image: {
        width: wp('50%'),
        height: hp('50%')
    },
    err: {
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'montserrat-light',
        color: 'salmon'
    }
})

export default FavoriteAnime