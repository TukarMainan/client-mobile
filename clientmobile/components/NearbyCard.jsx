import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GEO_API_REVERSE_LOCATION } from "../config/api";

export default function NearbyCard({ item }) {
  const [locationName, setLocationName] = useState("");
  const itemCreatedAt = item?.Category.createdAt;
  const currentDate = new Date();
  const createdDate = new Date(item?.createdAt);

  const [long, lat] = item?.meetingPoint.coordinates;
  async function fetchLocationName() {
    try {
      const { data } = await axios.get(GEO_API_REVERSE_LOCATION(long, lat));
      setLocationName(data.features[0].properties.city);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchLocationName();
  }, []);

  const timeDiff = currentDate.getTime() - createdDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timePostCreatedInString = "";

  if (days > 0) {
    timePostCreatedInString = `${days} days ago`;
  } else if (hours > 0) {
    timePostCreatedInString = `${hours} hours ago`;
  } else if (minutes > 0) {
    timePostCreatedInString = `${minutes} minutes ago`;
  } else {
    timePostCreatedInString = `Just now`;
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.images[0] }} style={styles.image} />
      <Text style={styles.category}>{locationName}</Text>
      <Text style={styles.name}>{item?.title}</Text>
      <Text style={styles.category}>{item?.Category.name}</Text>
      <Text style={styles.category}>{timePostCreatedInString}</Text>
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
