import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const GuestDetailsScreen = ({navigation, route}) => {
  const {doc_id, fn, ln, id} = route.params;
  return (
    <View>
      <View style={styles.infoContainer}>
        <Text h1>
          {fn} {ln}
        </Text>
        <Text h4 style={styles.dniText}>
          {doc_id}
        </Text>
      </View>
      <ButtonView onAllow={null} onOk={null} />
    </View>
  );
};

const ButtonView = ({onAllow, onOk}) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          type="clear"
          icon={<Icon name="times" size={60} color="red" />}
          onPress={onOk}
        />
        <Button
          type="clear"
          icon={<Icon name="check" size={60} color="green" />}
          onPress={onAllow}
        />
      </View>
      <View style={styles.buttonViewFooter}>
        <Text h2 style={styles.dniText}>
          Verifique DNI
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  buttonViewFooter: {
    margin: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dniText: {
    color: 'red',
  },
  infoChild: {
    padding: 10,
    borderWidth: 2,
  },
  buttonContainer: {
    padding: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default GuestDetailsScreen;
