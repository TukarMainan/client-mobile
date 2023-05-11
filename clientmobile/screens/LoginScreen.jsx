import React, { useState, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
  Button,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const BASE_URL = "http://54.169.72.32";

  const navigation = useNavigation();
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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

  const handleLogin = async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/users/login`,
        method: "POST",
        data: {
          username,
          password,
        },
      });
      console.log("data :", data);
      const access_token = data?.access_token;
      // console.log("access_token :", access_token);

      await AsyncStorage.setItem("data", JSON.stringify(data));
      // await AsyncStorage.setItem("id", data?.id);
      // await AsyncStorage.setItem("name", data?.name);
      // await AsyncStorage.setItem("image", data?.image);
      // const value = await AsyncStorage.getItem("access_token");
      const value = await AsyncStorage.getItem("data");
      // const id = await AsyncStorage.getItem("id");
      console.log("value :", value);
      // console.log("id :", id);

      navigation.navigate("Homes");
    } catch (error) {
      console.log("error :", error);
      // Alert.alert(
      //   "Invalid credentials",
      //   "Please enter a valid username and password.",
      //   [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      // );
    }
  };

  function handleForgotPassword() {
    console.log(password);
  }

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalView}>
          <Image style={styles.iconLogo} source={require("../logo.png")} />

          <Text style={styles.titleModal}>Forgot Password</Text>
          <View style={styles.secondContainer}>
            <TextInput
              secureTextEntry
              style={styles.inputTextModal}
              placeholder="Old password"
              onChangeText={text => setOldPassword(text)}
              value={oldPassword}
            />
          </View>
          <View style={styles.secondContainer}>
            <TextInput
              secureTextEntry
              style={styles.inputTextModal}
              placeholder="New Password"
              onChangeText={text => setNewPassword(text)}
              value={newPassword}
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleForgotPassword}
          >
            <Text style={styles.buttonText}>Save New Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsVisible(false)}
          >
            <Text style={styles.buttonText}> Close </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Image style={styles.iconLogo} source={require("../logo.png")} />
      <Text style={styles.logo}>TukarMainan</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Username"
          placeholderTextColor="#003f5c"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgot} onPress={() => setIsVisible(true)}>
          Forgot Password?
        </Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.forgotContainer}>
        <Text
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          Register Here!
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconLogo: {
    width: 80,
    height: 80,
  },
  gradientBackground: {
    flex: 1,
    alignItems: "left",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#7C67F2",
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  secondContainer: {
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    width: "80%",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  inputTextModal: {
    height: 50,
    color: "#003f5c",
    paddingBottom: 10,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#7C67F2",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  forgotContainer: {
    width: "80%",
    backgroundColor: "#F68383",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  loginText: {
    color: "#FFF8E7",
    fontWeight: "bold",
  },
  forgot: {
    color: "#000000",
    fontSize: 16,
  },
  register: {
    color: "#FFF8E7",
    fontSize: 16,
    marginTop: 8,
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

  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8E7",
    borderRadius: 50,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  titleModal: {
    fontWeight: "bold",
    fontSize: 30,
    marginBottom: 20,
    color: "#e39ff6",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e39ff6",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
