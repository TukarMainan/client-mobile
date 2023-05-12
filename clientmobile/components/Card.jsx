import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GEO_API_REVERSE_LOCATION } from "../config/api";

export default function Card({ item }) {
  // console.log("item :", item);
  const [locationName, setLocationName] = useState("");
  const itemCreatedAt = item?.Category?.createdAt;
  const currentDate = new Date();
  const createdDate = new Date(itemCreatedAt);

  const meetingPointCoordinates = item?.meetingPoint?.coordinates;
  const [long, lat] = Array.isArray(meetingPointCoordinates)
    ? meetingPointCoordinates
    : [];

  // Rest of your code...

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
      <Text style={styles.blackCategory}>{locationName}</Text>
      <Text numberOfLines={4} ellipsizeMode='tail' style={styles.name}>{item?.title}</Text>
      <Text style={styles.category}>{item?.Category?.name}</Text>
      <Text style={styles.blackCategory}>{timePostCreatedInString}</Text>
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
    height:80
  },
  category: {
    fontSize: 12,
    // fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    textAlign: "left",
    paddingLeft: 8,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    color: "#F68383",
    paddingBottom: 12,
  },
  blackCategory: {
    fontSize: 12,
    // fontWeight: "bold",
    backgroundColor: "#FFF8E7",
    width: 150,
    textAlign: "left",
    paddingLeft: 8,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    color: "#888",
    paddingBottom: 20,
    paddingTop: 6,
  },
});
