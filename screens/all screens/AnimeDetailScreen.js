import React, {useEffect, useState} from "react";
import { StyleSheet, ScrollView, Text } from 'react-native';
import Jumbotron from "../../components/Detail Screen/Jumbotron";
import Main from "../../components/Detail Screen/Main";
import Rest from "../../components/Detail Screen/Rest";
import Video from "../../components/Detail Screen/Video";

const AnimeDetailScreen = (props) => {
    return (
      <ScrollView style={styles.container}>
          <Jumbotron route={props.route}/>
          <Main route={props.route}/>
          <Rest route={props.route}/>
          <Video route={props.route}/>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
})

export default AnimeDetailScreen