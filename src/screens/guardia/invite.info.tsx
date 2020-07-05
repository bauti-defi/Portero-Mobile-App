import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import {FlatList} from 'react-native-gesture-handler';

const InviteInfo = ({invite, guests}) => {
  const navigation = useNavigation();

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
          renderItem={(guest) => renderGuest(guest, navigation)}
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

const renderGuest = ({item}, navigation) => {
  const onPress = () => navigation.navigate('Guest Details', item);

  return (
    <ListItem
      title={item.g_fn + ' ' + item.g_ln}
      titleStyle={{fontSize: 20}}
      onPress={onPress}
      bottomDivider
      chevron
    />
  );
};

export default InviteInfo;
