import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { enableScreens } from 'react-native-screens';
import Navigator from './navigations/AnimeNavigation';

enableScreens()
const fetchFonts = () => {
  return Font.loadAsync({
    'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
    'montserrat-extra': require('./assets/font/Montserrat-ExtraBold.ttf'),
    'montserrat-light': require('./assets/font/Montserrat-Light.ttf'),
    'montserrat-medium': require('./assets/font/Montserrat-Medium.ttf'),
    'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
    'montserrat-semi': require('./assets/font/Montserrat-SemiBold.ttf'),
    'montserrat-thin': require('./assets/font/Montserrat-Thin.ttf'),
  })
}

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false)
  if(!isFontLoaded) {
    return (
      <Apploading startAsync={fetchFonts} onFinish={() => setIsFontLoaded(true)} onError={(err) => console.log(err)}/>
    )
  }

  return (
    <Navigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
