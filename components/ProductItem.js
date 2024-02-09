import { View, Text, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  // const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);

  return (
    <Pressable style={{ marginHorizontal: 17, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />

      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          R${item?.price}
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold", marginEnd: 30 }}>
          {item?.rating?.rate}
        </Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 3,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text>Adicionado ao Carrinho</Text>
          </View>
        ) : (
          <View>
            <Text>Adicionar ao Carrinho</Text>
          </View>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;
