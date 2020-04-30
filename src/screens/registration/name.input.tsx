import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

const year = new Date().getFullYear();

function NameInput({navigation}) {
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dateStyle, setDateStyle] = useState({});

  function next() {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (!validDate()) {
      setDateStyle({color: 'red'});
    } else {
      navigation.navigate('dni', {
        payload: {
          first_name,
          last_name,
          birth_date: date.toISOString(),
        },
      });
    }
  }

  const datePickerEvent = (e, date) => {
    setShowDatePicker(false);
    if (e.type === 'set') {
      setDate(date);
      setDateStyle({});
    }
  };

  const validDate = () => year - date.getFullYear() >= 6;

  const dateButtonTitle = () =>
    validDate() ? date.toDateString() : 'Fecha de Nacimiento';

  return (
    <View>
      <Input
        placeholder=" Nombre Completo"
        autoCapitalize="words"
        onChangeText={setFirstName}
        errorMessage={firstNameMessage}
      />
      <Input
        placeholder=" Apellido"
        autoCapitalize="words"
        onChangeText={setLastName}
        errorMessage={lastNameMessage}
      />
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

export default NameInput;
