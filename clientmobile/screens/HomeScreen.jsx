import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Modal,
  RadioGroup,
  RadioButton,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Card from "../components/Card";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import NearbyCard from "../components/NearbyCard";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { fetchPosts } from "../stores/actions/actionCreator";
import axios from "axios";
import { BASE_URL } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
const categories = ["Technology", "Fashion", "Food", "Travel", "Sports"];
const sortOptions = ["Newest", "Oldest"];
const conditions = [
  "brand new",
  "like new",
  "lightly used",
  "well used",
  "heavily used",
];

const mapDispatchToProps = dispatch => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
  };
};

const mapStateToProps = state => {
  return {
    posts: state.posts,
  };
};

function Home({ posts, fetchPosts }) {
  const { loading: isLoading, posts: postsData } = posts;

  const [isLoadingNearby, setIsLoadingNearby] = useState(true);
  const [nearbyPosts, setNearbyPosts] = useState([]);
  const [location, setLocation] = useState(null);

  async function fetchNearbyPost() {
    try {
      const token = await AsyncStorage.getItem("data");
            const parsedData = JSON.parse(token);
            // console.log(parsedData.access_token);
      const { data } = await axios.get(BASE_URL + "/public/posts/nearby", {
        headers: {
          access_token: parsedData.access_token,
          // access_token:
          //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDIzZmIxLTdkODgtNDkyMS1hZTZhLTE2MzUwYWM4YjJiMCIsImlhdCI6MTY4MzgxMTE0MH0.V03Ya0TWOtGTX6iAMAh7s_tyXgro4bbFvBR-tnoaWfs",
      },
      });
      // console.log(data);
      setNearbyPosts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingNearby(false);
    }
  }

  const [isVisible, setIsVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // Handle permission not granted error
      return;
    }

    let { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  }

  useEffect(() => {
    fetchPosts();
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyPost();
    }
  }, [location]);

  if (isLoading ) {
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

  const navigation = useNavigation();

  const handleItemPress = id => {
    navigation.navigate("Detail", { id });
  };

  const handleCityChange = city => {
    setSelectedCity(city);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
  };

  const handleSortChange = sort => {
    setSelectedSort(sort);
  };

  const handleSearch = searchedTitle => {
    setSearchQuery(searchedTitle);
    if (searchedTitle.length > 0) {
      const filteredResults = originalData.filter(item =>
        item.title.toLowerCase().includes(searchedTitle.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* <Image source={Logo} style={styles.spinnerLogo} /> */}
          {/* <Image
            source={require("../toys.png")}
            style={styles.backgroundImage}
          /> */}
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor="#000000"
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => setIsVisible(true)}
            >
              <Image
                source={require("../filter1.png")}
                style={styles.filterIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Modal visible={isVisible} animationType="slide">
          <ScrollView style={styles.containerModal}>
            <View style={styles.filterContainer}>
              <View style={styles.section}>
                <Text style={styles.title}>Filter by City</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedCity}
                  onValueChange={handleCityChange}
                >
                  {cities.map((city, index) => (
                    <Picker.Item key={index} label={city} value={city} />
                  ))}
                </Picker>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Filter by Category</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  {categories.map((category, index) => (
                    <Picker.Item
                      key={index}
                      label={category}
                      value={category}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Filter by Condition</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  {conditions.map((condition, index) => (
                    <Picker.Item
                      key={index}
                      label={condition}
                      value={condition}
                    />
                  ))}
                </Picker>
              </View>
              <View style={styles.section}>
                <Text style={styles.title}>Sort</Text>
                <TouchableOpacity
                  style={styles.radio}
                  onPress={() => handleSortChange(sortOptions[0])}
                >
                  <Text>{sortOptions[0]}</Text>
                  {selectedSort === sortOptions[0] && <Text> ✔</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radio}
                  onPress={() => handleSortChange(sortOptions[1])}
                >
                  <Text>{sortOptions[1]}</Text>
                  {selectedSort === sortOptions[1] && <Text> ✔</Text>}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsVisible(false)}
                  stylee={styles.saveContainer}
                >
                  <Text style={styles.save}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>
        {/* <Text>Latitude: {console.log(location?.latitude)}</Text>
        <Text>Latitude: {console.log(location?.longitude)}</Text> */}
        <ScrollView>
          <Image
            source={{
              uri: "https://i.ibb.co/sCv9DBc/michael-roring-2.png",
            }}
            style={styles.banner}
          />

          <View style={styles.recommendationContainer}>
            {/* <View style={styles.box}> */}
            <Text style={styles.recommendation}>Toys Nearby</Text>
            {/* </View> */}
            <ScrollView horizontal={true}>
              <View style={styles.gridList}>
                {nearbyPosts.length !== 0 ? (
                  nearbyPosts?.map(item => (
                    <TouchableOpacity
                      onPress={() => handleItemPress(item.id)}
                      key={item.id}
                    >
                      <NearbyCard item={item} />
                    </TouchableOpacity>
                  ))
                ) : (
                  <Text style={styles.recommendation}>
                    No nearby posts trade found
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
          <View>
            <ScrollView>
              <View style={styles.box}>
                <Text style={styles.wumpa}>Explore</Text>
              </View>
              <View style={styles.cardContainer}>
                {postsData?.map(item => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleItemPress(item.id)}
                      key={item.id}
                    >
                      <View style={styles.card}>
                        <Card item={item} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {/* {searchResults ? (
                                <View style={styles.cardContainer}>
                                    {searchResults.map((item) => (
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleItemPress(item)
                                            }
                                            key={item.id}
                                        >
                                            <View style={styles.card}>
                                                <Card item={item} />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                <View style={styles.cardContainer}>
                                    {postsData?.map((item) => {
                                        return (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    handleItemPress(item)
                                                }
                                                key={item.id}
                                            >
                                                <View style={styles.card}>
                                                    <Card item={item} />
                                                </View>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            )} */}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardContainer: {
    flex: 1,
    paddingLeft: 70,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    maxWidth: "45%",
    margin: 7,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    paddingBottom: 5,
    backgroundColor: "#7C67F2",
  },
  backgroundImage: {
    position: "absolute",
    width: "185%",
    height: "185%",
    resizeMode: "cover",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  filterButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
  },
  filterIcon: {
    width: 24,
    height: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  saveContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  save: {
    textAlign: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F68383",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    color: "white",
  },
  banner: {
    width: "100%",
    height: 200,
    // borderRadius: 15,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerLogo: {
    width: 85,
    height: 85,
  },
  gridList: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 5,
    justifyContent: "space-between",
  },
  gridItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  gridItem: {
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  gridItemImage: {
    width: 107,
    height: 107,
    borderRadius: 8,
  },
  box: {
    marginTop: 7,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    // alignSelf: "center",
  },
  recommendation: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8E7",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 24,
  },
  wumpa: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#7C67F2",
    textAlign: "left",
    marginTop: 20,
    marginBottom: 8,
    marginLeft: 24,
  },
  recommendationContainer: {
    backgroundColor: "#7C67F2",
    borderBottomLeftRadius: 65,
    // borderBottomRightRadius: 24,
    // marginTop: 12,
  },
  containerModal: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E7",
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
  radio: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
