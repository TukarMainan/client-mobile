import React, { useState, useEffect, useRef } from "react";
// import { connect } from "react-redux";
// import { fetchPostDetail } from "../stores/actions/actionCreator";
import axios from "axios";
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
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import StarRating from "react-native-star-rating";
import NearbyCard from "../components/NearbyCard";
import { BASE_URL } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DetailsPage = ({ route }) => {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [postDetailData, setPostDetailData] = useState({});

  async function fetchPostDetail(id) {
    try {
      const { data } = await axios.get(BASE_URL + "/public/posts/" + id);
      setPostDetailData(data);
      console.log("data :", data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchPostDetail(id);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    console.log(isLoading, postDetailData);
  }, [isLoading]);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const commentt = ["Aku cinta hacktiv8", "TukarMainan Jaya jaya jaya ..."];

  const handleImagePress = index => {
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

  const handleChat = async (id, name, image) => {
    try {
      const data = await AsyncStorage.getItem("data");

      const obj = JSON.parse(data);
      console.log("obj :", obj);

      navigation.navigate("Chat", {
        id,
        name,
        image,
        id_sendiri: obj.id,
        name_sendiri: obj.username,
        // image_sendiri: obj.profileImg,
      });
    } catch (err) {
      console.log("err :", err);
    }
  };

  function handleDelete() {
    console.log("handleDelete");
  }
  function handleStatus() {
    console.log("handleStatus");
  }

  const handleItemPress = item => {
    navigation.navigate("Detail", { item });
  };

  if (isLoading) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner
          visible={isLoading}
          customIndicator={
            <Animatable.View animation="bounce" iterationCount="infinite">
              <Image source={Logo} style={styles.spinnerLogo} />
            </Animatable.View>
          }
          overlayColor="rgba(0, 0, 0, 0.5)"
        />
      </View>
    );
  }

  let ratingsAverageScore = 0;
  if (postDetailData?.User.ratings.length > 1) {
    let sum = postDetailData?.User.ratings
      .slice(1)
      .reduce((acc, val) => acc + val, 0);
    ratingsAverageScore = sum / (postDetailData?.User.ratings.length - 1);
  }

  // return <Text>STOOOOOOPPPPPPPP</Text>;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: postDetailData?.images[selectedImageIndex],
              }}
              style={styles.selectedImage}
            />
            <View style={styles.thumbnailContainer}>
              {postDetailData?.images.map((image, index) => (
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
                  latitude: postDetailData?.meetingPoint.coordinates[1],
                  longitude: postDetailData?.meetingPoint.coordinates[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: postDetailData?.meetingPoint.coordinates[1],
                    longitude: postDetailData?.meetingPoint.coordinates[0],
                  }}
                />
              </MapView>
            </View>
          </View>

          <TouchableOpacity
            style={styles.tradeButton}
            onPress={handleTradeButton}
          >
            <Text style={styles.tradeText}>Trade Toys</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tradeButton} onPress={handleStatus}>
            <Text style={styles.tradeText}>Set Inactive</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleDelete}>
            <Text style={styles.tradeText}>Delete</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: postDetailData?.User?.profileImg }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{postDetailData?.User.username}</Text>
              <Text style={styles.bio}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={ratingsAverageScore}
                  starSize={20}
                  fullStarColor={"#f1c40f"}
                  emptyStarColor={"#ccc"}
                  halfStarEnabled={true}
                />
              </Text>
              <TouchableOpacity
                style={styles.chatContainer}
                onPress={() =>
                  handleChat(
                    postDetailData?.User?.id,
                    postDetailData?.User?.name,
                    postDetailData?.User?.profileImg
                  )
                }
              >
                <Text style={styles.chat}>Chat Now</Text>
                <Icon name="message" style={styles.icon} size={22} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerr}>
            <View style={styles.box}>
              {/* <Text style={styles.title}>Description</Text> */}
              <Text style={styles.title}>{postDetailData?.title}</Text>
              <Text style={styles.description}>
                {postDetailData?.description}
              </Text>
              <Text style={styles.commentsHeader}>Comments</Text>
              <View style={styles.commentContainerBack}>
                {postDetailData?.Comments.map(comment => (
                  <View key={comment.id} style={styles.commentContainer}>
                    <Text style={styles.usernameComment}>
                      {comment?.User.username}
                    </Text>
                    <Text style={styles.commentText}>{comment?.message}</Text>
                  </View>
                ))}
                <View style={styles.inputCommentContainer}>
                  <TextInput
                    style={styles.textInputContainer}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={text => setComment(text)}
                  />
                  <TouchableOpacity>
                    <Text style={styles.buttonText}>Post</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.recommendContainer}>
                        <View style={styles.recommendTextContainer}>
                            <Text style={styles.recommendText}>
                                Toys You May Like
                            </Text>
                        </View>
                        <ScrollView horizontal={true}>
                            <View style={styles.gridList}>
                                {DATA_ITEMS_YOU_MAY_LIKE.map((item) => (
                                    <TouchableOpacity
                                        onPress={() => handleItemPress(item)}
                                        key={item.id}
                                    >
                                        <NearbyCard key={item.id} item={item} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View> */}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  recommendText: {
    textAlign: "left",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 24,
  },

  recommendContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFF",
  },
  recommendTextContainer: {},
  gridList: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 5,
    justifyContent: "space-between",
  },
  tradeButton: {
    borderColor: "#000000",
    backgroundColor: "#7C67F2",
    borderRadius: 10,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 20,
    height: 40,
  },
  cancelButton: {
    borderColor: "#000000",
    backgroundColor: "#F68383",
    borderRadius: 10,
    marginLeft: 90,
    marginRight: 90,
    marginTop: 20,
    height: 40,
  },
  tradeText: {
    fontSize: 18,
    textAlign: "center",
    paddingTop: 5,
    color: "#fff",
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerLogo: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  mapContainer: {
    //map container
    marginTop: 20,
    height: 200,
    width: 400,
    borderRadius: 12,
    backgroundColor: "#FFF8E7",
    marginLeft: 16,
    marginRight: 50,
  },
  map: {
    flex: 1,
  },
  title: {
    color: "#444",
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    marginTop: 24,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: "#7C67F2",
  },
  chat: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    padding: 6,
  },
  icon: {
    paddingTop: 3,
    width: 24,
    height: 24,
    paddingLeft: 5,
    color: "#fff",
  },
  price: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    color: "#555",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 34,
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
    backgroundColor: "#fff",
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
    borderRadius: 18,
    margin: 24,
    // marginHorizontal: 50,
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
    backgroundColor: "#FFF8E7",
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
    // marginLeft: 6,
    paddingLeft: 24,
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
    marginLeft: 25,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  bio: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
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
  // buttonText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  content: {
    flex: 1,
    padding: 20,
  },

  commentContainerBack: {
    padding: 10,
    backgroundColor: "#FFFF",
    marginTop: 5,
    borderRadius: 3,
    borderBottomWidth: 1,
  },
  inputCommentContainer: {
    flexDirection: "row",
    marginBottom: 10,
    backgroundColor: "#FFF8E7",
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
    color: "#7C67F2",
    fontWeight: "bold",
    marginRight: 10,
    paddingTop: 9,
  },
  commentContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderTopRightRadius: 3,
    backgroundColor: "#FFF8E7",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
  },
  commentText: {
    fontSize: 16,
    color: "#000000",
  },
  commentsHeader: {
    borderTopWidth: 1,
    textAlign: "left",
    fontSize: 24,
    fontWeight: "bold",
    color: "#444",
    marginTop: 16,
    marginBottom: 36,
  },
});

export default DetailsPage;
