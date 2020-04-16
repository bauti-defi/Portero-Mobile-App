import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {associatePropietarioToLote} from '../../requests/lotes.request';

function ConfirmationScreen({navigation, route}) {
  const [loading, setLoading] = useState(true);
  const [associated, setAssociated] = useState(false);

  useEffect(() => {
    async function send() {
      await associatePropietarioToLote(route.params)
        .then((response) => response.data)
        .then((associated) => {
          setAssociated(associated);
          setLoading(false);
        })
        .catch((error) => {
          setAssociated(false);
          setLoading(false);
        });
    }

    send();
  }, []);

  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" animating={loading} />
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
