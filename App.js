import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
  TouchableOpacityBase,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import s from "./src/style";
import Icon from "react-native-vector-icons/FontAwesome";
//SCREENS
import Home from "./screens/home";
import Interest from "./screens/interest";
import Login from "./screens/initial/login";
import Register from "./screens/initial/register";
import Subcategoria from "./screens/subcategories";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
//NAVIGATION
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
//API
import Openlibra from "./components/openlibra";
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
//FUNCTIONS THAT RETURNS SCREENS
function Subcatego(props) {
  return <Subcategoria props={props} />;
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
  //get connected user and categos
  useEffect(() => {
    verifyUser();
    Getbooks();
  }, []);
  //states
  const [existUser, setExistUser] = useState(false);
  var arrecategories = [];
  const [arrecatego, setarrecategories] = useState([]);
  //FUNCTIONS
  async function Getbooks() {
    let book = new Openlibra();

    book
      .getcategories()
      .then((data) => {
        for (var i in data) {
          arrecategories.push(data[i]);
        }

        setarrecategories(arrecategories);
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log("Ocurrio un error ", error);
      });
  }

  async function verifyUser() {
    try {
      var user = await Auth.currentAuthenticatedUser();
      //console.log("existe un usuario conectado: ", user.attributes);
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

  async function signOut() {
    setExistUser(false);
    Auth.signOut();
    props.navigation.navigate("SeeBook");
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
        titleName="SeeBook / Inicio"
        navigation={() => props.navigation.navigate("SeeBook")}
      />
      {existUser && (
        <DrawerMenu
          iconName="user"
          titleName="Mis favoritos"
          navigation={() => props.navigation.navigate("Favoritos")}
        />
      )}
      <ScrollView style={styles.scrollView}>
        <Collapse style={{ flex: 1 }}>
          <CollapseHeader
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginLeft: 10,
              marginVertical: 15,
            }}
          >
            <View
              style={{
                flex: 8.5,
                flexDirection: "row",
              }}
            >
              <View style={{ width: "10%" }}>
                <MaterialIcons name="category" size={20} color="black" />
              </View>

              <View>
                <Text style={{ width: "100%", fontSize: 13, marginLeft: 12 }}>
                  Categorias
                </Text>
              </View>
              <View style={{ marginLeft: "50%" }}>
                <AntDesign name="arrowdown" size={17} color="black" />
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody>
            {arrecatego.length > 0 ? (
              arrecatego.map((item, key) => (
                <View key={item.category_id}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 41,
                      alignItems: "flex-start",
                      marginLeft: "2.5%",
                      width: "95%",
                      borderRadius: 5,
                      elevation: 4,
                      padding: 5,
                      marginBottom: 2.5,
                    }}
                    onPress={() =>
                      props.navigation.navigate("Categorías", {
                        id: item.category_id,
                        name : item.name,
                      })
                    }
                  >
                    <Text style={s.tituloTxt}>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={{ alignItems: "center", alignContent: "center" }}>
                {/*   <Image
                    style={{ width: "100%", height: 150, borderRadius: 25 }}
                    source={require("../assets/Seebook.jpeg")}
                  ></Image> */}

                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "500",
                    color: "black",
                  }}
                >
                  Bienvenido...
                </Text>

                <ActivityIndicator size="large" color="#a1887f" />
              </View>
            )}
          </CollapseBody>
        </Collapse>
      </ScrollView>
      {existUser && (
        <>
          <View style={{ height: 60, width: "100%" }} />
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
            marginLeft: "15%",
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
        <Drawer.Screen name="SeeBook" component={HomeScreen} />
        <Drawer.Screen name="Favoritos" component={InterestScreen} />
        <Drawer.Screen name="Login" component={LoginScreen} />
        <Drawer.Screen name="Registro" component={RegisterScreen} />
        <Drawer.Screen name="Categorías" component={Subcatego} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    marginTop: "2%",
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 42,
  },
});
