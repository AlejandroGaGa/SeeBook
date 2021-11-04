import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Auth } from "aws-amplify";
import Openlibra from "../components/openlibra";
//FUNCTIONS THAT RETURNS SCREENS

const Subcategoria = (props) => {
  const [array, setarrecategories] = useState([]);
  var id = props.props.route.params.id;
  let openlibra = new Openlibra();
  useEffect(() => {
    subcategoria(id);
  }, [array]);

  function subcategoria(n) {
    var arre = [];
    openlibra
      .showid(n)
      .then((res) => {
        for (var i in res) {
          arre.push(res[i]);
        }
        setarrecategories(arre);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {array.length > 0 ? (
        <>
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              Libros de {props.props.route.params.name}
            </Text>
          </View>
          <FlatList
            style={{ height: "100%" }}
            data={array}
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
                /*    onPress={() =>
                informationbook(
                  item.title,
                  item.language,
                  item.author,
                  item.cover,
                  item.publisher_date,
                  item.pages
                )
              } */
                >
                  <Image
                    style={{ height: 250, width: "100%" }}
                    source={{ uri: item.thumbnail }}
                  />
                </TouchableOpacity>
              </View>
            )}
            numColumns={2}
            keyExtractor={(item, index) => index}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#a1887f" />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Subcategoria;
