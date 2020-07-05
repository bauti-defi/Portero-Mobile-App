import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

const InviteInfo = ({invite, guests}) => {
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
        <Text h2>Invitados</Text>
        <FlatList
          data={guests}
          renderItem={renderGuest}
          keyExtractor={keyExtractor}
        />
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
  infoChild: {
    padding: 10,
    borderBottomWidth: 2,
  },
  listContainer: {
    margin: 10,
  },
});

const keyExtractor = (guest, index) => guest.g_id;

const renderGuest = ({item}) => {
  return (
    <ListItem
      title={item.g_fn + ' ' + item.g_ln}
      subtitle={item.g_doc}
      bottomDivider
      chevron
    />
  );
};

export default InviteInfo;
