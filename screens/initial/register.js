import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/FontAwesome";

function Register(navigation) {
  //states
  const [email, setEmail] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [nameUser, setNameUser] = useState("");

  const [message, setMessage] = useState("Bien, solo llena estos datos ...");

  const [visiblePswrd, setVisiblePswrd] = useState(false);
  const [loading, setLoading] = useState(false);
  //FUNCTIONS
  function verifyInputs() {
    if (nameUser == "") {
      setMessage("No has elegido un nombre de usuario");
      return false;
    } else if (email == "") {
      setMessage("Ammm, necesitamos tu correo");
      return false;
    } else if (passwrd == "") {
      setMessage("No has introducido una contraseña");
      return false;
    } else if (email == "" || passwrd == "" || nameUser == "") {
      setMessage("Vaya, hay varios campos sin rellenar");
      return false;
    } else if (email != "" && passwrd != "" && nameUser != "") {
      return true;
    }
  }

  async function registerUser() {
    if (verifyInputs()) {
      //no falta nada
      setMessage("Espera, no te vayas, te estamos registrando ...");
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{message}</Text>
      <View
        style={{
          width: "80%",
          height: 50,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "gray",
          paddingHorizontal: 5,
          marginVertical: 25,
        }}
      >
        <TextInput
          style={{ width: "100%", height: 50 }}
          name="username"
          onChangeText={(val) => setNameUser(val)}
          placeholder="Elige un nombre de usuario"
          editable={loading ? false : true}
        />
      </View>
      <View
        style={{
          width: "80%",
          height: 50,
          alignSelf: "center",
          borderWidth: 1,
          borderColor: "gray",
          paddingHorizontal: 5,
          marginVertical: 25,
        }}
      >
        <TextInput
          style={{ width: "100%", height: 50 }}
          name="email"
          onChangeText={(val) => setEmail(val)}
          placeholder="ejemplo@algo.com"
          editable={loading ? false : true}
        />
      </View>
      <View
        style={{
          width: "80%",
          height: 50,
          alignSelf: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "gray",
          flexDirection: "row",
          paddingLeft: 2.5,
          marginVertical: 25,
        }}
      >
        <TextInput
          style={{
            width: "87%",
            height: 50,
          }}
          name={"password"}
          onChangeText={(val) => setPasswrd(val)}
          placeholder="Contraseña123"
          secureTextEntry={!visiblePswrd ? true : false}
          editable={loading ? false : true}
        />
        <TouchableOpacity onPress={() => setVisiblePswrd(!visiblePswrd)}>
          <Icon
            size={20}
            color={"black"}
            name={visiblePswrd ? "eye" : "eye-slash"}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        disabled={loading ? true : false}
        onPress={() => registerUser()}
        style={{
          width: "80%",
          height: 50,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "gray",
          paddingLeft: 2.5,
          marginVertical: 25,
          backgroundColor: "#2f2f2f",
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 17 }}>Registrarse</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Register;
