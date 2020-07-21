import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InviteContext} from './invite.info';

const GuestInsideTile = ({guest}) => {
  const {exited, setExited} = useContext(InviteContext);

  const exit = () => setExited([...exited, guest.id]);

  const reset = () => {
    setExited([...exited.filter((id) => id != guest.id)]);
  };

  const isExiting = () => exited.includes(guest.id);

  const getTileColor = () => (isExiting() ? 'green' : null);

  return (
    <View
      style={[
        styles.guestTileContainer,
        {
          backgroundColor: getTileColor(),
        },
      ]}>
      <View style={styles.guestInfoContainer}>
        <Text h2 numberOfLines={2} adjustsFontSizeToFit={true}>
          {guest.fn} {guest.ln}
        </Text>
        <Text h3 numberOfLines={1} adjustsFontSizeToFit={true}>
          {guest.doc_id}
        </Text>
      </View>
      <View style={styles.guestButtonContainer}>
        {isExiting() ? (
          <ResetButton onReset={reset} />
        ) : (
          <ExitButton onExit={exit} />
        )}
      </View>
    </View>
  );
};

const ResetButton = ({onReset}) => {
  return (
    <TouchableOpacity onPress={onReset} style={{marginLeft: 10}}>
      <Icon name="repeat" size={50} color="black" />
    </TouchableOpacity>
  );
};

const ExitButton = ({onExit}) => {
  return (
    <Button
      title="Sale"
      type="clear"
      titleStyle={{color: 'red', fontSize: 20}}
      onPress={onExit}
      containerStyle={{marginRight: 10}}
    />
  );
};

const styles = StyleSheet.create({
  guestTileContainer: {
    elevation: 3,
    paddingTop: 5,
    borderRadius: 4,
    flexDirection: 'row',
  },
  guestButtonContainer: {
    flex: 1,
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

export default React.memo(GuestInsideTile);
