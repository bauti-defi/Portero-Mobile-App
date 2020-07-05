import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {InviteContext} from './invite.info';

const GuestTile = ({guest}) => {
  const {setApproved, setRejected, approved, rejected} = useContext(
    InviteContext,
  );

  const approve = () => setApproved([...approved, guest.g_id]);

  const reject = () => setRejected([...rejected, guest.g_id]);

  const reset = () => {
    setRejected([...rejected.filter((id) => id != guest.g_id)]);
    setApproved([...approved.filter((id) => id != guest.g_id)]);
  };

  const isRejected = () => rejected.includes(guest.g_id);

  const isApproved = () => approved.includes(guest.g_id);

  const canReset = () => isRejected() || isApproved();

  const getTileColor = () =>
    isApproved() ? 'green' : isRejected() ? 'red' : null;

  return (
    <View
      style={[
        styles.guestTileContainer,
        {
          backgroundColor: getTileColor(),
        },
      ]}>
      <View style={styles.guestInfoContainer}>
        <Text h2>
          {guest.g_fn} {guest.g_ln}
        </Text>
        <Text h3>{guest.g_doc}</Text>
      </View>
      <View style={styles.guestButtonContainer}>
        {canReset() ? (
          <ResetButton onReset={reset} />
        ) : (
          <>
            <RejectButton onReject={reject} />
            <ApproveButton onApprove={approve} />
          </>
        )}
      </View>
    </View>
  );
};

const ResetButton = ({onReset}) => {
  return (
    <TouchableOpacity onPress={onReset} style={{marginLeft: 40}}>
      <Icon name="repeat" size={50} color="black" />
    </TouchableOpacity>
  );
};

const ApproveButton = ({onApprove}) => {
  return (
    <TouchableOpacity onPress={onApprove} style={{marginRight: 15}}>
      <Icon name="check" size={50} color="green" />
    </TouchableOpacity>
  );
};

const RejectButton = ({onReject}) => {
  return (
    <TouchableOpacity onPress={onReject} style={{marginRight: 15}}>
      <Icon name="times" size={50} color="red" />
    </TouchableOpacity>
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

export default GuestTile;
