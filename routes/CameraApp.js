import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraApp() {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cameraApp, setCameraApp] = useState(null);
    const [image, setImage] = useState(null);

    const takePicture = async () => {
        if(cameraApp){
            const data = await cameraApp.takePictureAsync(null);
            setImage(data.uri)
        }
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
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
                <View style={styles.buttonContainer}>
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
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
        marginBottom: 10,
    },
});