import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../../actions/login.actions';
import {registerGuardia} from '../../requests/guardia.requests';

const GuardiaRegistrationFeedbackScreen = ({navigation, route}) => {
  const [registered, setRegistered] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    registerGuardia(route.params)
      .then((response) => response.data)
      .then((success) => {
        setRegistered(success);
      })
      .catch((error) => {
        console.debug(error);
        setRegistered(false);
      });
  }, []);

  const onPress = () => {
    if (registered) {
      dispatch(logOutUser());
    } else {
      navigation.popToTop();
      navigation.jumpTo('Invitaciones');
    }
  };

  return (
    <SafeAreaView>
      {typeof registered == 'undefined' ? (
        <ActivityIndicator size="large" animating={true} />
      ) : (
        <RegistrationOutcome success={registered} onPress={onPress} />
      )}
    </SafeAreaView>
  );
};

const RegistrationOutcome = (props) => {
  let message = props.success
    ? 'Asociación exitosa! Por favor ingrese nuevamente para que los cambios tomen efecto.'
    : 'No se pudo associar... :(';
  return (
    <View>
      <Text h4>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
    </View>
  );
};

export default GuardiaRegistrationFeedbackScreen;
