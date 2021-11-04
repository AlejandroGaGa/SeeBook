import React, { useEffect, useState } from "react"; //para poder pasar los datos del usuario
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  Share,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import Openlibra from "../components/openlibra";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createMyBooks } from "../src/graphql/mutations";
import * as WebBrowser from 'expo-web-browser';
const Home = () => {
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  //datos del libro
  const [title, settitle] = useState("");
  const [language, setlanguage] = useState("");
  const [author, setAuthor] = useState("");
  const [uri, setUri] = useState("");
  const [pd, setpd] = useState("");
  const [pg, setpg] = useState("");
  const [IdBook, setIdBook] = useState("");
  const [link, setLink] = useState("");
  // ejecución de la petición
  useEffect(() => {
    Getbooks();
  }, []);
  //arreglo global para encapsular data
  var arrecategories = [];
  //estado global para encapsular arreglo
  const [arrecatego, setarrecategories] = useState([]);

  //funcipn de obtener libros
  async function Getbooks() {
    let book = new Openlibra();
    book
      .getbookstop()
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

  function informationbook(tl, lg, auth, img, pd, page, id, link) {
    settitle(tl);
    setlanguage(lg);
    setModalVisible(true);
    setAuthor(auth);
    setUri(img);
    setpd(pd);
    setpg(page);
    setIdBook(id);
    setLink(link);
  }

  async function addFavorite() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      //console.log(user);
      if (user) {
        const input = {
          idUser: user.attributes.sub,
          idBook: IdBook,
        };

        console.log(input);

        const result = await API.graphql(
          graphqlOperation(createMyBooks, { input: input })
        );

        if (result.data.createMyBooks.id) {
          Alert.alert(
            "Notificación",
            "Se ha agregado este recurso a tus favoritos"
          );
        }
      }
    } catch (error) {
      if (error == "The user is not authenticated") {
        Alert.alert("Ops", "Debes iniciar sesión para poder agregar favoritos");
        //props.navigation.navigate("Login");
      } else {
        console.log("Error al intentar crear registro de favoritos", error);
      }
    }
  }
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };


  async function shareLink(link) {
    try {
      const result = await Share.share({
        message: "Encontré este libro que te puede interesar: " + link,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  //console.log("---->", title, language);
  return (
    <>
      {/* inicioo de la modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            width: "100%",
            height: "140%",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: -10,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            position: "absolute",
          }}
        />
        <View style={styles.modalView}>
          <Pressable
            style={{ marginLeft: "85%", marginTop: "2%" }}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <EvilIcons name="close" size={30} color="black" />
          </Pressable>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: "35%",
                marginBottom: 10,
                marginRight: 10,
                borderRadius: 5,
              }}
            >
              <Image
                style={{
                  resizeMode: "stretch",
                  height: 220,
                  width: "100%",
                }}
                source={{ uri: uri }}
              />
            </View>
            <View
              style={{
                width: "50%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                elevation: 3.5,
                marginBottom: 10,
                marginTop: 10,
                borderRadius: 5,
                /* borderWidth: 1,
                borderColor: "black", */
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
              <Text style={{ fontSize: 15 }}>Autor: {author}</Text>
              <Text style={{ fontSize: 15 }}>Idioma: {language}</Text>
              <Text style={{ fontSize: 15 }}>Año: {pd}</Text>
              <Text style={{ fontSize: 15 }}>{pg} páginas.</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              height: 40,
              alignContent: "space-between",
              marginLeft: 15,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: "30%",
                height: "100%",
                alignItems: "center",
                padding: 5,
                elevation: 5,
                borderRadius: 10,
                marginRight: 4,
              }}
              onPress={() => openLink(link)}
            >
              <View>
                <AntDesign name="download" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => addFavorite()}
              style={{
                backgroundColor: "white",
                width: "30%",
                height: "100%",
                alignItems: "center",
                padding: 5,
                elevation: 5,
                borderRadius: 10,
                marginRight: 4,
              }}
            >
              <View>
                <Ionicons name="heart-sharp" size={24} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: "30%",
                height: "100%",
                alignItems: "center",
                padding: 5,
                elevation: 5,
                borderRadius: 10,
                marginRight: 4,
              }}
              onPress={() => shareLink(link)}
            >
              <View>
                <Ionicons name="share-social-sharp" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* fin de la modal */}
      <View>
        <Image
          style={{ height: 50, width: "100%" }}
          source={require("../assets/seebookban.png")}
        />
      </View>
      <View style={styles.container}>
        {arrecatego.length > 0 ? (
          <FlatList
            style={{ height: "100%" }}
            data={arrecatego}
            renderItem={({ item }) => (
              <View
                style={{
                  height: "98%",
                  width: "45%",
                  backgroundColor: "white",
                  marginHorizontal: 10,
                  marginVertical: 5,
                  elevation: 5,
                  borderRadius: 5,
                  padding: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    informationbook(
                      item.title,
                      item.language,
                      item.author,
                      item.cover,
                      item.publisher_date,
                      item.pages,
                      item.ID,
                      item.url_download
                    )
                  }
                >
                  <Image
                    style={{ height: 250, width: "100%" }}
                    source={{ uri: item.cover }}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <ActivityIndicator size="large" color="#a1887f" />
        )}
        <View style={{ height: "7%" }}></View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
  },
  modalView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
  },
});

export default Home;
