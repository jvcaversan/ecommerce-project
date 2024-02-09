import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";

const AddAddressScreen = () => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 50 }}
    >
      <Header />
    </ScrollView>
  );
};

export default AddAddressScreen;
