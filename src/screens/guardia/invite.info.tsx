import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {format} from '../../date.formatter';
import {inviteResponse} from '../../requests/invite.requests';
import GuestExitedTile from './guest.exited.tile';
import GuestInsideTile from './guest.inside.tile';
import GuestPendingTile from './guest.pending.tile';
import GuestRejectedTile from './guest.rejected.tile';

export const InviteContext = React.createContext(null);

const InviteInfo = ({invite, guests}) => {
  const navigation = useNavigation();
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [exited, setExited] = useState([]);

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

  const confirm = () => {
    if (approved.length > 0 || rejected.length > 0 || exited.length > 0) {
      inviteResponse(id, approved as [], rejected as [], exited as []);
    }
    navigation.navigate('Actividad');
  };

  return (
    <InviteContext.Provider
      value={{
        approved,
        setApproved,
        rejected,
        setRejected,
        exited,
        setExited,
        expired: isExpired(exp),
      }}>
      <Button title="Confirmar" onPress={confirm} />
      <ScrollView contentContainerStyle={styles.screenContainer}>
        <View style={styles.infoContainer}>
          <Text h1 style={{textAlign: 'center'}}>
            {p_fn} {p_ln}
          </Text>
          <Text h4 style={{textAlign: 'center'}}>
            {l_street} {l_num}, {l_code}
          </Text>
        </View>
        {isExpired(exp) && <Warning exp={exp} />}
        <View style={styles.listContainer}>
          {guests.map((guest) => {
            if (isInside(guest)) {
              return <GuestInsideTile guest={guest} key={guest.id} />;
            } else if (hasExited(guest)) {
              return <GuestExitedTile guest={guest} key={guest.id} />;
            } else if (wasRejected(guest)) {
              return <GuestRejectedTile guest={guest} key={guest.id} />;
            }
            return <GuestPendingTile guest={guest} key={guest.id} />;
          })}
        </View>
      </ScrollView>
    </InviteContext.Provider>
  );
};

const isExpired = (exp) => new Date(exp) < new Date();

const wasRejected = (guest) => guest.rejected != null;
const hasExited = (guest) => guest.exited != null;

const isInside = (guest) =>
  guest.entered != null && !hasExited(guest) && !wasRejected(guest);

const Warning = ({exp}) => {
  var dateString = format(exp);
  return (
    <Text h3 style={{color: 'red', textAlign: 'center'}}>
      Vencio: {dateString}
    </Text>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 60,
    flexGrow: 1,
  },
  listContainer: {
    margin: 10,
  },
  infoContainer: {
    margin: 25,
    paddingBottom: 15,
    borderBottomWidth: 2,
  },
});

export default InviteInfo;
