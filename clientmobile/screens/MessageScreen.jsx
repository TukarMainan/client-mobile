import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import * as TalkRn from "@talkjs/expo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MessagesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState();
  const [username, setUsername] = useState();

  const triggerData = async () => {
    try {
      const data = await AsyncStorage.getItem("data");
      const obj = JSON.parse(data);
      setId(obj.id);
      setUsername(obj.username);
      // console.log("obj di room list :", obj);
    } catch (err) {
      console.log("err :", err);
    }
  };

  useEffect(() => {
    triggerData();
  }, []);

  const me = {
    id,
    name: username,
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: "98765432",
    name: "Javier",
    email: "Sebastian@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, how can I help? https://google.com",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  function navigateToChat() {
    navigation.navigate("Chat");
  }

  function onSelectConversation(conversation) {
    setSelectedConversation(conversation);
    navigateToChat();
  }

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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

  return (
    <TalkRn.Session appId="tPI8y4El" me={me}>
      <TalkRn.ConversationList
        me={me}
        onSelectConversation={conversation => {
          const user = conversation.others[0];
          console.log("user :", user);
          const obj = {
            id: user.id,
            name: user.name || user.username,
            photoUrl: user.photoUrl,
            id_sendiri: id,
            name_sendiri: username,
            // photoUrl: user.photoUrl,
          };

          navigation.navigate("Chat", obj);
        }}
      />

      {/* <TalkRn.Chatbox conversationBuilder={conversationBuilder} /> */}
    </TalkRn.Session>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    height: 200,
  },
  conversationList: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 24,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    borderWidth: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 14,
    color: "#808080",
  },
  lastMessageText: {
    fontSize: 16,
    color: "#808080",
  },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
