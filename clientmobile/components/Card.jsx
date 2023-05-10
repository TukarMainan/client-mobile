import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Card({ item }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.images[0] }} style={styles.image} />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.category}>{item?.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {},
  container: {
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 2,
    // borderLeftWidth: 2,
    borderColor: "#e3dccc",
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    color: "#333333",
    textAlign: "left",
    paddingLeft: 8,
    paddingTop: 8,
  },
  category: {
    fontSize: 12,
    // fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    textAlign: "left",
    paddingLeft: 20,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    color: "#F68383",
    paddingBottom: 12,
  },
});
