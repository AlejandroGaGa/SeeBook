import React, { useState, useEffect } from "react";
import { Text, View, TextInput, StyleSheet, Button } from "react-native";
import { Auth } from "aws-amplify";
import Openlibra from "../components/openlibra";

const Subcategoria = (props) => {
  const [number, onChangeNumber] = React.useState(null);

  useEffect(() => {
    pet();
  }, []);
  const [arrayglo, setarray] = useState([]);
  const [array2, setar] = useState([]);

  function pet() {
    var array = [];
    let Open = new Openlibra();
    Open.listbd()
      .then((result) => {
        for (var i in result) {
          array.push(result[i]);
        }
        setarray(array);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function petbyid(int) {
    let Open = new Openlibra();
    Open.showid(int)
      .then((result) => {
        setar(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("-------3----------->", array2);
  /*   console.log("Este es el array", arrayglo); */
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {arrayglo.map((item, i) => (
        <Text>
          {item.Id_Producto}.-{item.Nombre_Producto}
        </Text>
      ))}
      <Text style={{ fontSize: 15, marginTop: 10 }}>
        Ingrese un id para mostrar los datos de ese usuario
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
      />
      <Button
        onPress={() => petbyid(number)}
        title="Mostrar datos"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {array2.map((item, i) => (
        <>
          <Text>
            {item.Id_Producto}.-{item.Nombre_Producto}
          </Text>
          <Text>
           Su rfc es: {item.rfc} y su nikname es: {item.nikname}
          </Text>
        </>
      ))}
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
