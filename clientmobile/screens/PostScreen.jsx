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
  FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Spinner from "react-native-loading-spinner-overlay";
import * as Animatable from "react-native-animatable";
import Logo from "../logo.png";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import FormData from "form-data";
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
  const [category, setSelectedCategory] = useState([]);
  const [image, setImage] = useState([]);
  const [imageCam, setImageCam] = useState([]);
  const [city, setSelectedCity] = useState([]);
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
  const [isLoadingGetProvinceName, setIsLoadingGetProvinceName] =
    useState(true);

  const BASE_URL = "http://54.169.72.32";

  let cameraRef = useRef(null);

  const handlePost = async () => {
    console.log("imageCam :", imageCam);
    console.log("image :", image);
    console.log(title);
    console.log(description);
    console.log(condition);
    console.log(category);
    console.log(meetingPoint);
    // variabel take picture
    const data = new FormData();

    for (const itemImage of image) {
      data.append("images", itemImage);
    }
    data.append("title", title);
    data.append("description", description);
    data.append("condition", condition);
    data.append("CategoryId", category);
    data.append("meetingPoint", JSON.stringify(meetingPoint));
    data.append("price", 0);

    // console.log(imageCam);
    try {
      await axios({
        url: `${BASE_URL}/posts`,
        method: "POST",
        data: data,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhhMDIzZmIxLTdkODgtNDkyMS1hZTZhLTE2MzUwYWM4YjJiMCIsImlhdCI6MTY4Mzc4MzQ2MX0.g3JCpM4XJB1ZKQAaZ71m8q7zPBYLv2XIfo191lhzRJg",
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("imageCam :", imageCam);

      navigation.navigate("Homes");
    } catch (error) {
      // ! Bug alert masih keluar setelah create posts berhasil

      // Alert.alert(
      //   "Fields must be filled ",
      //   "Please enter a valid username and password.",
      //   [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      // );
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

  function handleDescAI() {
    console.log(description);
  }
  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImageCam(prevImages => [...prevImages, photo]);
      console.log("masuk sini");
      setShowPreview(true);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    // if (!result.canceled) {
    //   setImage([...image, ...result.assets]);
    // }

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const ext = uri.split(".").pop();
      const name = uri.split("/").pop();
      setImage([
        ...image,
        {
          uri: uri,
          type: `image/${ext}`,
          name,
        },
      ]);
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
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImageCam(prevImages => [...prevImages, photo]);
      console.log("masuk save");
      setShowPreview(false);
      setShowCamera(false);
    }
  };

  function handleRetake() {
    setImageCam([]);
    setShowPreview(false);
  }

  const getProvince = async () => {
    try {
      const { data } = await axios.get(
        "https://api.binderbyte.com/wilayah/provinsi?api_key=4e0c6a16ef4bf423bed33526e47e8095769019b9e42729c5b4ded70c54cc8ae2"
      );

      // const provinceNames = data.value.map(province => province.name);
      // const provinceId = data.value.map(province => province.id);

      const province = data.value.map(province => {
        return {
          id: province.id,
          name: province.name,
        };
      });

      // console.log("provinceNames :");
      setSelectedCity(province);
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setIsLoadingGetProvinceName(false);
    }
  };

  useEffect(() => {
    getProvince();
    // console.log("city: ", city);
  }, [isLoading]);

  // console.log("Category: ", category);
  // const canEdit = userId === postUserId
  // canEdit && following condition
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
    <>
      <ScrollView style={styles.container}>
        {/* <View style={styles.inputContainer}> */}
        <Text style={styles.titleLabel}>Toy name</Text>
        <TextInput
          placeholder="Enter toy name"
          style={styles.input}
          value={title}
          onChangeText={text => setTitle(text)}
        />
        {/* </View> */}

        {/* <View style={styles.descAI}>
          <Text onPress={handleDescAI}>Generate Title With AI</Text>
        </View> */}

        {/* <View style={styles.inputDescription}> */}
        <Text style={styles.descriptionTitle}>Description</Text>
        <TextInput
          numberOfLines={4}
          placeholder="Description"
          style={styles.descIn}
          value={description}
          onChangeText={text => setDescription(text)}
          multiline={true}
        />
        {/* </View> */}
        {/* <View style={styles.descAI}>
          <Text onPress={handleDescAI}>Generate Description With AI</Text>
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Condition</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={condition}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCondition(itemValue)
            }
          >
            <Picker.Item label="Select condition" value="" enabled={false} />
            <Picker.Item label="Brand new" value="brand new" />
            <Picker.Item label="Like new" value="like new" />
            <Picker.Item label="Lightly used" value="lightly used" />
            <Picker.Item label="Well used" value="well used" />
            <Picker.Item label="Heavily used" value="heavily used" />
          </Picker>
        </View>

        {/* <View style={styles.inputContainer}>
          <Text style={styles.label}>City</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
          >
            <Picker.Item label="Select a City" value="" enabled={false} />

            {city.map(province => {
              return (
                <Picker.Item label={province.name} value={province.province} />
              );
            })}
          </Picker>
        </View> */}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category</Text>
          <Picker
            style={styles.dropdown}
            selectedValue={category}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }
          >
            <Picker.Item label="Select category" value="" enabled={false} />
            <Picker.Item
              value="e759b264-980a-4d0a-90a4-cd484beffe49"
              label="Boys"
            />
            <Picker.Item
              value="8741881b-59ce-4d9e-b8e0-07d037511022"
              label="Girls"
            />
            <Picker.Item
              value="a7bb0fc2-c23f-4602-9e3c-318476e41e4b"
              label="Neutral"
            />
          </Picker>
        </View>

        <TouchableOpacity style={styles.con} onPress={pickImage}>
          <Text style={{ textAlign: "center", paddingTop: 17 }}> Browse </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.con}
          onPress={() => {
            setShowCamera(true);
          }}
        >
          <Text style={{ textAlign: "center", paddingTop: 17 }}>
            Take a picture
          </Text>
        </TouchableOpacity>
        <View>
          {image.length > 0 && (
            <View style={styles.resultContainer}>
              <FlatList
                data={image}
                keyExtractor={item => item.uri}
                numColumns={3}
                renderItem={({ item }) => {
                  return (
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.imageResult}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>
        <View>
          {imageCam.length > 0 && (
            <View style={styles.resultContainer}>
              <FlatList
                data={imageCam}
                keyExtractor={item => item.uri}
                numColumns={3}
                renderItem={({ item }) => {
                  return (
                    <Image
                      source={{ uri: item.uri }}
                      style={styles.imageResult}
                    />
                  );
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <Text style={styles.meetingLabel}>Meeting Point</Text>
          <View style={styles.map}>
            <MapView
              style={{ flex: 1 }}
              region={{
                latitude: meetingPoint.latitude,
                longitude: meetingPoint.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={event => setMeetingPoint(event.nativeEvent.coordinate)}
            >
              <Marker coordinate={meetingPoint} />
            </MapView>
          </View>
        </View>

        <TouchableOpacity style={styles.conPost} onPress={handlePost}>
          <Text style={{ textAlign: "center", paddingTop: 17 }}>Post</Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal visible={showCamera} animationType="slide">
        {showCamera && !imageUri && (
          <Camera
            style={styles.camera}
            type={type}
            ref={ref => (cameraRef = ref)}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.buttonCam, styles.buttonMargin]}
                onPress={flipCamera}
              >
                <Text style={styles.buttonText}>Flip</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCam, styles.buttonMargin]}
                onPress={takePicture}
              >
                <Text style={styles.buttonText}>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonCam, styles.buttonMargin]}
                onPress={() => {
                  setShowCamera(false);
                }}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )}
      </Modal>
      <Modal visible={showPreview} animationType="slide">
        <View style={styles.preview}>
          {imageCam.map(img => {
            return (
              <Image source={{ uri: img.uri }} style={styles.previewImage} />
            );
          })}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.retakeTouch} onPress={handleRetake}>
              <Text style={styles.textRetake}>Retake</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.retakeTouch} onPress={savePicture}>
              <Text style={styles.textRetake}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    padding: 10,
  },
  imageResult: {
    width: "33.33%",
    aspectRatio: 1,
    margin: 2,
  },
  conPost: {
    backgroundColor: "#F68383",
    height: 50,
    borderRadius: 12,
    marginVertical: 10,
    marginBottom: 20,
  },
  con: {
    color: "#FFF8E7",
    backgroundColor: "#7C67F2",
    height: 50,
    borderRadius: 12,
    marginVertical: 10,
    marginBottom: 20,
  },
  retakeTouch: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  textRetake: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  preview: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewImage: {
    flex: 1,
    width: "100%",
    resizeMode: "contain",
  },
  image: {
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF8E7",
    paddingBottom: 15,
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
    // marginTop: 30,
    borderRadius: 12,
    backgroundColor: "#f2f2f2",
    width: "90%",
    height: 50,
    justifyContent: "center",
    margin: 20,
  },
  descAI: {
    marginBottom: 30,
    borderRadius: 8,
    textAlign: "center",
    alignItems: "center",
    marginHorizontal: 60,
    paddingVertical: 8,
    backgroundColor: "#7C67F2",
    color: "#FFF8E7",
  },
  inputDescription: {
    borderRadius: 12,
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
    textAlign: "left",
    marginBottom: 20,
    marginLeft: 18,
  },
  descIn: {
    width: "90%",
    borderRadius: 5,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: "#f2f2f2",

    // paddingLeft: 15,
    // paddingBottom: 6,
    height: 90,
    marginLeft: 18,
  },
  input: {
    borderRadius: 5,
    // marginBottom: 30,
    fontSize: 16,
    // paddingLeft: 15,
    // paddingBottom: 10,
    backgroundColor: "#f2f2f2",
    width: "90%",
    height: 40,
    // marginRight: 50,
    marginLeft: 18,
    paddingLeft: 6,
    marginBottom: 20,
    marginTop: 6,
  },

  button: {
    backgroundColor: "#000000",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  buttonText: {
    borderWidth: 1,
    borderColor: "#000000",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  meetingLabel: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
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
    textAlign: "left",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,

    // paddingBottom: 4,
    marginLeft: 18,
    paddingLeft: 8,
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
  conCam: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  buttonCam: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  buttonMargin: {
    marginHorizontal: 10,
  },
});
