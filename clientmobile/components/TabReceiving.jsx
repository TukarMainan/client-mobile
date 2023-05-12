import Card from "../components/Card";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { BASE_URL } from "../config/api";
import Logo from "../logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Request({ trades }) {
  console.log(trades.length);
  const navigation = useNavigation();
  const [dataAccept, setDataAccept] = useState();
  const [visible, setVisible] = useState(true);

  const BASE_URL = "http://54.169.72.32";

  async function handleAccept(id) {
    try {
      const token = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(token);
      const { data } = await axios({
        url: `${BASE_URL}/trades/${id}`,
        method: "PATCH",
        data: {
          status: "on going",
        },
        headers: {
          access_token: parsedData.access_token,
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleReject(id) {
    try {
      const token = await AsyncStorage.getItem("data");
      const parsedData = JSON.parse(token);
      const { data } = await axios({
        url: `${BASE_URL}/trades/${id}`,
        method: "PATCH",
        data: {
          status: "rejected",
        },
        headers: {
          access_token: parsedData.access_token,
        },
      });
      setVisible(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleItemPress = id => {
    navigation.navigate("Detail", { id });
  };

  function handleComplete(id, postId, name) {
    const obj = { id, postId, name };
    console.log("complete");
    navigation.navigate("Review", obj);
  }
  const handleChat = async (id, name, image) => {
    try {
      console.log(id);
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

  return (
    <ScrollView>
      <View style={styles.container}>
        {trades?.map(item => {
          console.log("item :", item);
          return (
            <View style={styles.cardContainer} key={item.id}>
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleItemPress(item.TargetPostId)}
              >
                <Card item={item?.TargetPost} key={item.id} />
              </TouchableOpacity>
              <View style={styles.containerFill}>
                <View style={styles.descContain}>
                  <Text style={styles.fontDesc}>
                    Accept trade with {item?.SenderUser?.username}{" "}
                  </Text>
                  <Text style={styles.fontTitle}>
                    {item?.TargetPost?.title}
                  </Text>
                  <Text style={styles.fontdes}>
                    {item?.TargetPost?.description}
                  </Text>
                </View>
                {item.Status === "requesting" ? (
                  <>
                    <View style={styles.containerButton}>
                      <TouchableOpacity
                        style={styles.descriptionRequest}
                        onPress={() => handleAccept(item.id)}
                      >
                        <Text style={styles.font}>Accept</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.descriptionRequest}
                        onPress={() => handleReject(item.id)}
                      >
                        <Text style={styles.reject}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : item.Status == "on going" || item.Status == "rejected" ? (
                  <>
                    <Text style={styles.tekotok}>Status: {item?.Status}</Text>
                    {/* ini yang gak keluar */}
                    <View style={styles.containerButton}>
                      {/* di bawah sini keluar normal */}

                      <TouchableOpacity
                        style={styles.description}
                        onPress={() =>
                          handleChat(
                            item?.SenderUserId,
                            item?.SenderUser?.name,
                            item?.SenderUser?.profileImg
                          )
                        }
                      >
                        <Text style={styles.reject}>Chat User</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : item.Status == "complete" ? (
                  <View style={styles.containerButton}>
                    <TouchableOpacity
                      style={styles.description}
                      onPress={() =>
                        handleComplete(
                          item?.SenderUserId,
                          item?.SenderPostId,
                          item?.SenderUser?.name
                        )
                      }
                    >
                      <Text style={styles.font}>Complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.description}
                      onPress={() =>
                        handleChat(
                          item?.SenderUserId,
                          item?.SenderUser?.name,
                          item?.SenderUser?.profileImg
                        )
                      }
                    >
                      <Text style={styles.reject}>Chat User</Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fontDesc: {
    // paddingLeft: 1,
    // fontSize: 18,
    // fontWeight: "bold",
    textAlign: "left",
    color: "#444444",
    fontSize: 12,
    marginBottom: 2,
    paddingLeft: 12,
  },
  fontTitle: {
    fontWeight: "bold",
    textAlign: "left",
    color: "#222222",
    fontSize: 24,
    marginBottom: 7,
    paddingLeft: 12,
  },
  fontdes: {
    paddingLeft: 12,
    fontSize: 12,
    // fontWeight: "bold",
    textAlign: "left",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 10,
    marginRight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
    // marginBottom: 15,
    marginBottom: 15,
    backgroundColor: "#FFF",
    paddingRight: 40,
    paddingLeft: 10,
  },
  containerButton: {
    flexDirection: "column",
    marginRight: 100,
    paddingRight: 200,
    height: 1,
    paddingTop: 25,
    paddingRight: 40,
    marginLeft: 20,
  },
  card: {
    marginTop: 10,

    // width: 100,
    // height: 100,
    // margin: 10,
    // marginBottom: 100,
    // marginLeft: 50,
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
  description: {
    // paddingRight: 5,
    width: 100,
    borderRadius: 12,
    backgroundColor: "#7C67F2",
    height: 30,
    marginTop: 8,
    marginRight: 10,
    marginLeft: 8,
  },
  descriptionRequest: {
    width: 100,
    borderRadius: 12,
    backgroundColor: "#7C67F2",
    height: 30,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 8,
  },
  font: {
    flexDirection: "row",
    paddingTop: 5,
    textAlign: "center",
    color: "#FFF8E7",
    // marginRight: 20,
  },
  reject: {
    flexDirection: "row",
    paddingTop: 5,
    textAlign: "center",
    color: "#FFF8E7",
    // marginLeft: 12,
  },
  containerFill: {
    marginBottom: 50,
  },
  descContain: {
    width: 225,
    height: 50,
    marginBottom: 20,
  },
  tekotok: {
    fontSize: 18,
    paddingTop: 40,
    marginLeft: 24,
  },
});
