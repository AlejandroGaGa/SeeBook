import React, { useEffect, useState } from "react"; //para poder pasar los datos del usuario
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Openlibra from "../components/openlibra";

/* useEffect(() => {

}, []); */

const Home = () => {


  var arrecategories = [];
  const [arrecatego, setarrecategories] = useState([]);
  function Getbook() {
    let book = new Openlibra();
    book
      .getbook()
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
    <View style={styles.container}>
      <TouchableOpacity onPress={() => Getbook()}>
        <Text>Obtener libro</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          {console.log("ESTE ES MI ARREGLO", arrecatego)}
          {arrecatego.map((item, key) => {
            <View
              key={item.category_id}
              styles={{ width: 50, height: 50, backgroundColor: "pink" }}
            >
              <Text style={{fontSize:20}}>{item.name}</Text>
            </View>;
          })}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    backgroundColor: "white",
  },
  text: {
    fontSize: 42,
  },
});

export default Home;
