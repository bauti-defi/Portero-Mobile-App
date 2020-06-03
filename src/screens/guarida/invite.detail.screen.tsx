import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {allowVisita} from '../../requests/invite.requests';

const InviteDetailsScreen = ({invite, onOk}) => {
  const [decided, setDecided] = useState(false);

  const {
    i_id,
    g_fn,
    g_ln,
    g_doc,
    lote_name,
    lote_street,
    lote_num,
    lote_code,
    p_fn,
    p_ln,
  } = invite;

  const onAllow = () => {
    allowVisita(i_id).then((response) => response.data);
  };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoChild}>
        <Text h1>
          {g_fn} {g_ln}
        </Text>
        <Text h4 style={{color: 'red'}}>
          {g_doc}
        </Text>
      </View>
      <View style={styles.infoChild}>
        <Text h2>Destino</Text>
        <Text h4>{lote_name}</Text>
        <Text h4>
          {lote_street} {lote_num}, {lote_code}
        </Text>
      </View>
      <View style={styles.infoChild}>
        <Text h2>Propietario</Text>
        <Text h4>
          {p_fn} {p_ln}
        </Text>
      </View>
      {decided ? null : <ButtonView onAllow={onAllow} onOk={onOk} />}
    </View>
  );
};

const ButtonView = ({onAllow, onOk}) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <Button
          type="clear"
          icon={<Icon name="times" size={60} color="red" />}
          onPress={onOk}
        />
        <Button
          type="clear"
          icon={<Icon name="check" size={60} color="green" />}
          onPress={onAllow}
        />
      </View>
      <View style={styles.dniTextContainer}>
        <Text h2 style={styles.dniText}>
          Verifique DNI
        </Text>
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
  dniTextContainer: {
    margin: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dniText: {
    opacity: 0.6,
    color: 'red',
  },
  infoChild: {
    padding: 10,
    borderWidth: 2,
  },
  buttonContainer: {
    padding: 20,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default InviteDetailsScreen;
