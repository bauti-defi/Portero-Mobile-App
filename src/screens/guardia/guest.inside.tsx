import React from 'react';
import {Text, View} from 'react-native';

const GuestInsideTile = ({guest}) => {
  return (
    <View>
      <Text>Already inside!</Text>
    </View>
  );
};

export default React.memo(GuestInsideTile);
