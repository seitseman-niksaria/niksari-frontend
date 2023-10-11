import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function NiksariCamera() {

    const [hasCameraPermission, setPermission] = useState(null);
    const [photoBase64, setPhotoBase64] = useState('');

    const niksariCamera = useRef(null);

    useEffect(() => {
        askCameraPermission();
    }, []);

    const askCameraPermission = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setPermission(status === 'granted');
    };

    const takePhoto = async () => {
        if (niksariCamera) {
            const photo = await niksariCamera.current.takePictureAsync({ base64: true });
            setPhotoBase64(photo.base64);
        }
    };

    const pickPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3]
        });

        if (!result.canceled) {
            setPhotoBase64(result.assets[0].base64)
        }
    }

    return (
        <View style={styles.container}>
            {hasCameraPermission ?
                (
                    <View style={{ flex: 1 }}>
                        <Camera style={{flex: 4, minWidth: '100%'}} ref={niksariCamera} />
                        <View>
                            <Button title='Take a Photo' onPress={takePhoto} />
                            <Button title='Pick a Photo from Camera Roll' onPress={pickPhoto} />
                        </View>
                        <View style={{ flex: 4 }}>
                            <Image style={{ flex: 1 }} source={{ uri: `data:image/gif;base64,${photoBase64}` }} />
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
    },
  });