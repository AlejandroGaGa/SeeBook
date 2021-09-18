// aca inician los imports
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// aca es la estructura de react
export default function App() {
  const [modal, setmodal] = useState(false);
  const [string, setstring] = useState("");

  function changestate() {
    if (modal != false) {
      console.log(" es verdadero");
    }else
    {
      console.log("ESTO ES FALSO");
      setstring("Perro")
      console.log(string);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>{string}</Text>
        <StatusBar style="auto" />
      </View>
      <View>
        <Button
          onPress={() => changestate()}
          title="Presionar"
          color="#841584"
        />
      </View>
    </>
  );
}

// aca se crean los estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#E32636",
    fontSize: 25,
  },
});
