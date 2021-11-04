import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listMyBooks } from "../src/graphql/queries";
import Openlibra from "../components/openlibra";

const Interest = (props) => {
  //get connected user
  useEffect(() => {
    verifyUser();
  }, []);
  //states

  const [listFavs, setListFavs] = useState([]);
  const [listBooks, setListBooks] = useState([]);
  const [bookInfo, setBookInfo] = useState({});

  //FUNCTIONS
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
      var finalList = [];
      const result = await API.graphql(
        graphqlOperation(listMyBooks, {
          filter: {
            idUser: {
              eq: user.attributes.sub,
            },
          },
        })
      );
      setListFavs(result.data.listMyBooks.items);

      result.data.listMyBooks.items.forEach((bookID) => {
        let book = new Openlibra();
        book
          .getBook(bookID.idBook)
          .then((data) => {
            setBookInfo(data[0]);
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log("Ocurrio un error ", error);
          });
        finalList.push(bookInfo);
      });

      setListBooks(finalList);

      console.log("lista de libros favoritos: ", finalList);
    } catch (e) {
      console.error("Error al obtener los favoritos: ", e);
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Mis favoritos</Text>
      {listBooks.length > 0 ? (
        <FlatList
          style={{ height: "100%" }}
          data={listBooks}
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
              <TouchableOpacity>
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
        <Text>Aun no tienes favoritos ):</Text>
      )}
    </View>
  );
};

export default Interest;
