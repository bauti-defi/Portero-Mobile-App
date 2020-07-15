import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../../actions/login.actions';
import {registerGuardia} from '../../requests/guardia.requests';
import {useSessionSelector, useUserSelector} from '../../storage/app.selectors';
import {AccountType} from '../../storage/user.reducer';

const GuardiaRegistrationFeedbackScreen = ({navigation, route}) => {
  const [response, setResponse] = useState({loading: true, registered: false});
  const token: string = useSessionSelector((state) => state.token);
  const accountType: AccountType = useUserSelector((user) => user.acc_type);

  useEffect(() => {
    if (accountType != AccountType.USER) {
      setResponse({loading: false, registered: false});
      return;
    }
    registerGuardia(token, route.params)
      .then((response) => response.data)
      .then((success) => {
        setResponse({loading: false, registered: success});
      })
      .catch((error) => {
        console.debug(error);
        setResponse({loading: false, registered: false});
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {response.loading ? (
        <ActivityIndicator size={100} animating={true} />
      ) : response.registered ? (
        <SuccessScreen />
      ) : (
        <FailureScreen navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const SuccessScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="thumbs-up" size={90} color="green" />
      <Text
        h2
        style={styles.text}
        adjustsFontSizeToFit={true}
        numberOfLines={3}>
        Asociación exitosa! Por favor ingrese nuevamente para que los cambios
        tomen efecto.
      </Text>
      <Button
        type="clear"
        title="Salir"
        onPress={() => dispatch(logOutUser())}
        titleStyle={{fontSize: 25}}
      />
    </View>
  );
};

const FailureScreen = ({navigation}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="exclamation-circle" size={90} color="black" />
      <Text
        h3
        style={styles.text}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Ocurrio un error inesperado
      </Text>
      <Button
        type="clear"
        title="Ok"
        onPress={() => navigation.jumpTo('Información')}
        titleStyle={{fontSize: 25}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    marginTop: '50%',
    alignItems: 'center',
  },
  text: {marginBottom: 20, textAlign: 'center'},
});

export default GuardiaRegistrationFeedbackScreen;
