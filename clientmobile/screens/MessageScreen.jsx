import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet , Image
} from 'react-native';
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from 'react-native-animatable';
import Logo from "../logo.png";

const messagesData = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'Hello! How can I help you today?',
    avatar: 'https://placeimg.com/140/140/any',
    time: '11:30 AM',
  },
  {
    id: '2',
    name: 'Dono Surono',
    lastMessage: 'Haihai',
    avatar: 'https://placeimg.com/140/140/any',
    time: '11:30 AM',
  },
];

export default function MessagesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  function navigateToChat() {
    navigation.navigate('Chat',);
  }

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
        overlayColor="rgba(0, 0, 0, 0.5)"
      />
    </View>
    )
  }

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={navigateToChat}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          <Text style={styles.lastMessageText}>{item.lastMessage}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messagesData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor:'#ecdff5',
    borderRadius: 30,
    padding: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#808080',
  },
  lastMessageText: {
    fontSize: 16,
    color: '#808080',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
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
