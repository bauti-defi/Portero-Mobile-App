import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {validateInvite} from '../../requests/invite.requests';

const InviteValidationScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    validateInvite(route.params)
      .then((response) => response.data)
      .then((invite) => {
        setInvite(invite);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Error validating invite\n${error}`);
      });
  }, []);

  const next = () => navigation.popToTop();

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : invite ? (
        <ValidInviteScreen invite={invite} onOk={next} />
      ) : (
        <InvalidInviteScreen onOk={next} />
      )}
    </SafeAreaView>
  );
};

const ValidInviteScreen = ({invite, onOk}) => {
  const {
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
  return (
    <View>
      <Text h1>
        Visita: {g_fn} {g_ln}
      </Text>
      <Text h4>DNI: {g_doc}</Text>
      <View>
        <Text h2>Destino: {lote_name}</Text>
        <Text h4>
          {lote_street} {lote_num}, {lote_code}
        </Text>
      </View>
      <View>
        <Text h2>
          Propietario: {p_fn} {p_ln}
        </Text>
      </View>
      <Button type="clear" title="Ok" onPress={onOk} />
    </View>
  );
};

const InvalidInviteScreen = ({onOk}) => {
  return (
    <View>
      <Text h4>INVITACION INVALIDA!</Text>
      <Button type="clear" title="Ok" onPress={onOk} />
    </View>
  );
};

export default InviteValidationScreen;
