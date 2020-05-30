import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {createInvite} from '../../requests/invite.requests';

const InviteFeedbackScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    createInvite(route.params)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setInvite(data);
      })
      .catch((error) => {
        console.debug(error);
        setLoading(false);
      });
  }, []);

  const next = () => navigation.popToTop();

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : (
        <RegistrationOutcome success={success} onPress={next} />
      )}
    </SafeAreaView>
  );
};

const RegistrationOutcome = (props) => {
  let message = props.success
    ? 'Invitacion otorgada!'
    : 'Ocurrio un error inesperado. Intente nuevamente.';
  return (
    <View>
      <Text h4>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
    </View>
  );
};

export default InviteFeedbackScreen;
