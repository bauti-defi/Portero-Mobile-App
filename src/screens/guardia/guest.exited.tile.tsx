import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';

const GuestExitedTile = ({guest}) => {
  return (
    <View style={styles.guestTileContainer}>
      <View style={styles.guestInfoContainer}>
        <Text h2 numberOfLines={2} adjustsFontSizeToFit={true}>
          {guest.fn} {guest.ln}
        </Text>
        <Text h3 numberOfLines={1} adjustsFontSizeToFit={true}>
          {guest.doc_id}
        </Text>
      </View>
      <View style={styles.exitText}>
        <Text
          h4
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={{
            color: 'green',
          }}>
          Despachado
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  guestTileContainer: {
    elevation: 3,
    paddingTop: 5,
    borderRadius: 4,
    flexDirection: 'row',
  },
  exitText: {
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  guestInfoContainer: {
    flex: 2,
    paddingLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

export default React.memo(GuestExitedTile);
