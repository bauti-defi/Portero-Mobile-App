import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {allowVisita} from '../../requests/invite.requests';

const InviteDetailsScreen = ({invite, onOk}) => {
  const [canEnter, setCanEnter] = useState(false);
  const [decided, setDecided] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    allowVisita(i_id)
      .then((response) => response.data)
      .then((allowed) => {
        setCanEnter(allowed);
        setLoading(false);
        setDecided(true);
      })
      .catch((error) => {
        console.log(`Error allowing visita\n${error}`);
        setCanEnter(false);
        setLoading(false);
        setDecided(true);
      });
  };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoChild}>
        <Text h1>
          {g_fn} {g_ln}
        </Text>
        <Text h4 style={styles.dniText}>
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
      {loading ? (
        <ActivityIndicator size={100} animating={true} style={styles.loader} />
      ) : decided ? (
        <ResponseText canEnter={canEnter} onOk={onOk} />
      ) : (
        <ButtonView onAllow={onAllow} onOk={onOk} />
      )}
    </View>
  );
};

const ResponseText = ({canEnter, onOk}) => {
  return (
    <View style={styles.responseFooter}>
      <Text h2 style={{color: canEnter ? 'green' : 'red'}}>
        {canEnter ? 'Visita Autorizada' : 'Visita Rechazada'}
      </Text>
      <Button
        title="Ok"
        type="clear"
        onPress={onOk}
        titleStyle={{fontSize: 20}}
      />
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
      <View style={styles.buttonViewFooter}>
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
  responseFooter: {
    padding: 25,
    justifyContent: 'space-evenly',
    flexDirection: 'column',
  },
  buttonViewFooter: {
    margin: 30,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  dniText: {
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
  loader: {
    padding: 60,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});

export default InviteDetailsScreen;
