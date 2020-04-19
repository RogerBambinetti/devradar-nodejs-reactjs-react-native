import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export default function Main() {

    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        async function loadInitialLocation() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true
                });

                const { latitude, longitude } = coords;

                setCurrentPosition({ latitude, longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 });
            }

        }

        loadInitialLocation();
    }, []);

    if (!currentPosition) {
        return null;
    }

    return (
        <MapView style={styles.map} initialRegion={currentPosition}>
            <Marker coordinate={{ latitude: -27.0509295, longitude: -49.5372693 }}>
                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/50684839?s=460&v=4' }} />
                <Callout>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Teste</Text>
                        <Text style={styles.devBio}>Teaaaaaaaaaaaaaaaaaaaaaaaaaste</Text>
                        <Text style={styles.devTechs}>Teste</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );

}

const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 5,
        borderColor: '#FFF',
        borderWidth: 1
    },
    callout:{
        width: 260
    },
    devName:{
        fontWeight: 'bold',
        fontSize: 15
    },
    devBio:{
        color: '#666',
        marginTop: 5
    },
    devTechs:{
        marginTop: 5
    },
    map: {
        flex: 1
    }
});