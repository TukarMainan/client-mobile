import React, { useState, useEffect } from "react";
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
import * as Location from 'expo-location';

const DATA = [
  {
    id: "1",
    name: "Item 1",
    city: "Houston",
    review: 5,
    category:'Neutral',
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1682685797828-d3b2561deef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    ],
  },
  {
    id: "2",
    name: "Item 2",
    city: "New York",
    category:'Girls',

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
    category:'Boys',
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  },
  {
    id: "4",
    name: "Item 4",
    city: "Los Angeles",
    category:'Boys',

    review: 5,
    images: [
      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",

      "https://images.unsplash.com/photo-1610968629438-24a6bbbf1d83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
  },
];

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // Handle permission not granted error
        return;
      }
  
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

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

  const navigation = useNavigation();

  const handleItemPress = (item) => {
    navigation.navigate("Detail", { item });
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort) => {
    setSelectedSort(sort);
  };

  const handleSearch = (text) => {
    const newData = DATA.filter((item) => {
      const itemData = item.name.toLowerCase();
      const searchText = text.toLowerCase();
      return itemData.indexOf(searchText) > -1;
    });
    setSearchQuery(newData);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../toys.png")}
            style={styles.backgroundImage}
          />
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
                  {cities.map((city) => (
                    <Picker.Item key={city} label={city} value={city} />
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
                  {categories.map((category) => (
                    <Picker.Item
                      key={category}
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
                  {conditions.map((condition) => (
                    <Picker.Item
                      key={condition}
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
        <Text>Latitude: {console.log(location?.latitude)}</Text>
        <Text>Latitude: {console.log(location?.longitude)}</Text>
        <ScrollView>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1595950009887-e9842bcbc1ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
            }}
            style={styles.banner}
          />

          <View style={styles.recommendationContainer}>
            <View style={styles.box}>
              <Text style={styles.recommendation}>Nearby Toys</Text>
            </View>
            <ScrollView horizontal={true}>
              <View style={styles.gridList}>
                {DATA.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleItemPress(item)}
                    key={item.id}
                  >
                    <NearbyCard key={item.id} item={item} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
          <View>
            <ScrollView>
            <View style={styles.box}>
              <Text style={styles.recommendation}>Toys</Text>
            </View>
              {searchQuery.length > 0 ? (
                <View style={styles.cardContainer}>
                  {searchQuery.map((item) => (
                    <TouchableOpacity
                      onPress={() => handleItemPress(item)}
                      key={item.id}
                    >
                      <View style={styles.card}>
                        <Card key={item.id} item={item} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.cardContainer}>
                  {DATA.map((item) => (
                    <TouchableOpacity
                      onPress={() => handleItemPress(item)}
                      key={item.id}
                    >
                      <View style={styles.card}>
                        <Card key={item.id} item={item} />
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
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
    backgroundColor: "#222",
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
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: "center",
  },
  recommendation: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
  recommendationContainer: {
    backgroundColor: "#ecdff5",
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
    backgroundColor: "#B9BBB6",
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
