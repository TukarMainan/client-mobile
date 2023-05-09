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

export default function MessagesScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const me = {
    id: "123456789",
    name: "Alice",
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
          const obj = {
            id: user.id,
            name: user.name,
            photoUrl: user.photoUrl,
          };
          // console.log("conversation :", user.id, user.name, user.photoUrl);
          // navigateToChat(conversation(obj));
          // console.log("obj :", obj);
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
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ecdff5",
    borderRadius: 30,
    padding: 20,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 48,
    height: 48,
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
