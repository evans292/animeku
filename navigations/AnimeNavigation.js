import React from 'react'
import { View, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { Home, Profile, Favorite, Search, Schedule, Detail, AboutScreen } from "../screens/bootstrap";
import Color from '../constant/color';

const HomeStack = createStackNavigator()
const HomeNavigation = () => {
    return (
        <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen name="Home" component={BottomTabNavigator}/>
        </HomeStack.Navigator>
    )
}

const Stack = createStackNavigator()
const Navigations = () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="HomeScreen" component={Home}/>
            <Stack.Screen name="AnimeDetailScreen" component={Detail}/>
        </Stack.Navigator>
    )
}

const SearchStack = createStackNavigator()
const SearchStackNavigation = () => {
    return (
        <SearchStack.Navigator headerMode="none">
            <SearchStack.Screen name="SearchScreen" component={Search}/>
            <SearchStack.Screen name="AnimeDetailScreenSearch" component={Detail}/>
        </SearchStack.Navigator>
    )
}

const ScheduleStack = createStackNavigator()
const ScheduleStackNavigation = () => {
    return (
        <ScheduleStack.Navigator headerMode="none">
            <ScheduleStack.Screen name="ScheduleScreen" component={Schedule}/>
            <ScheduleStack.Screen name="AnimeDetailScreenSchedule" component={Detail}/>
        </ScheduleStack.Navigator>
    )
}

const ProfileStack = createStackNavigator()
const ProfileStackNavigation = () => {
    return (
        <ProfileStack.Navigator headerMode="none">
            <ProfileStack.Screen name="ProfileScreen" component={Profile}/>
            <ProfileStack.Screen name="AnimeDetailScreenProfile" component={Detail}/>
        </ProfileStack.Navigator>
    )
}

const BottomTab = createBottomTabNavigator()
const BottomTabNavigator = () => {
    return (
        <BottomTab.Navigator tabBarOptions={{
            activeTintColor: Color.primaryColor,
            labelStyle: {
                fontFamily: 'montserrat-medium'
            }
        }}>
        <BottomTab.Screen 
            name="Home"
            component={DrawerNavigator}
            options={{
                tabBarIcon: ({color}) => {
                    return (
                        <FontAwesome5 name="home" size={25} color={color}/>
                    )
                },
                tabBarOptions: { color: Color.primaryColor }
            }}
        />
        <BottomTab.Screen 
            name="search"
            component={SearchStackNavigation}
            options={{
                tabBarIcon: ({color}) => {
                    return (
                        <FontAwesome5 name="search" size={25} color={color} />
                    )
                },
                tabBarOptions: { color: Color.primaryColor }
            }}
        />
        </BottomTab.Navigator>
    )
}

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
    return (
        <Drawer.Navigator 
            drawerContent={(props) => {
                return (
                    <View style={{flex:1, padding: 20}}>
                        <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                            <DrawerItemList {...props} labelStyle={{fontFamily: 'montserrat-medium'}}/>
                        </SafeAreaView>
                    </View>
                )
            }}

            drawerContentOptions={{
                activeTintColor: Color.primaryColor,
                activeBackgroundColor: 'transparent',
            }}
        >
        
        <Drawer.Screen name="Home" component={Navigations} options={{
            drawerIcon: (props) => (
                <FontAwesome5
                    name="home"
                    size={23}
                    color={props.color}
                    style={{alignSelf:"center",marginRight:6,paddingLeft:2}}
                /> 
            )
        }}/>

        <Drawer.Screen name="Profile" component={ProfileStackNavigation} options={{
            drawerIcon: (props) => (
                <FontAwesome5
                    name="user-alt"
                    size={23}
                    color={props.color}
                    style={{alignSelf:"center",marginRight:6,paddingLeft:6}}
                /> 
            )
        }}/>

        {/* <Drawer.Screen name="Favorite" component={Favorite} options={{
            drawerIcon: (props) => (
                <FontAwesome5
                    name="heart"
                    size={23}
                    color={props.color}
                    style={{alignSelf:"center",marginRight:6,paddingLeft:6}}
                /> 
            )
        }}/> */}

        <Drawer.Screen name="Schedule" component={ScheduleStackNavigation} options={{
            drawerIcon: (props) => (
                <FontAwesome5
                    name="calendar-alt"
                    size={23}
                    color={props.color}
                    style={{alignSelf:"center",marginRight:6,paddingLeft:8}}
                /> 
            )
        }}/>

        <Drawer.Screen name="About me" component={AboutScreen} options={{
            drawerIcon: (props) => (
                <FontAwesome5
                    name="info"
                    size={23}
                    color={props.color}
                    style={{alignSelf:"center",marginRight:12,paddingLeft:14}}
                /> 
            )
        }}/>
        </Drawer.Navigator>
    )
}

export default Navigator = () => {
    return (
        <NavigationContainer>
            <HomeNavigation />
        </NavigationContainer>
    )
}