import {Validator} from 'class-validator';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyPlaceholder from '../../components/empty.placeholder';
import {createInvite} from '../../requests/invite.requests';
import {useLoteSelector} from '../../storage/app.selectors';
import {Lote} from '../../storage/lotes.reducer';

const validator = new Validator();

const CreateInviteScreen = () => {
  const [lote_id, setLoteId] = useState(undefined);
  const [doc_id, setDoc] = useState('');
  const [docMessage, setDocMessage] = useState('');
  const [first_name, setFirstName] = useState('');
  const [firstNameMessage, setFirstNameMessage] = useState('');
  const [last_name, setLastName] = useState('');
  const [lastNameMessage, setLastNameMessage] = useState('');
  const lotes: Lote[] = useLoteSelector((state) => state.lotes);

  const create = () => {
    if (validator.isEmpty(first_name)) {
      setFirstNameMessage('Nombre Vacio');
    } else if (validator.isEmpty(last_name)) {
      setLastNameMessage('Apellido Vacio');
    } else if (validator.isEmpty(doc_id)) {
      setDocMessage('Documento Vacio');
    } else if (validator.isDefined(lote_id)) {
      createInvite({doc_id, first_name, last_name, lote_id});
    }
  };

  if (lotes.length == 0) {
    return <EmptyPlaceholder text="No tenes Lotes" />;
  }

  const onSelectedLoteChange = (lote) => setLoteId(lote);

  return (
    <SafeAreaView style={styles.container}>
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
        <Input
          placeholder=" Numero de Documento"
          autoCapitalize="none"
          onChangeText={setDoc}
          errorMessage={docMessage}
          leftIcon={<Icon name="id-card" size={24} color="black" />}
        />
        <SectionedMultiSelect
          items={loteListItems(lotes)}
          uniqueKey="id"
          subKey="lotes"
          selectText="Lote"
          showDropDowns={true}
          readOnlyHeadings={true}
          onSelectedItemsChange={onSelectedLoteChange}
          selectedItems={lote_id}
        />
      </View>
      <Button
        type="outline"
        icon={<Icon name="arrow-right" size={24} color="black" />}
        onPress={create}
      />
    </SafeAreaView>
  );
};

const loteListItems = (lotes: Lote[]) => {
  const barrios = [...new Set(lotes.map((lote) => lote.barrio_name))];
  let items = barrios.map((barrio) => {
    let lotesOfBarrio = lotes.filter((lote) => lote.barrio_name === barrio);
    return {
      name: barrio,
      id: lotesOfBarrio[0].barrio_id,
      lotes: lotesOfBarrio.map((lote) => {
        return {name: lote.lote_nickname, id: lote.lote_id};
      }),
    };
  });
  return items;
};

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {},
  );

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

export default CreateInviteScreen;
