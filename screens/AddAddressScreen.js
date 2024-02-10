import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";

const AddAddressScreen = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 50 }}
    >
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Seus Endereços</Text>
        <Pressable>
          <Text>Adicionar novo endereço</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
