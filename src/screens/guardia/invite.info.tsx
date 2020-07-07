import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inviteResponse} from '../../requests/invite.requests';
import GuestInsideTile from './guest.inside';
import GuestPendingTile from './guest.pending.tile';

export const InviteContext = React.createContext(null);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: l_name,
      headerRight: canSend()
        ? (props) => <SendInviteReponseButton onSend={send} />
        : null,
    });
  }, [approved, rejected]);

  const canSend = () => approved.length > 0 || rejected.length > 0;

  const send = () => {
    inviteResponse(id, approved as [], rejected as []);
    navigation.navigate('Actividad');
  };

  console.log(new Date(exp) < new Date());

  return (
    <InviteContext.Provider
      value={{
        approved,
        setApproved,
        rejected,
        setRejected,
        expired: isExpired(exp),
      }}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.infoContainer}>
          <Warning exp={exp} />
          <Text h1>
            {p_fn} {p_ln}
          </Text>
          <Text h4>
            {l_street} {l_num}, {l_code}
          </Text>
        </View>
        <View style={styles.listContainer}>
          {guests.map((guest) => {
            if (isPending(guest)) {
              return <GuestPendingTile guest={guest} key={guest.g_id} />;
            } else if (isInside(guest)) {
              return <GuestInsideTile guest={guest} key={guest.g_id} />;
            }
            return null;
          })}
        </View>
      </ScrollView>
    </InviteContext.Provider>
  );
};

const isExpired = (exp) => new Date(exp) < new Date(); //<

const wasRejected = (guest) => guest.g_rejected != null;
const hasExited = (guest) => guest.g_exited != null;

const isInside = (guest) =>
  guest.g_entered != null && !hasExited(guest) && !wasRejected(guest);

const isPending = (guest) =>
  !wasRejected(guest) && !isInside(guest) && !hasExited(guest);

const MESES = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const DIAS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

const Warning = ({exp}) => {
  if (isExpired(exp)) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    var date = new Date(exp);

    var dateString = `${DIAS[date.getDay()]}, ${
      MESES[date.getMonth()]
    } ${date.getDate()}, ${date.getUTCHours()}:${date.getUTCMinutes()}`;
    return (
      <Text h3 style={{color: 'red'}}>
        Vencio: {dateString}
      </Text>
    );
  }
  return null;
};

const SendInviteReponseButton = ({onSend}) => {
  return (
    <TouchableOpacity onPress={onSend} style={{paddingRight: 10}}>
      <Icon name="paper-plane" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
  },
  listContainer: {
    margin: 10,
    flex: 3,
  },
  infoContainer: {
    margin: 25,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 15,
    borderBottomWidth: 2,
  },
});

export default InviteInfo;
