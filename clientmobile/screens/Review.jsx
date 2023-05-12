import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import StarRating from "react-native-star-rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function ReviewPage(obj) {
  const BASE_URL = "http://54.169.72.32";

  const UserId = obj.route.params.id;
  const PostId = obj.route.params.postId;
  const userName = obj.route.params.name;

  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
  const navigation = useNavigation();
  const submitReview = async () => {
    // handle submission logic here
    try {
      console.log("UserId :", UserId);
      console.log("message :", name);
      console.log("rating :", stars);
      console.log("PostId :", PostId);

      const token = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(token);

      console.log("parsedData.id :", parsedData.id);

      const { data } = await axios({
        url: `${BASE_URL}/reviews`,
        method: "POST",
        data: {
          UserId,
          message: name,
          rating: stars,
          PostId: "8099af9a-595f-45ce-8b12-b9cb35942b70",
        },
        headers: {
          access_token: parsedData.access_token,
        },
      });

      console.log("data :", data);

      // navigation.navigate("Home");
    } catch (err) {
      console.log("err :", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.iconLogo} source={require("../logo.png")} />
        <Text style={styles.logo}>TukarMainan</Text>
        <Text style={styles.title}>Please leave a Review</Text>
        <Text style={styles.name}>{userName}</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}></Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={stars}
            selectedStar={rating => setStars(rating)}
            fullStarColor="#f1c40f"
          />
        </View>
        <TextInput
          placeholder="Enter reviews.."
          style={styles.input}
          value={name}
          onChangeText={name => setName(name)}
        />
        <TouchableOpacity style={styles.button} onPress={() => submitReview()}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 5,
    // marginBottom: 30,
    fontSize: 16,
    // paddingLeft: 15,
    // paddingBottom: 10,
    backgroundColor: "#fff",
    width: 300,
    height: 40,
    // marginRight: 50,
    // marginLeft: 18,
    // paddingLeft: 6,
    marginBottom: 20,
    marginTop: 6,
  },
  iconLogo: {
    width: 80,
    height: 80,
    // marginLeft: 150,
    // paddingLeft: 50,
  },
  logo: {
    fontWeight: "bold",
    fontSize: 43,
    color: "#7C67F2",
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E7",
    padding: 20,
  },
  box: {
    paddingHorizontal: 40,
    paddingVertical: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#666",
  },
  name: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 18,
    textAlign: "center",
    color: "#F68383",
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    // marginRight: 10,
  },
  button: {
    backgroundColor: "#7C67F2",
    borderRadius: 12,
    padding: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
