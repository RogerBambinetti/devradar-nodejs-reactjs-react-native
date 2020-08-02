import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

export default function Main({ navigation }) {

    const [currentPosition, setCurrentPosition] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState('');

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

    useEffect(() => {
        subscribeToNewDevs(dev => setDevs([...devs, dev]));
    }, [devs]);

    function setupWebSocket() {
        disconnect();
        const { latitude, longitude } = currentPosition;
        connect(latitude, longitude, techs);
    }

    async function loadDevs() {
        const { latitude, longitude } = currentPosition;
        const response = await api.get('search', { params: { latitude, longitude, techs } });
        setDevs(response.data);
        setupWebSocket();
    }

    function handlePositionChange(region) {
        setCurrentPosition(region);
    }

    if (!currentPosition) {
        return null;
    }

    return (
        <>
            <MapView style={styles.map} onRegionChangeComplete={handlePositionChange} initialRegion={currentPosition}>
                {devs.map(dev => (
                    <Marker key={dev._id} coordinate={{ latitude: dev.location.coordinates[1], longitude: dev.location.coordinates[0] }}>
                        <Image style={styles.avatar} source={{ uri: dev.avatar_url }} />
                        <Callout onPress={() => { navigation.navigate('Profile', { github_username: dev.github_username }) }}>
                            <View style={styles.callout}>
                                <Text style={styles.devName}>{dev.name}</Text>
                                <Text style={styles.devBio}>{dev.bio}</Text>
                                <Text style={styles.devTechs}>{dev.techs.join(', ')}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <View style={styles.searchForm}>
                <TextInput style={styles.searchInput} onChangeText={setTechs} placeholder="Enter some techs" placeholderTextColor="#999" />
                <TouchableOpacity style={styles.searchButton} onPress={loadDevs}>
                    <MaterialIcons name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </>
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
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 15
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    map: {
        flex: 1
    },
    searchForm: {
        position: 'absolute',
        bottom: 35,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 15,
        elevation: 2
    },
    searchButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: "#7d40e7",
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    }
});