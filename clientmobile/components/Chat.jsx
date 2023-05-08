import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Image} from 'react-native';
import { GiftedChat , InputToolbar} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const initialMessages = [
  {
    _id: 1,
    text: 'Hello! How can I help you today?',
    createdAt: new Date(),
    user: {
      _id: 2,
      name: 'John Doe',
      avatar: 'https://placeimg.com/140/140/any',
    },
  },
  // Add more initial messages as needed
];
import cameraIcon from '../filter.png';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState(initialMessages);

  function onSend(newMessages) {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  }

  function navigateToMessages() {
    navigation.goBack();
  }

  function renderInputToolbar(props) {
    return (
      <InputToolbar {...props}>
        <TouchableOpacity onPress={() => console.log('Camera button pressed')}>
              <Icon name="camera"  size={24} style={styles.icon}/>
              <Icon name="file-image-outline"  size={24} style={styles.icon} />
              <Icon name="camera"  size={24} style={styles.icon} />
        </TouchableOpacity>
      </InputToolbar>
    );
  }
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  cameraIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
    color: '#6F6F6F',
  },
});
