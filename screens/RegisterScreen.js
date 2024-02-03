import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    // console.log("Register button clicked");

    const user = {
      name: name,
      email: email,
      password: password,
    };

    // console.log("User data:", user);

    try {
      const response = await axios.post("http://localhost:8000/register", user);
      // console.log("Server response:", response.data);

      Alert.alert(
        "Registro efetuado com sucesso",
        "Seu cadastro foi concluído"
      );
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("Falha ao registrar", "Tente novamente");
      console.log("Falha no registro", error);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}
    >
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png",
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginTop: 12,
              color: "#041e42",
            }}
          >
            Criar sua conta na Amazon
          </Text>
        </View>
      </KeyboardAvoidingView>

      <View style={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <Ionicons
            style={{ marginLeft: 8 }}
            name="person"
            size={24}
            color={"gray"}
          />
          <TextInput
            value={name}
            onChangeText={(text) => setName(text)}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: name ? 16 : 16,
            }}
            placeholder="Insira seu Nome"
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#D0D0D0",
            paddingVertical: 5,
            borderRadius: 5,
            marginTop: 30,
          }}
        >
          <MaterialIcons
            style={{ marginLeft: 8 }}
            name="email"
            size={24}
            color={"gray"}
          />
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{
              color: "gray",
              marginVertical: 10,
              width: 300,
              fontSize: email ? 16 : 16,
            }}
            placeholder="Insira seu Email"
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              backgroundColor: "#D0D0D0",
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 30,
            }}
          >
            <MaterialIcons
              style={{ marginLeft: 8 }}
              name="key"
              size={24}
              color={"gray"}
            />
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
              style={{
                color: "gray",
                marginVertical: 10,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Insira sua senha"
            />
          </View>

          <View
            style={{
              marginTop: 12,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text>Me mantenha conectado</Text>
            <Text style={{ color: "#007FFF", fontWeight: 500 }}>
              Esqueci minha senha
            </Text>
          </View>

          <View style={{ marginTop: 50 }} />

          <Pressable
            onPress={handleRegister}
            style={{
              width: 200,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
              marginLeft: "auto",
              marginRight: "auto",
              padding: 15,
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Criar
            </Text>
          </Pressable>

          <Pressable
            style={{ marginTop: 15 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>
              Possui conta? Efetue o Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
