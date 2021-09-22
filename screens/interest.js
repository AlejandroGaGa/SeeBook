import React, {useState, useEffect} from "react";
import { Text, View } from "react-native";
import { Auth } from "aws-amplify";

const Interest = (props) => {
  //get connected user
  useEffect(() => {
    verifyUser();
  }, []);
  //states
  const [existUser, setExistUser] = useState(false);
  //FUNCTIONS
  async function verifyUser() {
    try {
      var user = await Auth.currentAuthenticatedUser();
      console.log("existe un usuario conectado: ", user.attributes);
      if (user.attributes) {
        setExistUser(true);
      } else {
        setExistUser(false);
      }
    } catch (e) {
      setExistUser(false);
      console.error("Error al verificar si hay un usuario conectado: ", e);
    }
    //console.log("resultado: ", existUser);
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Mis intereses</Text>
    </View>
  );
};

export default Interest;
