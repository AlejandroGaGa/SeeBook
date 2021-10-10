import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { Auth } from "aws-amplify";

const Subcategoria = (props) => {
  console.log(props);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Mis Categorias</Text>
    </View>
  );
};

export default Subcategoria;
