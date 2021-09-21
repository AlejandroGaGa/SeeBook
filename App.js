import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, Button } from "react-native";

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
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{ alignContent: "center", marginLeft: "10%", marginTop: "30%" }}
      >
        {/*  <AmplifySignOut />
      <StatusBar style="auto" /> */}
        <Text>Bienvenido a SeeBook !</Text>
      </View>
      {/* <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      /> */}
    </View>
  );
}

function InterestScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Por el momento no tienes intereses registrados </Text>
      <Button
        onPress={() => navigation.goBack()}
        title="Go back home"
      />
    </View>
  );
}

//STRUCTURE VIEW REACT NATIVE
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Inicio" component={HomeScreen} />
        <Drawer.Screen name="Intereses" component={InterestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
