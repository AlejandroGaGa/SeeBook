import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View,Text } from "react-native";

import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { AmplifySignOut, withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);
// aca es la estructura de react
function App() {
  return (
    <View style={{alignContent:"center", marginLeft:"10%",marginTop:"30%"}}>
     {/*  <AmplifySignOut />
      <StatusBar style="auto" /> */}
      <Text>Hola, ya estas dentro de la app</Text>

    </View>
  );
}

export default withAuthenticator(App);
