//Created by following instructions here:
//https://medium.com/@nutanbhogendrasharma/implement-camera-in-react-native-mobile-app-part-1-ea307ce924a4

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function CameraApp() {

    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraApp, setCameraApp] = useState(null);
    const [image, setImage] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if(cameraApp){
            const data = await cameraApp.takePictureAsync(null);
            setImage(data.uri)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
        console.log(result)

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    if (hasCameraPermission === null || hasGalleryPermission === false) {
        return <View />;
    }

    if (hasCameraPermission === false || hasGalleryPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return(
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera
                ref={ref => setCameraApp(ref)}
                style={styles.camera} 
                type={type} 
                ratio={'1:1'} />
            </View>
                <View style={styles.button}>
                    <Button
                    style={styles.button}
                    title="Flip"
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                    }} />
                    <Button title="Take a picture" onPress={() => takePicture()} />
                    <Button title="Pick an image from gallery" onPress={() => pickImage()} />
                    {image && <Image source={{uri: image}} style={{flex: 1}} />}
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
    },
    camera: {
        flex: 1,
        aspectRatio: 1,
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        flex: 1,
        marginTop: 10,
    },
    text: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
});