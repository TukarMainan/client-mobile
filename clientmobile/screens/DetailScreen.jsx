import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import { func } from "prop-types";

const DetailsPage = ({ route }) => {
  const { item } = route.params;
  const [data, setData] = useState(item);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [meetingPoint, setMeetingPoint] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const commentt = ["Haloo jink", "Jual beli organ tubuh"];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleImagePress = (index) => {
    setSelectedImageIndex(index);
  };

  const navigation = useNavigation();

  function handleTradeButton(event, item) {
    event.persist();
    navigation.navigate("Trade", { item });
  }

  const BlinkingText = ({ text, style }) => {
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 50,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, [opacity]);

    return (
      <Animated.View style={{ opacity }}>
        <Text style={style}>{text}</Text>
      </Animated.View>
    );
  };

  // useEffect(() => {
  //   // Load comments from server
  //   fetch(`http://localhost:5000/comments/${postId}`)
  //     .then((response) => response.json())
  //     .then((data) => setComments(data));
  // }, []);

  // const handleCommentSubmit = () => {
  //   // Save new comment to server
  //   fetch(`http://localhost:5000/comments`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ postId, text: comment })
  //   })
  //     .then(() => {
  //       setComment('');
  //       // Reload comments from server
  //       fetch(`http://localhost:5000/comments/${postId}`)
  //         .then((response) => response.json())
  //         .then((data) => setComments(data));
  //     });
  // };

  function handleDelete(){
    console.log('handleDelete');
  }
  function handleStatus(){
    console.log('handleStatus');
  }

  return (
    <LinearGradient colors={["#A855F7", "#FFFFFF"]} style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: data?.images[selectedImageIndex] }}
              style={styles.selectedImage}
            />
            <View style={styles.thumbnailContainer}>
              {data?.images.map((image, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleImagePress(index)}
                >
                  <Image
                    source={{ uri: image }}
                    style={[
                      styles.thumbnailImage,
                      selectedImageIndex === index && styles.selectedThumbnail,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={styles.mapContainer}>
            <Text style={styles.label}>Meeting Point</Text>
            <View style={styles.map}>
              <MapView
                style={{ flex: 1 }}
                region={{
                  latitude: meetingPoint.latitude,
                  longitude: meetingPoint.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={(event) =>
                  setMeetingPoint(event.nativeEvent.coordinate)
                }
              >
                <Marker coordinate={meetingPoint} />
              </MapView>
            </View>
          </View>

          <TouchableOpacity
            style={styles.tradeButton}
            onPress={handleTradeButton}
          >
            <Text style={styles.tradeText}>Trade Toys</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tradeButton}
            onPress={handleDelete}
          >
            <Text style={styles.tradeText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tradeButton}
            onPress={handleStatus}
          >
            <Text style={styles.tradeText}>Set Inactive</Text>
          </TouchableOpacity>

          
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image source={require("../toys.png")} style={styles.avatar} />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>John Doe</Text>
              <Text style={styles.bio}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={item.review}
                  starSize={20}
                  fullStarColor={"#f1c40f"}
                  emptyStarColor={"#ccc"}
                  halfStarEnabled={true}
                />
              </Text>
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={(item) => handleChat(item)}
              >
                <Text style={styles.chat}>Chat Now</Text>

                <Icon name="message" style={styles.icon} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerr}>
            <View style={styles.box}>
              <Text style={styles.title}>Description</Text>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                tincidunt neque in vulputate euismod. Duis at velit tristique,
                ultrices lacus a, egestas nunc. Etiam ante orci, volutpat et
                dignissim sit amet, laoreet vitae tellus. Cras sagittis lacus
                mauris, non pulvinar massa dictum at. Nunc bibendum vulputate
                nulla vel tempor. In hac habitasse platea dictumst. Proin
                dapibus, ex in iaculis commodo, neque ipsum molestie ligula, a
                aliquam sem arcu id dui. Sed venenatis lectus nibh, sed pretium
                nulla pretium finibus. Vestibulum et libero efficitur, rhoncus
                nulla interdum, ullamcorper lorem. Pellentesque a tortor ac
                magna volutpat fermentum. Cras finibus ligula sed mauris
                convallis gravida. Pellentesque habitant morbi tristique
                senectus et netus et malesuada fames ac turpis egestas.
                Curabitur accumsan nunc consequat, efficitur libero sit amet,
                tempor tortor. In condimentum porttitor velit, quis vestibulum
                quam bibendum in. Etiam fringilla eros id hendrerit efficitur.
                Phasellus ultrices sem vel risus pulvinar posuere. In eu congue
                orci, nec dictum purus. Curabitur vitae lacus nec nunc laoreet
                aliquam.
              </Text>
              <Text style={styles.commentsHeader}>Comments</Text>

              <View style={styles.commentContainerBack}>
                {commentt.map((comment) => (
                  <View key={comment.id} style={styles.commentContainer}>
                    <Text style={styles.usernameComment}>Joko</Text>
                    <Text style={styles.commentText}>{comment}</Text>
                  </View>
                ))}
                <View style={styles.inputCommentContainer}>
                  <TextInput
                    style={styles.textInputContainer}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={(text) => setComment(text)}
                  />
                  <TouchableOpacity>
                    <Text style={styles.buttonText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  tradeButton: {
    borderColor: "#000000",
    backgroundColor: "#ecdff5",
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    height: 40,
  },
  tradeText: {
    fontSize: 22,
    textAlign: "center",
    paddingTop: 5,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  mapContainer: {
    //map container
    marginTop:20,
    height: 200,
    width: 400,
    borderRadius: 10,
    backgroundColor: "#ecdff5",
  },
  map: {
    flex: 1,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center'
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 90,
    borderWidth: 1,
  },
  chat: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  icon: {
    paddingTop: 3,
    width: 24,
    height: 24,
    paddingLeft: 5,
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
  },
  textA: {
    fontSize: 40,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  containerr: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 25,
  },
  box: {
    //container description
    backgroundColor: "#FFFF",
    padding: 20,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
  },
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 10,
  },
  selectedImage: {
    width: "100%",
    height: 350,
    // resizeMode: "contain",
    borderWidth: 5,
    borderColor: "#FFFF",
  },
  thumbnailContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  thumbnailImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: "white",
    marginTop: 5,
  },
  detailsContainer: {
    marginTop: 50,
  },
  header: {
    //container
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ecdff5",
    padding: 5,
    paddingBottom: 20,
    marginBottom: 5,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 10,
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 70,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 70,
  },
  infoContainer: {
    marginLeft: 5,

  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  stats: {
    fontSize: 16,
    marginRight: 20,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#00aaff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },

  commentContainerBack: {
    padding: 10,
    backgroundColor: "#FFFF",
    marginTop: 5,
    borderRadius: 5,
  },
  inputCommentContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#ecdff5",
    borderRadius: 20,
    paddingLeft: 6,
  },
  textInputContainer: {
    flex: 1,
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "#007AFF",
    fontWeight: "bold",
    marginRight: 10,
    paddingTop: 9,
  },
  commentContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderTopRightRadius: 3,
    backgroundColor: "#ecdff5",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  commentText: {
    fontSize: 16,
    color: "#000000",
  },
  commentsHeader: {
    borderTopWidth:1,
    textAlign: "center",
    fontSize: 23,
  },
});

export default DetailsPage;
