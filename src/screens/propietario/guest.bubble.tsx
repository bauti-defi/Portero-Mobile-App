import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const GuestBubble = ({guest, onRemove}) => {
  return (
    <View style={styles.bubbleContainer}>
      <Text h4 style={styles.bubbleText}>
        {guest.first_name} {guest.last_name[0]}.
      </Text>
      <TouchableOpacity onPress={() => onRemove(guest)}>
        <Icon name="times" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    margin: 5,
    padding: 1,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    borderWidth: 1,
  },
  bubbleText: {
    padding: 3,
  },
});

export default GuestBubble;
