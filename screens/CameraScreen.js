import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { fetchPostImage } from '../helpers/api';

export default function CameraScreen({ navigation }) {
  const [hasCameraPermission, setPermission] = useState(null);
  const [photoBase64, setPhotoBase64] = useState('');
  const [responseData, setResponseData] = useState('');
  const [showImage, setShowImage] = useState(false);

  const cameraScreen = useRef(null);

  //asking permission to use the user's camera and setting the permission
  useEffect(() => {
    askCameraPermission();
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
  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('picture', photoBase64);

      const responseData = await fetchPostImage(formData);

      setResponseData(JSON.stringify(responseData, null, 2));
      navigation.navigate('Model'); //Has to be edited so it navigates to the correct model's screen
      setPhotoBase64('');
      setShowImage(false);

      console.log('Upload successful. Server response:', responseData);

    } catch (error) {
      console.error('Network error: ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {hasCameraPermission ? (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 4, minWidth: '100%' }} ref={cameraScreen} />
          <View>
            <Button title='Take a Photo' onPress={takePhoto} />
            <Button title='Pick a Photo from Camera Roll' onPress={pickPhoto} />
          </View>
          <View style={{ flex: 4 }}>
            <Image
              style={{ flex: 1 }}
              source={{ uri: `data:image/jpeg;base64,${photoBase64}` }}
            />
            <Text>{responseData}</Text>
            <Button title='Send Photo' onPress={uploadImage} />
          </View>
        </View>
      ) : (
        <Text>No access to camera</Text>
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
    marginBottom: 20,
  },
});
