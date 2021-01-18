import React from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import PieChart from 'react-native-pie-chart';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

 class AnimeStats extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const { daysWatched, meanScore, animeStats, animeStats2 } = this.props;
    const colors = ['#6AD259', '#57CACA', '#ACCE4B', '#DA5A5A', '#c8c8c8']
    const keys = ['Watching', 'Completed', 'On-Hold', 'Dropped', 'Plan to Watch']
    const keys2 = ['Total Entries', 'Rewatched', 'Episodes']
    const deviceWidth = Dimensions.get('window').width

    const chart_wh = 230

    return (
      <View style={{ justifyContent: 'center', flex: 1}}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>Anime Stats</Text>
            <View style={styles.line} />
            <View style={styles.daysAndScore}>
            <Text style={{fontFamily:'montserrat-regular'}}>{daysWatched}  <Text style={{fontFamily: 'montserrat-bold', fontSize: hp('2%'), textAlign: 'center'}}>Days</Text></Text>
            <Text style={{fontFamily:'montserrat-regular'}}>{meanScore}  <Text style={{fontFamily: 'montserrat-bold', fontSize: hp('2%'), textAlign: 'center'}}>Mean Score</Text></Text>
            </View>
        </View>

        <View style={styles.chartContainer}>
        <PieChart
            chart_wh={chart_wh}
            series={animeStats}
            sliceColor={colors}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
        </View>

      <View style={{ flexDirection: 'row', margin: 30 }}>
      <View style={styles.bottomContentContainer}>
        <View style={styles.dots}>
            {
              colors.map(color => (
                <View key={color} style={{
                  width: wp('2%'),
                  height: hp('1.2%'),
                  backgroundColor: color,
                  borderRadius: 5,
                  marginTop: 4,
                  marginRight: 6,
                  marginBottom: 15
                }} />
              ))
            }
          </View>
          <View style={styles.keys}>
            {
              keys.map(item => (
                <Text key={item} style={{
                  fontFamily: 'montserrat-regular',
                  fontSize: hp('1.8%'),
                  marginBottom: 11.5
                }}>{item}</Text>
              ))
            }
          </View>

          <View style={styles.keys}>
            {
              animeStats.map((item, index) => (
                <Text key={index} style={{
                  fontFamily: 'montserrat-regular',
                  fontSize: hp('1.8%'),
                  marginBottom: 11.5,
                  marginLeft: 50
                }}>{item}</Text>
              ))
            }
          </View>
        </View>

        <View style={styles.bottomContentContainer}>
        <View style={styles.keys}>
            {
              keys2.map(item => (
                <Text key={item} style={{
                  fontFamily: 'montserrat-medium',
                  fontSize: hp('1.8%'),
                  marginBottom: 11.5
                }}>{item}</Text>
              ))
            }
          </View>

          <View style={styles.keys}>
            {
              animeStats2.map((item, index) => (
                <Text key={index} style={{
                  fontFamily: 'montserrat-regular',
                  fontSize: hp('1.8%'),
                  marginBottom: 11.5,
                  marginLeft: 50
                }}>{item}</Text>
              ))
            }
          </View>
        </View>
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'montserrat-bold',
        textTransform: 'uppercase',
        fontSize: hp('2.5%'),
        textAlign: 'center'
    },
    titleContainer: {
        // marginBottom: 10
    },
    line: {
        width: 200,
        height: 1,
        backgroundColor: '#c8c8c8',
        alignSelf: 'center'
    },
    daysAndScore: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    bottomContentContainer: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
    chartContainer: {
      flex: 1,
      alignItems: 'center',
      marginVertical: 20
    }
})

export default AnimeStats;