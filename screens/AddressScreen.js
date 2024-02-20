import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import Header from "../components/Header";
import RegisterInputs from "../components/RegisterInputs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../UserContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const AddressScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);
  const handleAddAddress = () => {
    const address = {
      name,
      mobileNo,
      address,
      city,
      state,
      zipcode,
    };
    axios
      .post("http://localhost:8000/enderecos", { userId, address })
      .then((response) => {
        Alert.alert("Sucesso", "Endereço adicionado com Sucesso");
        setName("");
        setmobileNo("");
        setAddress("");
        setCity("");
        setState("");
        setZipcode("");

        setTimeout(() => {
          navigation.goBack();
        }, 500);
      })
      .catch((error) => {
        Alert.alert("Erro", "Falha ao adicionar o Endereço");
        console.log("error", error);
      });
  };

  console.log(userId);
  return (
    <ScrollView style={{ marginTop: 50 }}>
      <Header />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}></Text>
        <TextInput
          placeholderTextColor={"black"}
          placeholder="Brasil"
          style={{
            padding: 10,
            borderColor: "#B0B0B0",
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 5,
          }}
        />
        <RegisterInputs
          value={name}
          onChangeText={(text) => setName(text)}
          additionalStyle={{ marginVertical: 10 }}
          desc={"Nome Completo"}
          placeHolderDesc={"Insira seu nome"}
        />
        <RegisterInputs
          value={mobileNo}
          onChangeText={(text) => setmobileNo(text)}
          desc={"Telefone"}
          placeHolderDesc={"Insira seu número de telefone"}
        />
        <RegisterInputs
          value={address}
          onChangeText={(text) => setAddress(text)}
          additionalStyle={{ marginVertical: 10 }}
          desc={"Endereço"}
          placeHolderDesc={"Insira seu endereço"}
        />
        <RegisterInputs
          value={city}
          onChangeText={(text) => setCity(text)}
          desc={"Cidade"}
          placeHolderDesc={"Insira sua cidade"}
        />
        <RegisterInputs
          value={state}
          onChangeText={(text) => setState(text)}
          additionalStyle={{ marginVertical: 10 }}
          desc={"Estado"}
          placeHolderDesc={"Insira seu estado"}
        />
        <RegisterInputs
          value={zipcode}
          onChangeText={(text) => setZipcode(text)}
          desc={"CEP"}
          placeHolderDesc={"Insira seu CEP"}
        />
        <Pressable
          onPress={handleAddAddress}
          style={{
            backgroundColor: "#FFC72C",
            padding: 19,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Adicionar Endereço</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default AddressScreen;
