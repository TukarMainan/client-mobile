import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as TalkRn from "@talkjs/expo";

const initialMessages = [
  {
    _id: 1,
    text: "Hello! How can I help you today?",
    createdAt: new Date(),
    user: {
      _id: 2,
      name: "John Doe",
      avatar: "https://placeimg.com/140/140/any",
    },
  },
  // Add more initial messages as needed
];

export default function ChatScreen(obj) {
  // console.log("obj :", obj.route.params);
  const id = obj.route.params.id;
  const name = obj.route.params.name;
  const photoUrl = obj.route.params.photoUrl;

  const [messages, setMessages] = useState(initialMessages);

  function onSend(newMessages) {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }

  function navigateToMessages() {
    navigation.goBack();
  }

  const me = {
    id: "123456789",
    name: "Alice",
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id,
    name,
    email: "Sebastian@example.com",
    photoUrl,
    welcomeMessage: "Hey, how can I help? https://google.com",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  function renderInputToolbar(props) {
    return (
      <InputToolbar {...props}>
        <TouchableOpacity onPress={() => console.log("Camera button pressed")}>
          <Icon name="camera" size={24} style={styles.icon} />
          <Icon name="file-image-outline" size={24} style={styles.icon} />
          <Icon name="camera" size={24} style={styles.icon} />
        </TouchableOpacity>
      </InputToolbar>
    );
  }
  return (
    <View style={styles.container}>
      <TalkRn.Session appId="tPI8y4El" me={me}>
        {/* <TalkRn.ConversationList
          me={me}
          onSelectConversation={() => navigateToChat()}
        /> */}
        <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
      </TalkRn.Session>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  cameraIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: "#6F6F6F",
  },
});
