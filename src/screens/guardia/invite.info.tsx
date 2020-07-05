import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {inviteResponse} from '../../requests/invite.requests';
import GuestTile from './guest.tile';

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

  return (
    <InviteContext.Provider
      value={{approved, setApproved, rejected, setRejected}}>
      <ScrollView style={styles.screenContainer}>
        <View style={styles.infoContainer}>
          <Text h1>
            {p_fn} {p_ln}
          </Text>
          <Text h4>
            {l_street} {l_num}, {l_code}
          </Text>
        </View>
        <View style={styles.listContainer}>
          {guests.map((guest) => {
            return <GuestTile guest={guest} key={guest.g_id} />;
          })}
        </View>
      </ScrollView>
    </InviteContext.Provider>
  );
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
