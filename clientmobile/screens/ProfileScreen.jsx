import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import StarRating from "react-native-star-rating";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormData from "form-data";

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

// const AsyncStorage = {
//     "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDIzZmIxLTdkODgtNDkyMS1hZTZhLTE2MzUwYWM4YjJiMCIsImlhdCI6MTY4MzgxMTE0MH0.V03Ya0TWOtGTX6iAMAh7s_tyXgro4bbFvBR-tnoaWfs",
//     "id": "8a023fb1-7d88-4921-ae6a-16350ac8b2b0",
//     "username": "Bella",
//     "email": "bella@gmail.com"
// };

// const canEdit = userId === postUserId
// canEdit && following condition

export default function ProfilePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNote] = useState("");
  const [city, setCity] = useState("");
  const [userData, setUserData] = useState({});
  function handleOpenModal() {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.reviewContainer}>
      <Text style={styles.reviewText}>{item.text}</Text>
    </View>
  );

  const navigation = useNavigation();
  const handleItemPress = (id) => {
    navigation.navigate("Detail", { id });
  };

  function handleUserInfo() {
    setIsModalOpen(false);
    //update
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      setProfileImg([...profileImg, ...result.assets]);
    }
  };
  const pickBanner = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      setBanner([...banner, ...result.assets]);
    }
  };

  const BASE_URL = "http://54.169.72.32";

  async function getUser() {
    // console.log(AsyncStorage.id);
    try {
      const value = await AsyncStorage.getItem("data");
      const obj = JSON.parse(value);
      // console.log(obj.id);
      const { data } = await axios({
        url: `${BASE_URL}/public/users/${obj.id}`,
        method: "GET",
      });
      console.log(data.Posts, "POST");
      setUserData(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateInfo() {
    const datuk = new FormData()
    datuk.append("name",name)
    datuk.append("profileImg",profileImg[0].uri)
    datuk.append("backroundImg",banner[0].uri)
    datuk.append("notes",notes)
    datuk.append("phoneNumber",phoneNum)
    datuk.append("city",city)
    console.log(profileImg[0], "profileImg");
    console.log(banner[0], "banner");
    try {
      const value = await AsyncStorage.getItem("data");
      const obj = JSON.parse(value);
      // console.log(obj.id);

      // await axios({
      //   url: `http://54.169.72.32/users`,
      //   method: "PUT",
      //   data:datuk,
      //   headers:{
      //     access_token: obj.access_token,
      //     "Content-Type": "multipart/form-data",
      //   }
      // });
      await axios.put('http://54.169.72.32/users',datuk,{
        headers:{
          access_token: obj.access_token,
          "Content-Type": "multipart/form-data",
        }
      })
      console.log(datuk,'<<<<<<<<<');
      setUserData(datuk);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  let ratingsAverageScore = 0;
  if (userData?.ratings?.length > 1) {
    let sum = userData?.ratings
      .slice(1)
      .reduce((acc, val) => acc + val, 0);
    ratingsAverageScore = sum / (userData?.ratings?.length - 1);
  }

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
          <View style={{ flex: 1 }}>
            <Text
              style={{
                flex: 1,
                fontSize: 16,
                fontWeight: "900",
                paddingTop: 6,
                marginLeft: 12,
                color: "#F68383",
                // marginTop: 12,
                // marginBottom: 12,
              }}
              onPress={handleOpenModal}
            >
              Edit profile
            </Text>
          </View>
          <Text style={styles.username}>{userData?.name}</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 30, paddingLeft: 7 }}>
              <Icon name="map-marker-outline" size={30} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cityStyle}>Around Jakarta</Text>
            </View>
          </View>

          <TouchableOpacity
            style={{ flex: 1, flexDirection: "row" }}
            onPress={() => setIsModalOpen(true)}
          ></TouchableOpacity>

          <Modal visible={isModalOpen}>
            <ScrollView style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Name</Text>
                <TextInput
                  placeholder="Name"
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.dua}>Profile Image</Text>
                <TouchableOpacity style={styles.con} onPress={pickImage}>
                  <Text style={{ textAlign: "center", paddingTop: 17 }}>
                    {" "}
                    Browse{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.dua}>Banner</Text>
                <TouchableOpacity style={styles.con} onPress={pickBanner}>
                  <Text style={{ textAlign: "center", paddingTop: 17 }}>
                    {" "}
                    Browse{" "}
                  </Text>
                </TouchableOpacity>
              </View>
              {profileImg.length > 0 && (
                <View style={styles.resultContainer}>
                  <FlatList
                    data={profileImg}
                    keyExtractor={(item) => item.uri}
                    numColumns={3}
                    renderItem={({ item }) => (
                      <Image
                        source={{ uri: item.uri }}
                        style={styles.imageResult}
                      />
                    )}
                  />
                </View>
              )}
              {banner.length > 0 && (
                <View style={styles.resultContainer}>
                  <FlatList
                    data={banner}
                    keyExtractor={(item) => item.uri}
                    numColumns={3}
                    renderItem={({ item }) => {
                      return (
                        <Image
                          source={{ uri: item.uri }}
                          style={styles.imageResult}
                        />
                      );
                    }}
                  />
                </View>
              )}
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Note</Text>
                <TextInput
                  placeholder="Note"
                  style={styles.input}
                  value={notes}
                  onChangeText={(text) => setNote(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Phone Number</Text>
                <TextInput
                  placeholder="Phone Number"
                  style={styles.input}
                  value={phoneNum}
                  onChangeText={(text) => setPhoneNum(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>City</Text>
                <Picker
                  selectedValue={city}
                  onValueChange={(itemValue) => setCity(itemValue)}
                  style={styles.dropdown}
                >
                  <Picker.Item
                    label="Select a Category"
                    value=""
                    enabled={false}
                  />
                  <Picker.Item label="Jakarta" value="Jakarta" />
                  <Picker.Item label="Surabaya" value="Surabaya" />
                  <Picker.Item label="Bandung" value="Bandung" />
                  <Picker.Item label="Yogyakarta" value="Yogyakarta" />
                  <Picker.Item label="Tangerang" value="Tangerang" />
                </Picker>
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={updateInfo}
                >
                  <Text
                    
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingTop: 10,
                      color: "#FFF8E7",
                      flex: 1,
                    }}
                  >
                    Update
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={() => setIsModalOpen(false)}
                >
                  <Text
                   
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      paddingTop: 10,
                      color: "#FFF8E7",
                      flex: 1,
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Modal>
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
            <Text style={styles.reviewText}>{ratingsAverageScore}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={ratingsAverageScore}
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
            <Text style={styles.wumpa}>Post</Text>
            <View style={styles.grid}>
              {userData?.Posts?.length > 0 &&
                userData.Posts.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item.id)}
                    key={item.id}
                  >
                    <View style={styles.card}>
                      <Card key={item.id} item={item} />
                    </View>
                  </TouchableOpacity>
                ))}
              {userData?.Posts?.length === 0 && <Text>Empty Post</Text>}
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    padding: 10,
  },
  imageResult: {
    width: "33.33%",
    aspectRatio: 1,
    margin: 2,
  },
  con: {
    color: "#FFF8E7",
    backgroundColor: "#7C67F2",
    height: 50,
    borderRadius: 12,
    marginVertical: 10,
    marginBottom: 60,
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 31,
  },
  titleLabel: {
    paddingTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    marginLeft: 12,
  },
  dua: {
    marginTop: 22,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
  cityStyle: {
    fontSize: 20,
    marginLeft: 10,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 16,
  },
  inputContainer: {
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    width: "90%",
    height: 50,
    justifyContent: "center",
    margin: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderRadius: 4,
    marginBottom: 40,
    fontSize: 16,
    paddingLeft: 15,
    paddingBottom: 10,
    height: 40,
  },
  buttonContainer: {
    marginTop: 16,
    backgroundColor: "#F68383",
    height: 50,
    borderRadius: 20,
    marginHorizontal: 90,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: "#fffefc",
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
    left: "14%",
    // bottom: "1%",
    top: "65%",
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
    // backgroundColor: "#FFF8E7",
    paddingVertical: 20,
    paddingHorizontal: 10,
    // alignItems: "center",
    marginTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  iconStyle: {
    flex: 1,

    marginLeft: 12,
    marginTop: 6,
  },
  username: {
    flex: 1,
    fontWeight: "bold",
    marginLeft: 9,
    fontSize: 48,
    marginBottom: 5,
    textAlign: "left",
    color: "#444",
  },
  wumpa: {
    marginLeft: 12,
    fontSize: 14,
    marginBottom: 5,
    textAlign: "left",
    marginTop: 17,
  },
  description: {
    fontSize: 16,
  },
  reviewsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: "#7C67F2",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  reviewsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "left",
    marginTop: 5,
    marginLeft: 12,
    color: "#FFF8E7",
  },
  wumpa: {
    fontWeight: "bold",
    fontSize: 40,
    marginBottom: 10,
    textAlign: "left",
    marginTop: 24,
    marginLeft: 24,
    marginBottom: 24,
    color: "#7C67F2",
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
