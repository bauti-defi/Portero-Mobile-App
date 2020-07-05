import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

const InviteContext = React.createContext(null);

const InviteInfo = ({invite, guests}) => {
  const navigation = useNavigation();
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const {
    creation_date,
    enabled,
    lote_id,
    id,
    exp,
    p_fn,
    p_ln,
    l_name,
    l_street,
    l_num,
    l_code,
  } = invite;

  return (
    <InviteContext.Provider
      value={{approved, setApproved, rejected, setRejected}}>
      <View>
        <View style={styles.infoContainer}>
          <View style={styles.infoChild}>
            <Text h2>Destino</Text>
            <Text h4>{l_name}</Text>
            <Text h4>
              {l_street} {l_num}, {l_code}
            </Text>
          </View>
          <View style={styles.infoChild}>
            <Text h2>Propietario</Text>
            <Text h4>
              {p_fn} {p_ln}
            </Text>
          </View>
        </View>
        <View style={styles.listContainer}>
          {guests.map((guest) => {
            return <GuestTile guest={guest} key={guest.g_id} />;
          })}
        </View>
      </View>
    </InviteContext.Provider>
  );
};

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
      <View style={styles.guestButtonContainer}>
        {!canReset() ? (
          <RejectButton onReject={reject} />
        ) : (
          <ResetButton onReset={reset} />
        )}
      </View>
      <View style={styles.guestInfoContainer}>
        <Text h2>
          {guest.g_fn} {guest.g_ln}
        </Text>
        <Text h3>{guest.g_doc}</Text>
      </View>
      <View style={styles.guestButtonContainer}>
        {!canReset() && <ApproveButton onApprove={approve} />}
      </View>
    </View>
  );
};

const ResetButton = ({onReset}) => {
  return (
    <TouchableOpacity onPress={onReset}>
      <Icon name="repeat" size={50} color="black" />
    </TouchableOpacity>
  );
};

const ApproveButton = ({onApprove}) => {
  return (
    <TouchableOpacity onPress={onApprove}>
      <Icon name="check" size={50} color="green" />
    </TouchableOpacity>
  );
};

const RejectButton = ({onReject}) => {
  return (
    <TouchableOpacity onPress={onReject}>
      <Icon name="times" size={50} color="red" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    margin: 20,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  infoChild: {
    padding: 10,
    borderBottomWidth: 2,
  },
  listContainer: {
    margin: 20,
  },
  guestTileContainer: {
    elevation: 3,
    borderRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  guestButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestInfoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InviteInfo;
