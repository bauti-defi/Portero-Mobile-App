import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Text} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useLoteSelector} from '../../storage/app.selectors';
import {Lote} from '../../storage/lotes.reducer';
import AddGuestCard from './add.guest';
import GuestBubble from './guest.bubble';
import LoteSelector from './lote.selector';

type Guest = {
  first_name: string;
  last_name: string;
  doc_id: string;
};

const CreateInviteScreen = ({navigation}) => {
  const [selectedLote, setSelectedLote] = useState(null);
  const [guests, setGuests] = useState([]);
  const [exp, setExp] = useState(new Date());
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => (
        <LoteSelector lotes={lotes} setSelectedLote={setSelectedLote} />
      ),
      headerTitleContainerStyle: {
        marginLeft: '15%',
      },
      headerRight: canSend()
        ? (props) => <SendInviteButton onSend={send} />
        : null,
    });
  });

  const canSend = () => {
    return exp > new Date() && !!selectedLote && guests.length > 0;
  };

  const send = () =>
    navigation.navigate('Creation Feedback', {
      lote_id: selectedLote,
      exp,
      guests,
    });

  const addGuest = (guest: Guest) => {
    setGuests([...guests, guest]);
  };

  const removeGuest = (guest: Guest) => {
    setGuests([
      ...guests.filter(
        (g) =>
          g.first_name != guest.first_name &&
          g.last_name != guest.last_name &&
          g.doc_id != guest.doc_id,
      ),
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateContainer}>
        <Text h3>Vence</Text>
        <DatePicker
          date={exp}
          minimumDate={new Date()}
          mode="datetime"
          locale={'es_AR'}
          onDateChange={setExp}
        />
      </View>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <AddGuestCard onAddGuest={addGuest} />
          {guests.map((guest, i) => (
            <GuestBubble guest={guest} onRemove={removeGuest} key={i} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const SendInviteButton = ({onSend}) => {
  return (
    <TouchableOpacity onPress={onSend} style={{paddingRight: 10}}>
      <Icon name="paper-plane" size={30} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dateContainer: {
    margin: 20,
    alignItems: 'center',
  },
});

export default CreateInviteScreen;
