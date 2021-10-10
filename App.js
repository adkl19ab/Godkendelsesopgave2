import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from "firebase";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ProfileList from "./Components/ProfileList";
import Add_edit_Profile from "./Components/Add_edit_Profile";
import ProfileDetails from "./Components/ProfileDetails";
import Ionicons from "react-native-vector-icons/Ionicons";




export default function App() {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const firebaseConfig = {
      apiKey: "AIzaSyAI_-gsmCsQNdjO6OdM3FrRfw7c2DQ3AIY",
      authDomain: "exercise5-b830d.firebaseapp.com",
      projectId: "exercise5-b830d",
      storageBucket: "exercise5-b830d.appspot.com",
      messagingSenderId: "688272083371",
      appId: "1:688272083371:web:bb0ae84d0f7cad65a66aee",
      measurementId: "G-Z1TTSKPG85"
    };

  

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const StackNavigation = () => {
        return(
            <Stack.Navigator>
                <Stack.Screen name={'Users'} component={ProfileList}/>
                <Stack.Screen name={'Profile information'} component={ProfileDetails}/>
                <Stack.Screen name={'Edit Profile'} component={Add_edit_Profile}/>
            </Stack.Navigator>
        )
    }

    return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name={'Home'} component={StackNavigation} options={{tabBarIcon: () => ( <Ionicons name="home" size={20} />),headerShown:null}}/>
              <Tab.Screen name={'Add Profile'} component={Add_edit_Profile} options={{tabBarIcon: () => ( <Ionicons name="add" size={20} />)}}/>
          </Tab.Navigator>
      </NavigationContainer>
  );
}
