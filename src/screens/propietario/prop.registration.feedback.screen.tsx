import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {logOutUser} from '../../actions/login.actions';
import {getAllLotes} from '../../actions/lote.actions';
import {registerPropietario} from '../../requests/lotes.request';
import {useSessionSelector, useUserSelector} from '../../storage/app.selectors';
import {AccountType} from '../../storage/user.reducer';

const PropietarionRegistrationFeedbackScreen = ({navigation, route}) => {
  const [response, setResponse] = useState({loading: true, registered: false});
  const token: string = useSessionSelector((state) => state.token);
  const accountType: AccountType = useUserSelector((user) => user.acc_type);
  const dispatch = useDispatch();

  useEffect(() => {
    registerPropietario(token, route.params)
      .then((response) => response.data)
      .then((success) => {
        setResponse({loading: false, registered: success});
        if (accountType == AccountType.PROPIETARIO) {
          dispatch(getAllLotes(token));
        }
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
        <SuccessScreen
          onOk={() => navigation.jumpTo('Lotes')}
          onLogOut={() => dispatch(logOutUser)}
          accountType={accountType}
        />
      ) : (
        <FailureScreen accountType={accountType} navigation={navigation} />
      )}
    </SafeAreaView>
  );
};

const SuccessScreen = ({onOk, onLogOut, accountType}) => {
  const isPropietario = accountType == AccountType.PROPIETARIO;

  const onAction = isPropietario ? onOk : onLogOut;
  const buttonTitle = isPropietario ? 'Listo' : 'Salir';

  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="thumbs-up" size={90} color="green" />
      <Text
        h2
        style={styles.text}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Asociación exitosa!
      </Text>
      {isPropietario && (
        <Text
          h2
          adjustsFontSizeToFit={true}
          numberOfLines={2}
          style={styles.text}>
          Por favor ingrese nuevamente para que los cambios tomen efecto.
        </Text>
      )}
      <Button
        type="clear"
        title={buttonTitle}
        onPress={onAction}
        titleStyle={{fontSize: 25}}
      />
    </View>
  );
};

const FailureScreen = ({navigation, accountType}) => {
  const isPropietario = accountType == AccountType.PROPIETARIO;
  const homePath = isPropietario ? 'Lotes' : 'Ayuda';

  const goToHome = () => navigation.navigate(homePath);

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
        onPress={goToHome}
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

export default PropietarionRegistrationFeedbackScreen;
