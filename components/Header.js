import { View, TextInput, Pressable } from "react-native";
import React from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

const Header = () => {
  return (
    <View
      style={{
        backgroundColor: "#00cde1",
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginHorizontal: 7,
          gap: 10,
          backgroundColor: "white",
          borderRadius: 3,
          height: 38,
          flex: 1,
        }}
      >
        <AntDesign
          style={{ paddingLeft: 10 }}
          name="search1"
          size={22}
          color={"black"}
        />
        <TextInput placeholderTextColor={"black"} placeholder="Buscar" />
      </Pressable>
      <Feather name="mic" size={24} color={"black"} />
    </View>
  );
};

export default Header;
