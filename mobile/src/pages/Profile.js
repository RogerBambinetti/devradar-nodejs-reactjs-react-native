import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import {WebView} from 'react-native-webview';

export default function Profile({navigation}) {

    const githubUsername = navigation.getParam('github_username');

    return (
       <WebView style={styles.container} source={{uri: `https://github.com/${githubUsername}`}}/>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});