import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet ,   Image, TouchableOpacity
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from 'react-native-animatable';
import Logo from "../logo.png";
import { useNavigation } from "@react-navigation/native";

export default function Notification(){
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch notifications from API or database
    // and update the state
    const fetchedNotifications = [
      { id: 1,name:'ardito', title: 'New message', message: 'You have a new message from John Doe.' },
      { id: 2,name:'joko', title: 'New follower', message: 'You have a new follower on Instagram.' },
      { id: 3,name:'moly', title: 'New email', message: 'You have a new email from your boss.' },
    ];
    setNotifications(fetchedNotifications);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

  }, []);
  const navigation = useNavigation();

  function handlePress(event,item){
    event.persist();
    navigation.navigate('Chat',{notification:item});
  }

  const renderItem = ({ item }) => {

    if(isLoading){
      return (
        <View style={styles.spinnerContainer}>
        <Spinner
          visible={isLoading}
          customIndicator={
            <Animatable.View animation="bounce" iterationCount="infinite">
              <Image source={Logo} style={styles.spinnerLogo} />
            </Animatable.View>
          }
          
        />
      </View>
      )
    }

    return (
      <TouchableOpacity style={styles.notification}  onPress={item.title === 'New message' ? handlePress : null}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.noNotifications}>You have no notifications.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noNotifications: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 50,
  },
  notification: {
    backgroundColor: '#ecdff5',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  notificationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 14,
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

});

