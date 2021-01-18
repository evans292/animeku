import React, {useState} from "react";
import { StyleSheet, Text, View, Dimensions, TextInput, ActivityIndicator, FlatList, Modal, TouchableHighlight } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { FontAwesome5 } from "@expo/vector-icons";
import { Input } from "react-native-elements";
import axios from 'axios'
import Result from "../../components/Search Screen/Result";

const DEVICE_WIDTH = Dimensions.get(`window`).width;

const SearchScreen = (props) => {
    const [animeData, setAnimeData] = useState([]);
    const [ready, setReady] = useState(true);
    const [err, setErr] = useState(false);

    const fetchData = async (name) => {
        const result = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${name}&limit=10`)
        .then(res => {
            // console.log(res.data.results)
            if(res.data.results.length === 0) {
                setErr(true)
            } else {
                setAnimeData(res.data.results)
                setErr(false)
            }
            setReady(true)
        })
        .catch(err => console.log('ini error ', err))
    }

    const input = React.createRef();
    return (
        <View style={styles.container}>
        <Input
          ref={input}
          placeholder="Search anime..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          leftIcon={
            <FontAwesome5
              name='search'
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
             

        <View style={styles.resultContainer}>
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
                    <Text style={styles.modalText}>Anime not found!</Text>
        
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
            {
               ready === false ? <ActivityIndicator size="small" color="salmon" /> : <FlatList 
               keyExtractor={(item) => item.mal_id.toString()}
               data={animeData}
               renderItem={({item}) => (
                   <Result id={item.mal_id} navigation={props.navigation} title={item.title} imageUri={item.image_url} type={item.type} eps={item.episodes} score={item.score} synopsis={item.synopsis}/>
               )}
               />
            }
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    resultContainer: {
        flex: 1,
        backgroundColor: '#ffff',
        top: '2%',
    },
    inputText: {
        fontSize: hp('2%'),
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
    err: {
        alignSelf: 'center',
        top: '30%',
        fontSize: hp('3%'),
        fontFamily: 'montserrat-regular'
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

export default SearchScreen