import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Image, TouchableOpacity } from "react-native";
import { Auth } from "aws-amplify";
import Icon from "react-native-vector-icons/FontAwesome";

function Register(navigation) {
  //states
  const [email, setEmail] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [code, setCode] = useState("");

  const [message, setMessage] = useState("Bien, solo llena estos datos ...");

  const [visiblePswrd, setVisiblePswrd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);

  numSendCode = 0;
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
      signIn();
    }
  }

  async function signIn() {
    try {
      const user = await Auth.signIn(email, passwrd);
      goHome();
    } catch (error) {
      console.log(error);
      if (error.code === "UserNotConfirmedException") {
        setMessage("Parece que se te olvidó confirmar ...");
        resendConfirmationCode();
        setStep(1);
      } else if (error.code === "UserNotFoundException") {
        signUp();
      }
    }
  }

  async function signUp() {
    try {
      setMessage("Espera, no te vayas, te estamos registrando ...");
      //registrar al usuario
      const user = await Auth.signUp({
        username: email,
        password: passwrd,
        attributes: {
          email: email,
          given_name: nameUser,
        },
      });
      //el resgitro salió bien
      if (user.userSub != "") {
        //codigo de validacion
        setStep(1);
      } else {
        console.log("Error en el registro (funcion SignUp):" + user);
      }
    } catch (err) {
      if (err.code == "UsernameExistsException") {
        setMessage("Este correo ya está registrado");
      } else if (err.code == "InvalidParameterException") {
        setMessage("Los datos no cumplen con el formato");
      } else {
        console.log("Error al registar el usuario: ", err);
      }
    }
  }

  async function resendConfirmationCode() {
    if (numSendCode <= 3) {
      try {
        await Auth.resendSignUp(email);
        setMessage("El código ha sido enviado, revisa tu correo");
        numSendCode = numSendCode + 1;
      } catch (err) {
        console.log("Error al reenviar el código: ", err);
      }
    } else {
      setTextSendCode("");
      setError("intentalo más tarde");
    }
  }

  async function verifyCode() {
    if (code == "") {
      setMessage("Ammm hace falta del codigo :/");
    } else {
      try {
        const response = await Auth.confirmSignUp(email, code);
        if (response != null) {
          //todo nice, se puede continuar
          goHome();
        } else {
          console.log("error al confirmar el codigo:" + response);
        }
      } catch (error) {
        if (
          error.message ==
          "User cannot be confirmed. Current status is CONFIRMED"
        ) {
          setMessage("Tu correo ya ha sido verificado");
          goHome();
        } else if (error.code == "CodeMismatchException") {
          setMessage(
            "El código no es válido, intenta revisar el spam en tu correo"
          );
        } else {
          setMessage("Error al confirmar el correo: ", error);
          console.log("Error al confirmar el correo (catch): ", error);
        }
      }
    }
  }

  function goHome() {
    navigation.navigate("SeeBook");
  }

  return (
    <>
      {step == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
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
              name="email"
              editable={false}
              value={email}
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
              name="codigo"
              onChangeText={(val) => setCode(val)}
              placeholder={"Codigo de validacion"}
              editable={loading ? false : true}
            />
          </View>
          <TouchableOpacity
            disabled={loading ? true : false}
            onPress={() => verifyCode()}
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
              <Text style={{ color: "white", fontSize: 17 }}>Comprobar</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => resendConfirmationCode()}>
            <Text style={{ color: "white", fontSize: 17 }}>
              No te ha llegado el código?
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default Register;
