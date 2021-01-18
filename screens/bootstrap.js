import React from "react";
import HomeScreen from './all screens/HomeScreen';
import SearchScreen from './all screens/SearchScreen';
import ProfileScreen from './all screens/ProfileScreen';
import FavoriteScreen from './all screens/FavoriteScreen';
import ScheduleScreen from './all screens/ScheduleScreen';
import AnimeDetailScreen from "./all screens/AnimeDetailScreen";
import About from "./all screens/About";

export const Home = (props) => {
    return (
        <HomeScreen navigation={props.navigation}/>
    )
}

export const Search = (props) => {
    return (
        <SearchScreen navigation={props.navigation}/>
    )
}

export const Profile = (props) => {
    return (
        <ProfileScreen navigation={props.navigation}/>
    )
}

export const Favorite = () => {
    return (
        <FavoriteScreen />
    )
}

export const Schedule = (props) => {
    return (
        <ScheduleScreen navigation={props.navigation}/>
    )
}

export const Detail = (props) => {
    return (
        <AnimeDetailScreen route={props.route}/>
    )
}

export const AboutScreen = (props) => {
    return (
        <About route={props.route}/>
    )
}