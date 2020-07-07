import {Validator} from 'class-validator';
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Button, Input, Text} from 'react-native-elements';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useLoteSelector} from '../../storage/app.selectors';
import {Lote} from '../../storage/lotes.reducer';
import LoteSelector from './lote.selector';

const validator = new Validator();

type Guest = {
  first_name: string;
  last_name: string;
  doc_id: string;
};

const InviteCreationContext = React.createContext(null);

const CreateInviteScreen = ({navigation}) => {
  const [selectedLote, setSelectedLote] = useState(null);
  const [guests, setGuests] = useState([]);
  const [expDate, setExpDate] = useState(new Date());
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
    return expDate > new Date() && !!selectedLote && guests.length > 0;
  };

  const send = () => {
    console.log('send invite');
  };

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
          date={expDate}
          minimumDate={new Date()}
          mode="datetime"
          locale={'es_AR'}
          onDateChange={setExpDate}
        />
      </View>
      <InviteCreationContext.Provider value={{guests, setGuests}}>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <AddGuestCard onAddGuest={addGuest} />
            {guests.map((guest, i) => (
              <GuestBubble guest={guest} onRemove={removeGuest} key={i} />
            ))}
          </ScrollView>
        </View>
      </InviteCreationContext.Provider>
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

const AddGuestCard = ({onAddGuest}) => {
  const [doc_id, setDoc] = useState('');
  const [docMessage, setDocMessage] = useState('');
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');

  const onAdd = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id)) {
      setDocMessage('Documento Vacio');
    } else {
      onAddGuest({
        first_name,
        last_name,
        doc_id,
      });

      reset();
    }
  };

  const reset = () => {
    setFirstName('');
    setFirstNameMessage('');
    setLastName('');
    setLastNameMessage('');
    setDoc('');
    setDocMessage('');
  };

  return (
    <View style={styles.addGuestContainer}>
      <Input
        placeholder=" Nombre Completo"
        autoCapitalize="words"
        onChangeText={setFirstName}
        value={first_name}
        onFocus={() => setFirstNameMessage('')}
        errorMessage={firstNameMessage}
        containerStyle={styles.input}
      />
      <Input
        placeholder=" Apellido"
        autoCapitalize="words"
        value={last_name}
        onChangeText={setLastName}
        errorMessage={lastNameMessage}
        onFocus={() => setLastNameMessage('')}
        containerStyle={styles.input}
      />
      <Input
        placeholder=" Numero de Documento"
        autoCapitalize="none"
        onChangeText={setDoc}
        value={doc_id}
        errorMessage={docMessage}
        containerStyle={styles.input}
        onFocus={() => setDocMessage('')}
        leftIcon={<Icon name="id-card" size={24} color="black" />}
      />
      <Button
        containerStyle={styles.addButtonContainer}
        type="clear"
        title="Agregar"
        onPress={onAdd}
      />
    </View>
  );
};

const GuestBubble = ({guest, onRemove}) => {
  return (
    <View style={styles.bubbleContainer}>
      <Text h4 style={styles.bubbleText}>
        {guest.first_name} {guest.last_name[0]}.
      </Text>
      <TouchableOpacity onPress={() => onRemove(guest)}>
        <Icon name="times" size={24} color="red" />
      </TouchableOpacity>
    </View>
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
  bubbleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    margin: 5,
    padding: 1,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    borderWidth: 1,
  },
  bubbleText: {
    padding: 3,
  },
  addGuestContainer: {
    width: '94%',
    //elevation: 2,
    //borderRadius: 2,
    margin: '3%',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  addButtonContainer: {paddingBottom: 10},
  dateContainer: {
    margin: 20,
    alignItems: 'center',
  },
});

export default CreateInviteScreen;
