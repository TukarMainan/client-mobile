import React, { useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [banner, setBanner] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [note, setNote] = useState("");
  const [city, setCity] = useState("");
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
  const handleItemPress = (item) => {
    navigation.navigate("Detail", { item });
  };

  function handleUserInfo() {
    setIsModalOpen(false);
    console.log(
      name,
      username,
      email,
      password,
      banner,
      profileImg,
      phoneNum,
      note,
      city
    );
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
          <Text style={styles.username}>Hi , William!</Text>
          {/* {note &&  */}
          <Text style={styles.username}>Barter sama gua dijamin JOSS!</Text>
          {/* } */}
          <Text style={styles.description} onPress={handleOpenModal}>
            Edit your personal information.
          </Text>

          <View style={styles.iconStyle}>
            <Icon name="map-marker-outline" size={40} />
          </View>
          <Text style={styles.cityStyle}>Meeting Point Around Jakarta</Text>

          <Modal visible={isModalOpen}>
            <ScrollView style={styles.container}>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Username</Text>
                <TextInput
                  placeholder="Username"
                  style={styles.input}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
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
                <Text style={styles.titleLabel}>Email</Text>
                <TextInput
                  placeholder="Email"
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Password</Text>
                <TextInput
                  secureTextEntry
                  placeholder="Password"
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Profile Image</Text>
                <TextInput
                  placeholder="Profile Image"
                  style={styles.input}
                  value={profileImg}
                  onChangeText={(text) => setProfileImg(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Banner</Text>
                <TextInput
                  placeholder="Banner"
                  style={styles.input}
                  value={banner}
                  onChangeText={(text) => setBanner(text)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.titleLabel}>Note</Text>
                <TextInput
                  placeholder="Note"
                  style={styles.input}
                  value={note}
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
                  <Picker.Item label="New York" value="New York" />
                  <Picker.Item label="Los Angeles" value="Los Angeles" />
                  <Picker.Item label="Chicago" value="Chicago" />
                  <Picker.Item label="Houston" value="Houston" />
                  <Picker.Item label="Philadelphia" value="Philadelphia" />
                </Picker>
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Post" onPress={handleUserInfo} />
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
            <Text style={styles.reviewsTitle}>Post</Text>
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
  paddingTop:15,
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 1,
},
  cityStyle: {
    fontSize: 20,
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
    height:40
  },
  buttonContainer: {
    marginTop: 16,
  },
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
