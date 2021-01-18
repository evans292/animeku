import React from "react";
import { StyleSheet, Text, View } from 'react-native';

const FavoriteScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Favorite Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'montserrat-regular'
    }  
})

export default FavoriteScreen