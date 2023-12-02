import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Button, ActivityIndicator, Text } from 'react-native-paper';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { fetchPostImage, fetchInstructions, fetchModels } from '../helpers/api';
import { useNavigation } from '@react-navigation/native';

export default function CameraScreen() {
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [responseData, setResponseData] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [models, setModels] = useState([]);

  const navigation = useNavigation();
  const cameraScreen = useRef(null);

  //asking permission to use the user's camera and setting the permission
  useEffect(() => {
    askCameraPermission();
    fetchInstructions().then((resp) => {
      setInstructions(resp);
    });
    fetchModels().then((resp) => {
      setModels(resp);
    });
  }, []);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setPermission(status === 'granted');
  };

  //camera takes the photo and converts it to base64-format
  const takePhoto = async () => {
    if (cameraScreen) {
      const photo = await cameraScreen.current.takePictureAsync({
        base64: true,
      });
      setPhotoBase64(photo.base64);
      setShowImage(true);
    }
  };

  //user picks the photo from gallery and it's converted to base64-format
  const pickPhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setPhotoBase64(result.assets[0].base64);
      setShowImage(true);
    }
  };

  //sending the image for prediction, handling the response data that includes the predicted model
  //navigates automatically to the correct model's screen
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', photoBase64);
      setIsLoading(true);
      const data = await fetchPostImage(formData);
      // Conditional rendering for loading animation.
      if (data) {
        setIsLoading(false);
      }
      const model = models.find(
        (m) => m.furniture_name === data.furniture_name
      );

      navigation.navigate('Model', {
        model: model,
        instructions: instructions,
      });
      setPhotoBase64('');
      setShowImage(false);

      console.log('Upload successful. Server response:', responseData);
    } catch (error) {
      console.error('Network error: ', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {hasCameraPermission ? (
        <View style={styles.cameraContainer}>
          <Camera style={styles.camera} ref={cameraScreen} />
          <View style={styles.takePhoto}>
            <Button
              style={styles.button}
              icon={'camera-outline'}
              mode='text'
              onPress={takePhoto}
            >
              Take Picture
            </Button>
            <Button
              style={styles.button}
              icon={'view-gallery-outline'}
              mode='text'
              onPress={pickPhoto}
            >
              Photos
            </Button>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
            />
          </View>
          <View style={styles.uploadButtonContainer}>
            <Button
              icon={'cube-send'}
              style={styles.uploadButton}
              mode='text'
              onPress={uploadImage}
            >
              Send
            </Button>
            <ActivityIndicator
              style={styles.loadingIndicator}
              animating={isLoading}
            />
          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
      )}
    </SafeAreaView>
  );
}

const screen = Dimensions.get('screen');
const ratio = screen.width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 6,
    width: screen.width - 30,
    marginTop: 40,
  },
  takePhoto: {
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    height: 40,
  },
  imageContainer: {
    flex: 5,
  },
  image: {
    marginBottom: 10,
    width: screen.width - 30,
    height: ratio - 130,
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    padding: 10,
    marginTop: 15,
  },
  uploadButton: {
    height: 40,
    width: '30%',
    marginTop: 25,
    marginLeft: 20,
  },
  loadingIndicator: {
    paddingTop: 20,
  },
});
