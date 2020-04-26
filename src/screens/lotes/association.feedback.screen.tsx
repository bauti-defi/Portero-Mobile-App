import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {associatePropietarioToLote} from '../../requests/lotes.request';
import {LoteAction} from '../../storage/lotes.reducer';

function FeedbackScreen({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [associated, setAssociated] = useState(undefined);
  const dispatch = useDispatch();

  const reloadLotes = (loading: boolean) =>
    dispatch({type: LoteAction.LOADING, loading});

  useEffect(() => {
    associatePropietarioToLote(route.params)
      .then((response) => response.data)
      .then((associated) => {
        setAssociated(associated);
      })
      .catch((error) => {
        setAssociated(false);
      });

    reloadLotes(true);
  }, []);

  return (
    <SafeAreaView>
      {typeof associated == 'undefined' ? (
        <ActivityIndicator size="large" animating={true} />
      ) : (
        <AssociationOutcome
          success={associated}
          onPress={navigation.popToTop}
        />
      )}
    </SafeAreaView>
  );
}

function AssociationOutcome(props) {
  let message = props.success ? 'Associación exitosa!' : 'No se pudo associar';
  return (
    <View>
      <Text h4>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
    </View>
  );
}

export default FeedbackScreen;
