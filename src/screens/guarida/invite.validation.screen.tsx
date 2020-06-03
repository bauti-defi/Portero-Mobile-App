import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {validateInvite} from '../../requests/invite.requests';
import InviteDetailsScreen from './invite.detail.screen';

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

  const close = () => navigation.jumpTo('Activity Feed');

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : invite ? (
        <InviteDetailsScreen invite={invite} onOk={close} />
      ) : (
        <InvalidInviteScreen onOk={close} />
      )}
    </SafeAreaView>
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
