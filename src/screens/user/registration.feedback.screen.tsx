import React, {useEffect} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../actions/registration.actions';
import {useRegistrationReducer} from '../../storage/app.selectors';

const RegistrationFeedbackScreen = ({navigation, route}) => {
  const {attempting, successful, failed} = useRegistrationReducer(
    (state) => state,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    send();
  }, []);

  const send = () => dispatch(registerUser(route.params));

  return (
    <SafeAreaView style={styles.container}>
      {attempting ? (
        <ActivityIndicator size={100} animating={true} />
      ) : successful ? (
        <SuccessScreen onOk={() => navigation.navigate('login')} />
      ) : (
        <FailureScreen onOk={() => navigation.navigate('login')} />
      )}
    </SafeAreaView>
  );
};

const SuccessScreen = ({onOk}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="thumbs-up" size={90} color="green" />
      <Text
        h2
        style={{marginBottom: 20}}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Apertura de cuenta exitosa!
      </Text>
      <Button
        type="clear"
        title="Ok"
        onPress={onOk}
        titleStyle={{fontSize: 25}}
      />
    </View>
  );
};

const FailureScreen = ({onOk}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="exclamation-circle" size={90} color="black" />
      <Text
        h3
        style={{marginBottom: 20}}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Ocurrio un error inesperado
      </Text>
      <Button
        type="clear"
        title="Ok"
        onPress={onOk}
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
    padding: 15,
  },
});

export default RegistrationFeedbackScreen;
