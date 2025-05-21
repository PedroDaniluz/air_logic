import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const BotaoTeste = () => {
  const mostrarAlerta = () => {
    Alert.alert('voce clicou no botao :)');
  };

  return (
    <View style={styles.container}>
      <Button title="Clique aqui" onPress={mostrarAlerta} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default BotaoTeste;
