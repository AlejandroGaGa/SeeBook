import React, { useEffect, useState } from "react"; //para poder pasar los datos del usuario
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import Openlibra from "../components/openlibra";
import { EvilIcons, AntDesign, Ionicons } from "@expo/vector-icons";
const Home = () => {
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  //titulo de libro libros
  const [title, settitle] = useState("");
  //titulo de libro libros
  const [language, setlanguage] = useState("");
  //titulo de libro libros
  const [author, setAuthor] = useState("");
  //titulo de libro libros
  const [uri, setUri] = useState("");
  const [pd, setpd] = useState("");
  const [pg, setpg] = useState("");
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

  function informationbook(tl, lg, auth, img, pd, page) {
    settitle(tl);
    setlanguage(lg);
    setModalVisible(true);
    setAuthor(auth);
    setUri(img);
    setpd(pd);
    setpg(page);
  }
  console.log("---->", title, language);
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
                width: "50%",
                alignContent: "flex-start",
                marginLeft: "-15%",
              }}
            >
              <Image
                style={{
                  resizeMode: "stretch",
                  height: "60%",
                  width: "45%",
                  marginTop: "1%",
                  marginLeft: "10%",
                }}
                source={{ uri: uri }}
              />
            </View>
            <View style={{ width: "50%", marginLeft: "-20%" }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>
              <Text style={{ fontSize: 12 }}>Autor: {author}</Text>
              <Text style={{ fontSize: 12 }}>Idioma: {language}</Text>
              <Text style={{ fontSize: 12 }}>
                {pd}/{pg} páginas.
              </Text>
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
            >
              <View>
                <AntDesign name="download" size={24} color="black" />
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
            >
              <View>
                <Ionicons name="share-social-sharp" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View>
        {/* fin de la modal */}
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
                      item.pages
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
    height: "40%",
    marginTop: "120%",
    alignItems: "center",
    backgroundColor: "white",
    elevation: 5,
    borderRadius: 10,
  },
});

export default Home;
