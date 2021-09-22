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
} from "react-native";
import Openlibra from "../components/openlibra";

const Home = () => {
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
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView style={styles.scrollView}>
            {arrecatego.length > 0 ? (
              arrecatego.map((item, key) => (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      height: 45,
                      marginBottom: 8,
                      alignItems: "center",
                      alignContent: "center",
                      width: "90%",
                      marginLeft: "5%",
                      borderRadius: 10,
                      elevation: 4,
                      padding: 10,
                    }}
                    onPress={() => console.log(item.category_id)}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "500",
                        color: "black",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View style={{ alignItems: "center", alignContent: "center" }}>
                <Image
                  style={{ width: "100%", height: 150, borderRadius: 25 }}
                  source={require("../assets/Seebook.jpeg")}
                ></Image>

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
          </ScrollView>
        </SafeAreaView>
      </View>
    </>
  );
};

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

export default Home;
