import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView} from 'react-native';
import CreateButton from '../../components/create.button';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {useLoteSelector} from '../../storage/app.selectors';
import {Lote} from '../../storage/lotes.reducer';

const InviteScreen = () => {
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (lotes.length > 0) {
      navigation.setOptions({
        headerRight: (props) => (
          <CreateButton
            onPress={() => navigation.navigate('Crear Invitacion')}
          />
        ),
      });
    }
  }, []);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <EmptyPlaceholder />
    </SafeAreaView>
  );
};

export default InviteScreen;
