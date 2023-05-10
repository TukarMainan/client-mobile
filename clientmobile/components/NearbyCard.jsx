import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function NearbyCard({ item }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.images[0] }} style={styles.image} />
      <Text style={styles.name}>{item?.name}</Text>
      <Text style={styles.category}>{item?.category}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    // textAlign: "center",
    color: "#333333",
    textAlign: "left",
    paddingLeft: 20,
  },
  category: {
    fontSize: 12,
    // fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    // textAlign: "center",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    color: "#F68383",
    paddingBottom: 12,
    textAlign: "left",
    paddingLeft: 20,
  },
});
