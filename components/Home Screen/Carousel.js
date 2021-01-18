// import React, {useEffect, useState} from "react";
// import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity, ScrollView } from 'react-native';
// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import axios from "axios";

// const DEVICE_WIDTH = Dimensions.get("window").width;
// const { width } = Dimensions.get("window");
// const height = width * 60;

// const Carousel = (props) => {
//     let scrollRef = React.createRef();
//     const [dummyData, setDummyData] = useState([]);
//     const [active, setActive] = useState(0);
 
//     const fetchData = async () => {
//         const result =  await axios.get(`http://2af5dddd6059.ngrok.io/anime`)
//         .then(res => {
//             // console.log(res.data);
//             setDummyData(res.data)
//         })
//         .catch(err => console.log('ini error',err))
//     }

//     const change = ({nativeEvent}) => {
//         const slide = Math.floor(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
//         setActive(slide)
//     }

//     useEffect(() => {
//         fetchData()
//         setInterval(() => {
//             setActive(prev => prev === dummyData.length - 1 ? 0 : prev + 1 ),
//             () => {
//                 scrollRef.current.scrollTo({
//                     animated: true,
//                     y: 0,
//                     x: DEVICE_WIDTH * active
//                 })
//             }
//         }, 3000);
//     }, [])


//     return (
//         <View style={styles.container}>
//         {/* <FlatList 
//             ref={(ref) => scrollRef = ref}
//             onMomentumScrollEnd = {change}
//             style={{width, height}}
//             pagingEnabled
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={(item) => item.id.toString()}
//             data={dummyData}
//             renderItem={({item}) => (
//                 // <TouchableOpacity>
//                 <View style={styles.jumbotron}>
//                 <Image style={styles.imageJumbotron} source={{uri: item.image_url}} blurRadius={0.4} />
//                 <Text style={styles.title}>
//                     {item.title}
//                 </Text>
//                 <Text style={styles.score}>
//                     <Text>{item.score}</Text> / 10
//                 </Text>
//                 </View>
//             // </TouchableOpacity>
//             )}
//         /> */}

//         <ScrollView 
//         horizontal 
//         pagingEnabled 
//         showsHorizontalScrollIndicator={false}
//         style={{width, height}}
//         onMomentumScrollEnd = {change}
//         ref={(ref) => scrollRef = ref}
//         >
//             {
//                 dummyData.map((item,index) => (
//                     <View style={styles.jumbotron} key={item.mal_id}>
//                     <Image style={styles.imageJumbotron} source={{uri: item.image_url}} blurRadius={0.4} />
//                     <Text style={styles.title}>
//                         {item.title}
//                     </Text>
//                     <Text style={styles.score}>
//                         <Text>{item.score}</Text> / 10
//                     </Text>
//                     </View>
//                 ))
//             }
//         </ScrollView>
        
//         <View style={styles.pagination}>
//             {
//                 dummyData.map((item, index) => (
//                     <Text key={index} style={index === active ? styles.dotActive : styles.dot}>
//                     ⬤
//                     </Text>
//                 ))   
//             }
//         </View>       
        
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         position: 'relative',
//         // backgroundColor: 'aqua',
//         height: 400
//     },
//     pagination: {
//         flexDirection: 'row',
//         top: -25,
//         // position: 'absolute',
//         alignSelf: 'center',
//     },
//     dot: {
//         color: '#c8c8c8',
//         margin: 3
//     },
//     dotActive: {
//         color: 'salmon',
//         margin: 3
//     },
//     jumbotron: {
//         // backgroundColor: 'aqua',
//         position: 'relative'
//     },
//     imageJumbotron: {
//         width: wp('100%'),
//         height: hp('60%'),
//     },
//     title: {
//         position: 'absolute',
//         top: 150,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         color: 'white',
//         padding: 20,
//         fontSize: hp('2.9%'),
//         fontFamily: 'montserrat-regular'
//     },
//     score: {
//         position: 'absolute',
//         top: 230,
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//         color: 'white',
//         padding: 20,
//         fontSize: hp('2.9%'),
//         fontFamily: 'montserrat-regular'
//     },
// })

// export default Carousel

import * as React from "react";
import { StyleSheet, View, ScrollView, Dimensions, Image, Text } from "react-native";
import axios from "axios";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AntDesign } from "@expo/vector-icons";

const DEVICE_WIDTH = Dimensions.get("window").width;

export default class Carousel extends React.Component {
    scrollRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0,
            animeData: []
        }
    }

    setSelectedIndex = event => {
        // width of the view size
        const viewSize = event.nativeEvent.layoutMeasurement.width
        // get current position in scroll view
        const contentOffset = event.nativeEvent.contentOffset.x

        const selectedIndex = Math.floor(contentOffset / viewSize) 
        this.setState({selectedIndex})
    }

    componentDidMount = () => {
        axios.get(`https://api.jikan.moe/v3/top/anime/1/airing`)
        .then(res => {
            const animeData = res.data.top.slice(0, 5)
            // console.log(animeData.length);
            this.setState({ animeData }) 
        })
        .catch(err => console.log('ini error',err))

        setInterval(() => {
            this.setState(prev => ({selectedIndex: prev.selectedIndex === this.state.animeData.length - 1 ? 0 : prev.selectedIndex + 1}), 
                () => {
                    this.scrollRef.current.scrollTo({
                        animated: true,
                        y: 0,
                        x: DEVICE_WIDTH * this.state.selectedIndex
                    })
                }
            )
        }, 3000);
    }

    render() {
        const {images} = this.props;
        const {selectedIndex, animeData} = this.state
        return (
            <View style={styles.container}>
                <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={this.setSelectedIndex}
                ref={this.scrollRef}
                >
                    {
                        animeData.map(item => (
                            <View style={styles.jumbotron} key={item.mal_id}>
                             <Image style={styles.imageJumbotron} source={{uri: item.image_url}} blurRadius={0.4} />
                             <Text style={styles.title}>
                                 {item.title}
                            </Text>
                                <Text style={styles.score}>
                                <AntDesign name="star" size={25} color="#ffb26b"/> <Text>{item.score}</Text> / 10
                                </Text>
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={styles.pagination}>
                    {
                        animeData.map((item, index) => (
                            <Text key={index} style={index === selectedIndex ? styles.dotActive : styles.dot}>
                            ⬤
                            </Text>
                        ))   
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
        container: {
        position: 'relative',
        // backgroundColor: 'aqua',
        height: 400
    },
    image: {
        height: '100%',
        width: DEVICE_WIDTH
    },
    pagination: {
        position: 'absolute',
        bottom: 15,
        height: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        margin: 5,
        backgroundColor: '#ffff',
    },
    pagination: {
        flexDirection: 'row',
        top: -25,
        // position: 'absolute',
        alignSelf: 'center',
    },
    dot: {
        color: '#c8c8c8',
        margin: 3
    },
    dotActive: {
        color: 'salmon',
        margin: 3
    },
    jumbotron: {
        // backgroundColor: 'aqua',
        position: 'relative'
    },
    imageJumbotron: {
        width: wp('100%'),
        height: hp('60%'),
    },
    title: {
        position: 'absolute',
        top: '60%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: 20,
        fontSize: hp('2.9%'),
        fontFamily: 'montserrat-regular'
    },
    score: {
        position: 'absolute',
        top: '40%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: 20,
        fontSize: hp('2.9%'),
        fontFamily: 'montserrat-regular'
    },
});