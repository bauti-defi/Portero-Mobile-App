import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text h4>Cargando</Text>
      <ActivityIndicator size={100} animating={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
});

export default SplashScreen;
