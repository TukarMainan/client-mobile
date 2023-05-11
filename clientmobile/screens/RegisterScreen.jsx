import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
  Alert
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import { Picker } from "@react-native-picker/picker";
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';


export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCity, setSelectedCity] = useState("New York");
  const [animationValue] = useState(new Animated.Value(0));
  const navigation = useNavigation()

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const BASE_URL = "http://54.169.72.32";


  const handleRegister = async () => {
    try {
      console.log(email,selectedCity,username,password);

      const { data } = await axios ({
        url:`${BASE_URL}/users/register`,
        method:"POST",
        data: {
          email,
          username,
          password,
          city: selectedCity,
        }
      })
      navigation.navigate("Login");
    } catch (error) {
      console.log(error)
      
    }
  };

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

  const toLogin = () => {
    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Image style={styles.iconLogo} source={require('../logo.png')}
      />
      <Text style={styles.logo} >
        TukarMainan.
      </Text>
      <View style={styles.inputView}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue) => setSelectedCity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Jakarta" value="Jakarta" />
          <Picker.Item label="Surabaya" value="Surabaya" />
          <Picker.Item label="Bandung" value="Bandung" />
          <Picker.Item label="Yogyakarta" value="Yogyakarta" />
          <Picker.Item label="Tangerang" value="Tangerang" />
        </Picker>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={setEmail}
        />
      </View>
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
      
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>REGISTER</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.forgot} onPress={toLogin} >Already have an account? Login here</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    
  },
  iconLogo :{
    width:80,
    height:80
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#e39ff6",
    marginBottom: 40,
    
  },
  inputView: {
    width: "80%",
    backgroundColor: "#f2f2f2",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#003f5c",
  },
  registerBtn: {
    width: "80%",
    backgroundColor: "#e39ff6",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  registerText: {
    color: "#fff",
    fontWeight: "bold",
  },
  forgot: {
    color: "#cc0000",
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
