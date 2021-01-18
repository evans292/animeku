import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from "axios";

const Monday = (props) => {
    const [monday, setMonday] = useState([]);

    useEffect(() => {
        setMonday(props.data)
    })

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Monday</Text>

            {
            monday.length === 0 ? <ActivityIndicator size="large" color="#c8c8c8"/> : <FlatList   
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.mal_id.toString()}
            data={monday}
            renderItem={({item}) => (
                <TouchableOpacity onPress={() => props.navigation.navigate('AnimeDetailScreenSchedule', {
                    malId: item.mal_id
                })}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={{uri: item.image_url}}/>
                    <Text style={styles.title}>{ item.title }</Text>
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
        // flex: 1,
        // backgroundColor: 'salmon'
    },
    sectionTitle: {
        padding: 15,
        fontFamily: 'montserrat-bold',
        color: 'black',
        fontSize: hp('2.7%'),
        color: '#CFD15B',
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
        alignSelf: 'center',
        
    },
    imagesContainer: {
        flexDirection: 'row',
    },
});

export default Monday;