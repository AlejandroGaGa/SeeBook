import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
} from "react-native";
import s from "./src/style";
import Icon from "react-native-vector-icons/FontAwesome";
//SCREENS
import Home from "./screens/home";
import Interest from "./screens/interest";
import Login from "./screens/initial/login";
import Register from "./screens/initial/register";
import Confirmation from "./screens/initial/confirmation";
//NAVIGATION
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
//AWS
import Amplify from "aws-amplify";
import { Auth } from "aws-amplify";
import awsconfig from "./src/aws-exports";

import { AmplifySignOut, withAuthenticator } from "aws-amplify-react-native";
Amplify.configure(awsconfig);

//FUNCTIONS THAT RETURNS SCREENS
function HomeScreen({ navigation }) {
  return <Home />;
}

function InterestScreen({ navigation }) {
  return <Interest navigation={navigation} />;
}

function LoginScreen({ navigation }) {
  return <Login navigation={navigation} />;
}

function RegisterScreen({ navigation }) {
  return <Register navigation={navigation} />;
}

function ConfirmationScreen({ navigation }) {
  return <Confirmation navigation={navigation} />;
}

//MENU
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

const Menu = (props) => {
  //get connected user
  useEffect(() => {
    verifyUser();
  }, []);
  //states
  const [existUser, setExistUser] = useState(false);
  //FUNCTIONS
  async function verifyUser() {
    try {
      var user = await Auth.currentAuthenticatedUser();
      console.log("existe un usuario conectado: ", user.attributes);
      if (user.attributes) {
        setExistUser(true);
      } else {
        setExistUser(false);
      }
    } catch (error) {
      setExistUser(false);
      console.error("Error al verificar si hay un usuario conectado: ", error);
    }
    //console.log("resultado: ", existUser);
  }

  async function signOut(){
    setExistUser(false);
    Auth.signOut();
    props.navigation.navigate("Categorias");
  }

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
              La mejor plataforma para lectura gratuita.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <DrawerMenu
        iconName="home"
        titleName="Categorias"
        navigation={() => props.navigation.navigate("Categorias")}
      />
      {existUser && (
        <>
          <DrawerMenu
            iconName="user"
            titleName="Intereses Personales"
            navigation={() => props.navigation.navigate("Intereses")}
          />
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              alignItems: "center",
              alignSelf: "center",
              height: 30,
              width: 55,
              backgroundColor: "#dc323a",
              borderRadius: 5,
              padding: 5,
            }}
            onPress={() => signOut()}
          >
            <Icon size={17} color={"white"} name={"power-off"} />
          </TouchableOpacity>
        </>
      )}
      {existUser == false && (
        <View
          style={{
            top: "60%",
            marginLeft: "15%"
          }}
        >
          <DrawerMenu
            iconName="key"
            titleName="Conectarse"
            navigation={() => props.navigation.navigate("Login")}
          />
          <DrawerMenu
            iconName="rocket"
            titleName="Registrarse"
            navigation={() => props.navigation.navigate("Registro")}
          />
        </View>
      )}
    </View>
  );
};

//NAVIGATION LOGIC
const Drawer = createDrawerNavigator();
//STRUCTURE VIEW REACT NATIVE
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="Categorias" component={HomeScreen} />
        <Drawer.Screen name="Intereses" component={InterestScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Registro" component={RegisterScreen} />
        <Drawer.Screen name="Confirmacion" component={ConfirmationScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
