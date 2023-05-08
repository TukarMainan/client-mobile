import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Modal,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import { Camera } from "expo-camera";
import {
  Menu,
  MenuTrigger,
  MenuProvider,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";
export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setSelectedCondition] = useState("");
  const [category, setSelectedCategory] = useState("");
  const [image, setImage] = useState([]);
  const [imageCam, setImageCam] = useState([]);
  const [city, setSelectedCity] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pictureData, setPictureData] = useState(null);
  const [meetingPoint, setMeetingPoint] = useState({
    latitude: -6.121435,
    longitude: 106.774124,
  });
  const [showCamera, setShowCamera] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [storedUri, setStoredUri] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);


  let cameraRef = useRef(null);

  const handlePost = async () => {
    try {
      // const { data } = await axios({
      //   url: "http://localhost:3001/user",
      //   method: "POST",
      //   data: {
      //     username: username,
      //     password: password,
      //   },
      // });
      console.log(
        title,
        description,
        condition,
        city,
        category,
        status,
        meetingPoint
      );
      navigation.navigate("Homes");
    } catch (error) {
      Alert.alert(
        "Fields must be filled ",
        "Please enter a valid username and password.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }
  };
  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
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

  function handleDescAI() {
    console.log(description);
  }
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImageCam(photo.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      setImage([...image, ...result.assets]);
    }
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const savePicture = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + Date.now() + '.jpg';
      await FileSystem.moveAsync({
        from: imageUri,
        to: fileUri,
      });
      setStoredUri(fileUri);
      await AsyncStorage.setItem('imageUri', fileUri);

    } catch (e) {
      console.log(e);
    }
  };

  const resetImageUri = () => {
    setImageUri(null);
    setShowPreview(false);
  };

  // const canEdit = userId === postUserId
  // canEdit && following condition
  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.titleLabel}>Title</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
      </View>

      <View style={styles.descAI}>
        <Text onPress={handleDescAI}>Generate Title With AI</Text>
      </View>

      <View style={styles.inputDescription}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <TextInput
          numberOfLines={4}
          placeholder="Description"
          style={[styles.input, styles.descIn]}
          value={description}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
      </View>
      <View style={styles.descAI}>
        <Text onPress={handleDescAI}>Generate Description With AI</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Condition</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={condition}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCondition(itemValue)
          }
        >
          <Picker.Item label="Select a Category" value="" enabled={false} />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>City</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={city}
          onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
        >
          <Picker.Item label="Select a City" value="" enabled={false} />

          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <Picker
          style={styles.dropdown}
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemValue)
          }
        >
          <Picker.Item label="Select a Category" value="" enabled={false} />
          <Picker.Item label="Option 1" value="option1" />
          <Picker.Item label="Option 2" value="option2" />
          <Picker.Item label="Option 3" value="option3" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.container}>
        <Button title="Pick an image from your gallery" onPress={pickImage} />
      </TouchableOpacity>
      {image.length > 0 && (
        <View>
          {image.map((image) => (
            <Image
              key={image.uri}
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          ))}
        </View>
      )}
      {/* <Text>{console.log(imageCam, "<<<")}</Text> */}
      {imageCam &&   (
        <View style={styles.imageContainer}>
          {/* <Text>{console.log(imageUri)}</Text> */}
          {/* <Image source={{ uri: imageCam }} style={styles.image} /> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={savePicture}>
              <Text style={styles.buttonText}>Use Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetImageUri}>
              <Text style={styles.buttonText}>Retake Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* {imageCam.length > 0 && (
        <View>
          {imageCam.map((img) => (
            <Image
              key={img.uri}
              source={{ uri: img.uri }}
              style={{ width: 200, height: 200 }}
            />
          ))}
        </View>
      )} */}
      <TouchableOpacity style={styles.container}>
        <Button
          title="Take a picture"
          onPress={() => {
            setShowCamera(true);
          }}
        />
      </TouchableOpacity>

      <View style={styles.mapContainer}>
        <Text style={styles.label}>Meeting Point</Text>
        <View style={styles.map}>
          <MapView
            style={{ flex: 1 }}
            region={{
              latitude: meetingPoint.latitude,
              longitude: meetingPoint.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={(event) => setMeetingPoint(event.nativeEvent.coordinate)}
          >
            <Marker coordinate={meetingPoint} />
          </MapView>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Post" onPress={handlePost} />
      </View>

      <View>
        {showCamera && !imageUri && (
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => (cameraRef = ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={flipCamera}>
                <Text style={styles.buttonText}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.buttonText}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </View>

      {/* <Text onPress={openMenu}> Open Cam </Text>
      <MenuProvider>
        
          <MenuTrigger text="Show Menu" />
          <Menu>
            <MenuOptions>
              <MenuOption onSelect={takePicture}>
                <Text>Take Picture</Text>
              </MenuOption>
              <MenuOption onSelect={flipCamera}>
                <Text>Flip Camera</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        
      </MenuProvider> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  addFile: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 20,
  },
  iconContainer: {
    flex: 1,
  },
  imageIcon: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  cameraIcon: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageIconnn: {
    alignSelf: "center",
  },
  cameraIconnnn: {
    alignSelf: "center",
  },
  iconImageInput: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  myCamera: {
    height: 100,
    width: 100,
  },
  imageInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#CCCCCC",
    paddingLeft: 10,
    paddingRight: 10,
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#00000",
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 31,
  },
  inputText: {
    fontSize: 16,
  },

  inputContainer: {
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    width: "90%",
    height: 50,
    justifyContent: "center",
    margin: 20,
  },
  descAI: {
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 40,
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: 15,
    paddingVertical: 17,
    backgroundColor: "#e39ff6",
  },
  inputDescription: {
    borderRadius: 50,
    backgroundColor: "#f2f2f2",
    width: "93%",
    height: 110,
    justifyContent: "center",
    margin: 18,
    paddingLeft: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    marginBottom: 20,
  },
  descIn: {
    width: "90%",
    borderRadius: 4,
    marginBottom: 30,
    fontSize: 16,
    paddingLeft: 15,
    paddingBottom: 6,
    height: 90,
  },
  input: {
    borderRadius: 4,
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 15,
    paddingBottom: 7,
  },

  buttonContainer: {
    marginTop: 15,
    paddingBottom: 20,
    borderRadius: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  labelInputImage: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  titleLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  mapContainer: {
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    height: 200,
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
  },
  map: {
    flex: 1,
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: "gray",
    marginTop: 10,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  imageLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  commentContainer: {
    marginTop: 10,
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
