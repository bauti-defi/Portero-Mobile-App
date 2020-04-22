import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

export type props = {loading: boolean};

const LotesLoading = (props) => {
  return (
    <View style={styles.container}>
      {props.loading ? loader() : emptyList()}
    </View>
  );
};

const loader = () => {
  return (
    <View>
      <ActivityIndicator size="large" />
      <Text>Cargando Lotes...</Text>
    </View>
  );
};

const emptyList = () => {
  return (
    <View>
      <Text h4>No tenes lotes!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LotesLoading;
