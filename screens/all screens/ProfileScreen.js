import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator,ScrollView, Modal, TouchableHighlight, Linking, TouchableOpacity } from 'react-native';
import { Input } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons';

import TopImage from "../../components/Profile Screen/TopImage";
import AnimeStats from "../../components/Profile Screen/AnimeStats"
import FavoriteAnime from "../../components/Profile Screen/FavoriteAnime";

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const ProfileScreen = (props) => {
    const [userData, setUserData] = useState([]);
    const [animeStats, setAnimeStats] = useState([]);
    const [animeStats2, setAnimeStats2] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const [ready, setReady] = useState(true);
    const [err, setErr] = useState(false);

    const fetchData = async (username) => {
        const result = await axios.get(`https://api.jikan.moe/v3/user/${username}`)
        .then(res => {
            if(res.data.length === 0) {
                setErr(true)
            } else {
                setUserData(res.data)
                setErr(false)
                setAnimeStats([res.data.anime_stats.watching, res.data.anime_stats.completed, res.data.anime_stats.on_hold, res.data.anime_stats.dropped, res.data.anime_stats.plan_to_watch])
                setAnimeStats2([res.data.anime_stats.total_entries, res.data.anime_stats.rewatched, res.data.anime_stats.episodes_watched])
                setFavorite(res.data.favorites.anime)
            }
            setReady(true)
        })
        .catch((err) => {
            console.log('ini error ', err) 
            setReady(true)
            setErr(true)
        })
    }

    const _handleOpenWithLinking = () => {
      Linking.openURL('https://myanimelist.net/register.php?from=%2F');
    };

    const input = React.createRef();
    return (
        <View style={styles.container}>
            {
            userData.length === 0 ? <View style={styles.container}>
            <Text style={styles.text}>Enter Your MAL Username</Text>
            <Input
              ref={input}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              leftIcon={
                <FontAwesome5
                  name='user'
                  size={15}
                  color="grey"
                />
              }
              onSubmitEditing = {(event) => {
                fetchData(event.nativeEvent.text) 
              //   input.current.clear()
                setReady(false)
              }}
            />
            <Text style={[styles.text, {fontSize: hp('1.5%')}]}>
              Don't have MAL account?
            </Text> 
            <TouchableOpacity onPress={() => _handleOpenWithLinking()}>
            <Text style={[styles.text, {fontSize: hp('1.5%'), color: '#a7c5eb'}]}>register here</Text>
            </TouchableOpacity>
            {
            ready === false ? <ActivityIndicator size="small" color="salmon" style={{top: 25}}/> : null
            }
            {
                err === true ?  <Modal
                animationType="slide"
                transparent={true}
                visible={err}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.modalText}>User not found!</Text>
        
                    <TouchableHighlight
                      style={{ ...styles.openButton, backgroundColor: "salmon" }}
                      onPress={() => {
                        setErr(!err);
                      }}
                    >
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableHighlight>
                  </View>
                </View>
              </Modal> : null
            }  
            </View> : 
            <ScrollView>
                <View style={styles.profileContainer}>
                    <TopImage 
                    coverImageUri={favorite.length === 0 ? null : favorite[0].image_url} 
                    profileImageUri={userData.image_url} 
                    userName={userData.username} 
                    joined={userData.joined.slice(0, 10)}
                    lastOnline={userData.last_online.slice(0, 10)}
                    handlePress={setUserData.bind(setUserData)}
                    />
                </View> 
                <View style={styles.chartContainer}>
                    <AnimeStats 
                        daysWatched={userData.anime_stats.days_watched}
                        meanScore={userData.anime_stats.mean_score}
                        animeStats={animeStats}
                        animeStats2={animeStats2}
                    />
                </View>
                <View style={styles.favoriteContainer}>
                    <FavoriteAnime favorites={favorite} navigation={props.navigation}/>
                </View>
            </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    containerLoaded: {
        flex: 1,
        backgroundColor: 'white'
    },
    text: {
        fontFamily: 'montserrat-regular',
        top: 20
    },
    inputText: {
        fontSize: hp('1.5%'),
        textAlign: `left`,
        margin: 8,
        paddingVertical: 3,
        color: '#000',
        backgroundColor: `transparent`,
        fontFamily: 'montserrat-regular'
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: DEVICE_WIDTH,
        height: hp('6%'),
        width: wp('80%'),
        marginBottom: 6,
        backgroundColor: 'white',
        top: '10%',
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        padding: 15,
        textDecorationLine: 'none'
    },  
    profileContainer: {
        flex: 1,
    },
    chartContainer: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 12,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        // fontWeight: "bold",
        textAlign: "center",
        fontFamily: 'montserrat-regular'
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontFamily: 'montserrat-medium'
      } 
})

export default ProfileScreen