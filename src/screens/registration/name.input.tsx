import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const today = new Date();

function NameInput({navigation}) {
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(today);
  const [dateStyle, setDateStyle] = useState({});

  const next = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (!validDate(date)) {
      setDateStyle({color: 'red'});
    } else {
      navigation.push('dni', {
        payload: {
          first_name,
          last_name,
          birth_date: date.toISOString(),
        },
      });
    }
  };

  const datePickerEvent = (e, date) => {
    setDate(date);
    if (date && validDate(date)) {
      setDateStyle({});
    } else {
      setDateStyle({color: 'red'});
    }
    setShowDatePicker(false);
  };

  const validDate = (date: Date) =>
    today.getFullYear() - date.getFullYear() >= 6;

  const dateButtonTitle = () =>
    date !== today ? date.toDateString() : 'Fecha de Nacimiento';

  return (
    <View style={styles.container}>
      <View>
        <Input
          placeholder=" Nombre Completo"
          autoCapitalize="words"
          onChangeText={setFirstName}
          errorMessage={firstNameMessage}
          containerStyle={styles.input}
        />
        <Input
          placeholder=" Apellido"
          autoCapitalize="words"
          onChangeText={setLastName}
          errorMessage={lastNameMessage}
          containerStyle={styles.input}
        />
      </View>
      {showDatePicker ? (
        <RNDateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={datePickerEvent}
        />
      ) : (
        <Button
          type="outline"
          titleStyle={dateStyle}
          title={dateButtonTitle()}
          onPress={(e) => setShowDatePicker(true)}
        />
      )}

      <Button
        type="outline"
        icon={<Icon name="arrow-right" size={24} color="black" />}
        onPress={next}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    justifyContent: 'space-around',
  },
  input: {
    paddingBottom: 30,
  },
});

export default NameInput;
