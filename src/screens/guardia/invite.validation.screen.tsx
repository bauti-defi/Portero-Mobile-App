import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {validateInvite} from '../../requests/invite.requests';
import {useSessionSelector} from '../../storage/app.selectors';
import InviteInfo from './invite.info';

const InviteValidationScreen = ({navigation, route}) => {
  const token: string = useSessionSelector((session) => session.token);
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    validateInvite(route.params.message, route.params.id)
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

  const close = () => navigation.jumpTo('Actividad');

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : invite ? (
        <InviteInfo invite={invite.info} guests={invite.guests} />
      ) : (
        <InvalidInviteScreen onOk={close} />
      )}
    </SafeAreaView>
  );
};

const InvalidInviteScreen = ({onOk}) => {
  return (
    <View>
      <Text h4>Invitacion Invalida!</Text>
      <Button type="clear" title="Ok" onPress={onOk} />
    </View>
  );
};

export default InviteValidationScreen;
