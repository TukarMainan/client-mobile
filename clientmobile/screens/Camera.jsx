import React, { useState, useEffect , useRef} from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  // const { type } = props;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [storedUri, setStoredUri] = useState(null);
  let cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setImageUri(photo.uri);
      setShowPreview(true);
    }
  };

  const flipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const resetImageUri = () => {
    setImageUri(null);
    setShowPreview(false);
  };

  const accessCamera = () => {
    setShowCamera(true);
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


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {imageUri ? (
        <View style={styles.imageContainer}>
          <Text>{console.log(imageUri)}</Text>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={savePicture}>
              <Text style={styles.buttonText}>Use Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetImageUri}>
              <Text style={styles.buttonText}>Retake Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.homeContainer}>
          <TouchableOpacity style={styles.cameraButton} onPress={accessCamera}>
            <Text style={styles.buttonText}>Access Camera</Text>
          </TouchableOpacity>
        </View>
      )}

      {showCamera && !imageUri && (
        <Camera style={styles.camera} type={type} ref={(ref) => (cameraRef = ref)}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    left: 20,
    },
    homeContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      },
      cameraButton: {
      backgroundColor: '#0066cc',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      },
    });
