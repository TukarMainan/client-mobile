import Card from "../components/Card";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  Alert,
  Modal
} from "react-native";
import React, { useState, useEffect } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import axios from "axios";
import { BASE_URL } from "../config/api";
import Logo from "../logo.png";

export default function Request({trades}){
    const navigation = useNavigation();
    function handleAccept() {
      console.log("handle acc");
    }
    function handleReject() {
      console.log("handleReject");
    }
  
    const handleItemPress = (id) => {
      navigation.navigate("Detail", { id });
    };
  
    function handleComplete(){
      navigation.navigate("Review");
      console.log('complete');
    }
  
    function handleChat(){
      navigation.navigate('Chat')
    }
    return (
        <ScrollView>
        <View style={styles.container}>
          {trades?.map(item => {
          console.log(trades);
            console.log(item?.TargetPost.Category);
            return (
              <View style={styles.cardContainer} key={item.id}>
                <TouchableOpacity style={styles.card} onPress={() => handleItemPress(item.TargetPostId)} >
                  <Card item={item?.TargetPost} key={item.id} />
                </TouchableOpacity>
                <View style={styles.containerFill}>
                  <View style={styles.descContain}>
                    <Text style={styles.fontDesc}>Requesting trade to {item?.TargetPost?.User?.username} </Text>
                    <Text style={styles.fontTitle}>{item?.TargetPost?.title}</Text>
                    <Text style={styles.fontdes}>
                    {item?.TargetPost?.description}
                    </Text>
                  </View>
                  {trades.Status === 'requesting' ? (
                  <Text style={{fontSize:50}} >Requesting ...</Text>
                  ) : (
                    <View style={styles.containerButton}>
                    <TouchableOpacity
                      style={styles.description}
                      onPress={handleComplete}
                    >
                      <Text style={styles.font}>Complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.description}
                      onPress={handleChat}
                    >
                      <Text style={styles.reject}>Chat User</Text>
                    </TouchableOpacity>
                   
                  </View>
                  ) }
                  
                  
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    )
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
      paddingLeft:10
  
    },
    containerButton: {
      flexDirection: "row",
      marginRight: 100,
      paddingRight: 200,
      height: 1,
      paddingTop: 30,
      paddingRight: 40,
    },
  
    card: {
      marginTop:10,
  
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
      marginTop: 25,
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
  });
  