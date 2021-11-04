import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Modal,
  Share,
  ActivityIndicator,
} from "react-native";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listMyBooks } from "../src/graphql/queries";
import Openlibra from "../components/openlibra";
import * as WebBrowser from 'expo-web-browser';
const Interest = () => {
  //get connected user
  useEffect(() => {
    verifyUser();
  }, []);

  //states
  let book = new Openlibra();
  var arre = [];
  const [listFavs, setListFavs] = useState([]);
  const [bookInfo, setBookInfo] = useState([]);
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

  //FUNCTIONS
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
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  async function verifyUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      //console.log("existe un usuario conectado: ", user.attributes);
      if (user.attributes) {
        getFavs(user);
      }
    } catch (e) {
      setExistUser(false);
      console.error("Error al verificar si hay un usuario conectado: ", e);
    }
    //console.log("resultado: ", existUser);
  }

  async function getFavs(user) {
    try {
      const result = await API.graphql(
        graphqlOperation(listMyBooks, {
          filter: {
            idUser: {
              eq: user.attributes.sub,
            },
          },
        })
      );
      var arreglodeFavs = result.data.listMyBooks.items;
      setListFavs(arreglodeFavs);
      getBookInfo(arreglodeFavs);
    } catch (e) {
      console.error("Error al obtener los favoritos: ", e);
    }
  }

  async function getBookInfo(list) {
    //console.log("lista de favoritos: ", list);
    list.forEach((element) => {
      book
        .getBook(element.idBook)
        .then((book) => {
          //console.log("book: ", book[0]);
          arre.push(book[0]);
          setBookInfo(arre);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    });
  }

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

  return (
    <>
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
              //onPress={() => addFavorite()}
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

      <View style={{ backgroundColor: "white", flex: 1 }}>
        {bookInfo.length > 0 ? (
          <FlatList
            data={bookInfo}
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
          <>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "80%",
              }}
            >
              <ActivityIndicator size="large" color="#a1887f" />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%",
              }}
            >
              <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                Cargando...
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
export default Interest;
