import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/FontAwesome";

function Login({ navigation }){
  const [email, setEmail] = useState("");
  const [passwrd, setPasswrd] = useState("");

  const [visiblePswrd, setVisiblePswrd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  async function connectUser() {
    setLoading(true);
    setMessage("Espera ...");
    try {
      if (email != "" && passwrd != "") {
        console.log("conectando ...");
        const user = await Auth.signIn(email.trim(), passwrd.trim());
        //console.log(user)
        if(user.attributes != {}){
          navigation.navigate("SeeBook");
        }
        setMessage("Hola, en que puedo ayudarte ?");
      } else {
        setMessage("Has olvidado poner el correo o la contraseña");
      }
    } catch (error) {
      console.error("---------------",error);
      if (error.code == "UserNotFoundException") {
        setMessage("Ups, no hemos encontrado tu usuario");
      } else if (error.code == "InvalidParameterException") {
        setMessage("Parece que has olvidado algo ... (correo o contraseña)");
      } else if (error.code == "NotAuthorizedException") {
        setMessage("Correo o contraseña incorrectos");
      } else {
        setMessage("Algo ha salido mal, intentalo de nuevo");
      }
    }
    setLoading(false);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <Image
        style={{ width: "60%", height: "30%", resizeMode: "stretch" }}
        source={{
          uri: loading
            ? "https://media1.giphy.com/media/wnYB3vx9t6PXiq1ubB/giphy.gif?cid=790b7611d4641718f1f8a5abf6e24f61d66cfae050b7693e&rid=giphy.gif&ct=g"
            : "https://media1.giphy.com/media/feN0YJbVs0fwA/giphy.gif?cid=790b7611f16f65e13199510f5534a527bac32dad57912b77&rid=giphy.gif&ct=g",
        }}
      />
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18 }}>{message}</Text>
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
        onPress={() => connectUser()}
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
          <Text style={{ color: "white", fontSize: 17 }}>Conectarse</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
        <Text style={{ color: "#2f2f2f", fontSize: 17 }}>
          Aun no tienes una cuenta? Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
