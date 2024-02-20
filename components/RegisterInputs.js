import { View, Text, TextInput } from "react-native";
import React from "react";

const RegisterInputs = ({
  value,
  onChangeText,
  desc,
  additionalStyle,
  placeHolderDesc,
}) => {
  return (
    <View style={{ ...additionalStyle }}>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{desc}</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholderTextColor={"black"}
        style={{
          padding: 10,
          borderColor: "#B0B0B0",
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 5,
        }}
        placeholder={placeHolderDesc}
      />
    </View>
  );
};

export default RegisterInputs;
