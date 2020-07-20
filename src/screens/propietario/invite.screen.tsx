import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import {ListItem} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import CreateButton from '../../components/create.button';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {format} from '../../date.formatter';
import {getInvites} from '../../events/invite.events';
import {useInviteSelector, useLoteSelector} from '../../storage/app.selectors';
import {Guest, Invite} from '../../storage/invite.module';
import {Lote} from '../../storage/lote.module';

const InviteScreen = () => {
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);
  const {invites, guests, isLoading} = useInviteSelector((state) => state);
  const dispatch = useDispatch();
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
  }, [lotes]);

  const getData = () => compose(invites, guests, lotes).sort(sortByMostRecent);

  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <FlatList
        keyExtractor={keyExtractor}
        data={getData()}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        refreshing={isLoading}
        onRefresh={() => dispatch(getInvites())}
        extraData={getData()}
        renderItem={renderItem}
        ListEmptyComponent={EmptyPlaceholder}
      />
    </SafeAreaView>
  );
};

const compose = (invites: Invite[], guests: Guest[], lotes: Lote[]) => {
  let composed = [];
  for (let i = 0; i < invites.length; i++) {
    let lote: Lote = lotes.find((l) => l.lote_id == invites[i].lote_id);
    let guestList: Guest[] = guests.filter(
      (guest) => guest.invite_id == invites[i].id,
    );
    if (lote && guestList.length > 0) {
      composed.push({
        ...invites[i],
        creation_date: new Date(invites[i].creation_date),
        lote_name: lote.lote_name,
        lote_nickname: lote.lote_nickname,
        barrio_name: lote.barrio_name,
        guestList,
      });
    }
  }
  return composed;
};

const sortByMostRecent = (a, b) =>
  a.creation_date <= b.creation_date ? 1 : -1;

const keyExtractor = (invite, index) => invite.id;

const renderItem = ({item}) => (
  <ListItem
    title={`${item.lote_nickname} en ${item.barrio_name}`}
    subtitle={format(item.exp)}
    badge={{value: item.guestList.length, textStyle: {fontSize: 12}}}
    titleStyle={{fontSize: 20, paddingBottom: 5}}
    bottomDivider
  />
);

export default InviteScreen;
