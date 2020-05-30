import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

interface Props {
  text?: string;
}

const EmptyList = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text h4 style={styles.contents}>
        {props.text ? props.text : 'Vacio'}
      </Text>
    </View>
  );
};

const SCREEN_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: SCREEN_HEIGHT,
  },
  contents: {
    color: 'grey',
  },
});

export default EmptyList;
