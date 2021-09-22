import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
} from "react-native";
import Home from "./screens/home";
import Interest from "./screens/interest";
import s from "./src/style";
import Icon from "react-native-vector-icons/FontAwesome";
//NAVIGATION
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
//AWS
import Amplify from "aws-amplify";
import awsconfig from "./src/aws-exports";

import { AmplifySignOut, withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);

//FUNCTIONS
function HomeScreen({ navigation }) {
  return <Home />;
}

function InterestScreen({ navigation }) {
  return <Interest />;
}
function DrawerMenu(props) {
  return (
    <TouchableOpacity onPress={props.navigation}>
      <View style={s.menuContainer}>
        <View style={s.iconoContainer}>
          <Icon size={17} name={props.iconName} />
        </View>
        <View style={s.tituloContainer}>
          <Text style={s.tituloTxt}>{props.titleName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function Menu(props) {
  return (
    <View style={s.container}>
      <View style={s.bgContainer}>
        <TouchableOpacity>
          <View style={s.userContainer}>
            <Image
              style={s.userImagen}
              source={require("./assets/Seebook.jpeg")}
            ></Image>
          </View>
          <View style={s.userNombre}>
            <Text style={s.userSubTitulo}>
              La mejor plataforma para lectura gratuita. Te recomendamos leer
              con una luz exterior encendida.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <DrawerMenu
        iconName="home"
        titleName="Categorias"
        navigation={() => props.navigation.navigate("Categorias")}
      />
      <DrawerMenu
        iconName="user"
        titleName="Intereses Personales"
        navigation={() => props.navigation.navigate("Intereses")}
      />
      <View style={{marginTop:"140%"}}>
        <Image
          style={{ width: "100%", height: 154, borderRadius: 75 }}
          source={require("./assets/ebook.gif")}
        ></Image>
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();
//STRUCTURE VIEW REACT NATIVE
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Categorias" component={HomeScreen} />
        <Drawer.Screen name="Intereses" component={InterestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default withAuthenticator(App);
