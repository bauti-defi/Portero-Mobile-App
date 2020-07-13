import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {fetchLotes} from '../../actions/lote.actions';
import {registerPropietario} from '../../requests/lotes.request';
import {useSessionSelector} from '../../storage/app.selectors';

const PropietarionRegistrationFeedbackScreen = ({navigation, route}) => {
  const [response, setResponse] = useState({loading: true, registered: false});
  const token: string = useSessionSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    registerPropietario(token, route.params)
      .then((response) => response.data)
      .then((success) => {
        setResponse({loading: false, registered: success});
        dispatch(fetchLotes(token));
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
      ) : (
        <RegistrationOutcome
          success={response.registered}
          onPress={() => navigation.jumpTo('Lotes')}
        />
      )}
    </SafeAreaView>
  );
};

const RegistrationOutcome = (props) => {
  let message = props.success ? 'Associación exitosa!' : 'No se pudo associar';
  return (
    <View>
      <Text h3>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
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
});

export default PropietarionRegistrationFeedbackScreen;
