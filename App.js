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
import Home from "./screens/home";
import Interest from "./screens/interest";
import s from "./src/style";
import Icon from "react-native-vector-icons/FontAwesome";
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
  useEffect(() => {
    Getbooks();
  }, []);
  var arrecategories = [];

  const [arrecatego, setarrecategories] = useState([]);

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

      <ScrollView style={styles.scrollView}>
        <DrawerMenu
          iconName="home"
          titleName="SeeBook / Inicio"
          navigation={() => props.navigation.navigate("SeeBook")}
        />
        <DrawerMenu
          iconName="user"
          titleName="Intereses Personales"
          navigation={() => props.navigation.navigate("Intereses")}
        />
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
                <View>
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
                    onPress={() => console.log(item.category_id)}
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
    </View>
  );
}

const Drawer = createDrawerNavigator();
//STRUCTURE VIEW REACT NATIVE
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <Menu {...props} />}>
        <Drawer.Screen name="SeeBook" component={HomeScreen} />
        <Drawer.Screen name="Intereses" component={InterestScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
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
export default withAuthenticator(App);
