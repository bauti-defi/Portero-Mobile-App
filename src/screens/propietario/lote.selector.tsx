import React, {useState} from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Lote} from 'src/storage/lotes.reducer';

const LoteSelector = ({lotes, setSelectedLote}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const onSelectedLoteChange = (selection) => {
    if (!!selection) {
      setSelectedItems(selection);
      setSelectedLote(selection[0]);
    }
  };

  return (
    <SectionedMultiSelect
      items={loteListItems(lotes)}
      uniqueKey="id"
      subKey="lotes"
      selectText="Lote"
      searchPlaceholderText="Buscar lote..."
      confirmText="Confirmar"
      single={true}
      expandDropDowns={true}
      showDropDowns={true}
      readOnlyHeadings={true}
      onSelectedItemsChange={onSelectedLoteChange}
      selectedItems={selectedItems}
    />
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

export default LoteSelector;
