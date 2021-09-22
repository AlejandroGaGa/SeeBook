import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import Home from "./screens/home";
import Interest from "./screens/interest";

//NAVIGATION
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
//AWS
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";

import { AmplifySignOut, withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);

const Drawer = createDrawerNavigator();

//FUNCTIONS
function HomeScreen({ navigation }) {
  return <Home />;
}

function InterestScreen({ navigation }) {
  return <Interest />;
}

//STRUCTURE VIEW REACT NATIVE
function App() {
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="SeeBook" component={HomeScreen} />
          <Drawer.Screen name="Intereses" component={InterestScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
}

export default withAuthenticator(App);
