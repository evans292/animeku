import React, {useEffect, useState} from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import Carousel from "../../components/Home Screen/Carousel";
import Top from "../../components/Home Screen/Top";
import Today from "../../components/Home Screen/Today";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = (props) => {
    return (
        <ScrollView style={styles.container} scrollTo>
            <Carousel />
            <Top navigation={props.navigation} />
            <Today navigation={props.navigation}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})

export default HomeScreen
