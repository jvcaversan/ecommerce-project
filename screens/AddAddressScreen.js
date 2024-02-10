import { View, Text, ScrollView, Pressable } from "react-native";
import React from "react";
import Header from "../components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddAddressScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 50 }}
    >
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Seus Endereços</Text>

        <Pressable
          onPress={() => navigation.navigate("AddressScreen")}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            paddingHorizontal: 5,
            paddingVertical: 7,
          }}
        >
          <Text>Adicionar novo endereço</Text>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </Pressable>

        <Pressable>{/* todos os enderecos adicionados */}</Pressable>
      </View>
    </ScrollView>
  );
};

export default AddAddressScreen;
