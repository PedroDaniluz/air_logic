import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';
import BotaoTeste from '../components/BotaoTeste';

const Welcome = ({ }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao AirSense!</Text>
            <BotaoTeste />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    title: {
        fontFamily: theme.fonts.medium,
        fontSize: 24, 
        marginBottom: 20
    }
});

export default Welcome;
