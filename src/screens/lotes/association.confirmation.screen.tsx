import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {associatePropietarioToLote} from '../../requests/lotes.request';
import {LoteAction} from '../../storage/lotes.reducer';

function ConfirmationScreen({navigation, route}) {
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
  let message = props.success
    ? 'Associacion fue exitosa!'
    : 'No se pudo associar';
  return (
    <View>
      <Text>{message}</Text>
      <Button type="clear" title="Ok" onPress={props.onPress} />
    </View>
  );
}

export default ConfirmationScreen;
