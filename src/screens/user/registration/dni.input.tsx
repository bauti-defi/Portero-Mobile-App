import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';

const validator = new Validator();

function DocumentationInput({route, navigation}) {
  const {payload} = route.params;

  const [doc_id, setDoc] = useState('');
  const [doc_type, setDocType] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [message, setMessage] = useState('');

  function selectionChange(selection: any[]) {
    if (!!selection) {
      //is defined
      setSelectedItems(selection);
      setDocType(selection[0]);
    }
  }

  function next() {
    if (validator.isEmpty(doc_id) || !validator.isDefined(doc_type)) {
      setMessage('Documento Vacio');
    } else {
      navigation.navigate('account', {
        payload: {
          ...payload,
          doc_id,
          doc_type,
        },
      });
    }
  }

  return (
    <View>
      <SectionedMultiSelect
        items={docTypes}
        uniqueKey="id"
        selectText="Typo de DNI"
        showCancelButton={true}
        showDropDowns={true}
        onSelectedItemsChange={selectionChange}
        selectedItems={selectedItems}
        single={true}
      />
      <Input
        placeholder=" Numero de Documento"
        autoCapitalize="none"
        onChangeText={setDoc}
        disabled={selectedItems.length == 0}
        errorMessage={message}
        leftIcon={<Icon name="id-card" size={24} color="black" />}
      />
      <Button
        type="outline"
        icon={<Icon name="arrow-right" size={24} color="black" />}
        onPress={next}
      />
    </View>
  );
}

const docTypes = [
  {
    name: 'DNI ARG',
    id: 0,
  },
  {
    name: 'Licencia ARG',
    id: 1,
  },
];

export default DocumentationInput;
