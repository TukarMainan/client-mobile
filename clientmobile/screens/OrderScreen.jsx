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
  //   const { item } = route.params;
  const navigation = useNavigation();
  function handleAccept() {
    console.log("handle acc");
  }
  function handleReject() {
    console.log("handleReject");
  }
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {DATA?.map((item) => {
            return (
              <View style={styles.cardContainer} key={item.id}>
                <View style={styles.card}>
                  <Card item={item} key={item.id} />
                </View>

                <View style={styles.containerFill}>
                  <View style={styles.descContain}>

                  <Text style={styles.fontDesc} >Request from John Wick </Text>
                  <Text style={styles.fontTitle} >Robot GEDEG </Text>
                  <Text style={styles.fontdes} >Descriptionadhwailwudhailuwdh </Text>
                  </View>
                  <View style={styles.containerButton}>
                   
                    <TouchableOpacity
                      style={styles.description}
                      onPress={handleAccept}
                    >
                      <Text style={styles.font}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.description}
                      onPress={handleReject}
                    >
                      <Text style={styles.font}>Reject</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  fontDesc:{
    paddingLeft:1,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',

  },
  fontTitle:{
    paddingLeft:1,
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
  },
  fontdes:{
    paddingLeft:1,
    fontSize:15,
    fontWeight:'bold',
    textAlign:'center',
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.24,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    backgroundColor: "#ecdff5",
  },
  containerButton: {
    flexDirection: "row",
   
    marginRight: 100,
    paddingRight: 200,
    height: 1,
    paddingTop:30,
    paddingLeft:10,

  },

  card: {
    // paddingTop: 10,
    // width: 100,
    // height: 100,
    // margin: 10,
    // marginBottom: 100,
    // marginLeft: 50,
  },
  description: {
    paddingRight: 5,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#a06ccb",
    height: 30,
    marginTop:20,
  },
  font: {
    flexDirection: "row",
    paddingTop:5,
    textAlign: "center",
  },
  containerFill: {
    marginBottom:50
  },
  descContain:{
    width:225,
    height:50,
    marginBottom:20
  }
});
