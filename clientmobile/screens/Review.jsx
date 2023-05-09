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

export default function ReviewPage() {
  const [name, setName] = useState("");
  const [stars, setStars] = useState(0);
    const navigation = useNavigation()
  const submitReview = () => {
    // handle submission logic here
    navigation.navigate('Home')
    console.log('submit');
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image style={styles.iconLogo} source={require("../logo.png")} />
        <Text style={styles.logo}>TukarMainan.</Text>
        <Text style={styles.title}>Please leave a Review</Text>
        <Text style={styles.name}>John Wick Simatupang</Text>

        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rating:</Text>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={stars}
            selectedStar={(rating) => setStars(rating)}
            fullStarColor="#f1c40f"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitReview}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  iconLogo: {
    width: 80,
    height: 80,
    marginLeft:90
  },
  logo: {
    fontWeight: "bold",
    fontSize: 43,
    color: "#e39ff6",
    textAlign:'center'

  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:'center'

  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:'center'
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 18,
    marginRight: 10,
  },
  button: {
    backgroundColor: "#e39ff6",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign:'center'
  },
});
