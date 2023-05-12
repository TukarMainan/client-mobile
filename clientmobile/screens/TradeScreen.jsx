import Card from "../components/Card";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import Logo from "../logo.png";
import * as Animatable from "react-native-animatable";

const DATA = [
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

export default function Trade({ route }) {
  const { TargetUserId, TargetPostId } = route.params;
  console.log(TargetUserId, TargetPostId);

  const [isLoadingUserPosts, setILoadingUserPosts] = useState(true);
  const [userPosts, setUserPosts] = useState([]);

  const navigation = useNavigation();

  async function handleTrade(SenderPostId) {
    try {
      // console.log(SenderPostId);
      
      const token = await AsyncStorage.getItem("data");
      const obj = JSON.parse(token);
      // console.log(obj);

      const { data } = await axios.post(`${BASE_URL}/trades`, {
        TargetPostId, TargetUserId, SenderPostId
      }, {
        headers: {
          access_token: obj.access_token
        }
      });

      navigation.navigate("Order");
    } catch (error) {
      console.log(error);
    }
  }
  //   const { item } = route.params;

  async function fetchUserPosts() {
    try {
      const token = await AsyncStorage.getItem("data");
      const obj = JSON.parse(token);
      // console.log(obj);

      const { data } = await axios.get(`${BASE_URL}/public/users/${obj.id}`);
      // console.log("data :", data);
      setUserPosts(data?.Posts)
    } catch (error) {
      console.log(error);
    } finally {
      setILoadingUserPosts(false);
    }
  }

  useEffect(() => {
    fetchUserPosts();
  }, [])

  if (isLoadingUserPosts) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner
          visible={isLoadingUserPosts}
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

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {/* <View style={{flex:1,flexDirection:'row'}} >
            <Image source={require("../logo.png")} style={{width:50,height:150,flex:1}}/>
            <Text style={{flex:1,}} >Your Toys</Text>
          </View> */}
          {userPosts?.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.id}>
                
                <View style={styles.card}>
                  <Card item={item} key={item.id} />
                </View>
                <TouchableOpacity
                  style={styles.description}
                  onPress={() => handleTrade(item.id)}
                >
                  <Text>Trade with this toy</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spinnerLogo: {
    width: 40,
    height: 40,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: "#FFF",
    marginTop:10,
    height: 380
  },
  card: {
    width: 100,
    height: 100,
    margin: 10,
    marginBottom: 125,
    marginLeft: 50,
  },
  description: {
    flex: 1,
    padding: 10,
    marginTop: 70,
    paddingLeft: 40,
    marginBottom: 50,
    marginRight: 10,
    marginLeft: 30,
    width: 50,
    borderRadius: 20,
    backgroundColor: "#a06ccb",
  },
});
