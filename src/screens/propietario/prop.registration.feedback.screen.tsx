import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {registerPropietario} from '../../requests/lotes.request';
import {LoteAction} from '../../storage/lotes.reducer';

const PropietarionRegistrationFeedbackScreen = ({navigation, route}) => {
  const [registered, setRegistered] = useState(undefined);
  const dispatch = useDispatch();

  const reloadLotes = (loading: boolean) =>
    dispatch({type: LoteAction.LOADING, loading});

  useEffect(() => {
    registerPropietario(route.params)
      .then((response) => response.data)
      .then((success) => {
        setRegistered(success);
        reloadLotes(true);
      })
      .catch((error) => {
        console.debug(error);
        setRegistered(false);
        reloadLotes(true);
      });
  }, []);

  return (
    <SafeAreaView>
      {typeof registered == 'undefined' ? (
        <ActivityIndicator size="large" animating={true} />
      ) : (
        <RegistrationOutcome
          success={registered}
          onPress={() => navigation.jumpTo('Lotes')}
        />
      )}
    </SafeAreaView>
  );
};

const RegistrationOutcome = (props) => {
  let message = props.success ? 'Associación exitosa!' : 'No se pudo associar';
  return (
    <View style={styles.container}>
      <Text h4>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PropietarionRegistrationFeedbackScreen;
