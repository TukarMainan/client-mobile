import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import StarRating from "react-native-star-rating";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
const DATA = [
  { id: "1", text: "Review 1" },
  { id: "2", text: "Review 2" },
  { id: "3", text: "Review 3" },
  { id: "4", text: "Review 4" },
  { id: "5", text: "Review 5" },
  { id: "6", text: "Review 6" },
];

const item = [
  {
    id: "1",
    name: "Item 1",
    city: "Houston",
    review: 5,
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    id: "2",
    name: "Item 2",
    city: "New York",
    review: 3,
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  },
  {
    id: "3",
    name: "Item 3",
    city: "Chicago",
    review: 4,
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  },
  {
    id: "4",
    name: "Item 4",
    city: "Los Angeles",
    review: 5,
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  },
];


// const canEdit = userId === postUserId
// canEdit && following condition

export default function ProfilePage() {
  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );

  const navigation = useNavigation()
const handleItemPress = (item) => {
  navigation.navigate("Detail", { item });
};

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Profile picture and background */}
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileBackground}
            source={require("../toys.png")}
          />
          <View style={styles.profilePictureContainer}>
            <Image
              style={styles.profilePicture}
              source={require("../toys.png")}
            />
          </View>
        </View>

        {/* User information */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>Hi , William!</Text>
          <Text style={styles.description}>
            Edit your personal information.{" "}
          </Text>
        </View>

        {/* Reviews */}
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Reviews</Text>
          {/* <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        /> */}
          <View style={styles.reviewBox}>
            <Text style={styles.reviewText}>Great</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={3}
              starSize={20}
              fullStarColor={"#f1c40f"}
              emptyStarColor={"#ccc"}
              halfStarEnabled={true}
            />
          </View>
        </View>

        {/* Grid list */}
        <View style={styles.gridListContainer}>
          <ScrollView>
            <Text style={styles.reviewsTitle} >Post</Text>
            <View style={styles.grid}>
              {item.length > 0 &&
                item.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    key={item.id}
                  >
                    <View style={styles.card}>
                      <Card key={item.id} item={item} />
                    </View>
                  </TouchableOpacity>
                ))}
              {item.length === 0 && <Text>Empty Post</Text>}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileContainer: {
    height: 200,
    position: "relative",
  },
  profileBackground: {
    height: "100%",
    width: "100%",
  },
  profilePictureContainer: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    transform: [{ translateX: -50 }],
    height: 100,
    width: 100,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profilePicture: {
    height: "100%",
    width: "100%",
  },
  userInfoContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 32,
  },
  username: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
  },
  reviewsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#f2f2f2",
  },
  reviewsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    marginTop: 5,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 20,
    marginTop: 2,
  },
  reviewBox: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
  },
  reviewText: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
  gridListContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginLeft: 80,
  },
  card: {
    maxWidth: "48%",
    width: "100%",
    margin: 2,
  },
  cardContainer: {
    alignItems: "center",
  },
});
