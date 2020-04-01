import { View } from "react-native";
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {Validator} from "class-validator";

const validator = new Validator();

function DocumentationInput({route, navigation}){

    const {payload} = route.params

    const [doc, setDoc] = useState('')
    const [docType, setDocType] = useState()
    const [selectedItems, setSelectedItems] = useState([])
    const [message, setMessage] = useState('')

    function selectionChange(selection:[]){
        if(!!selection){ //is defined
            setSelectedItems(selection)
            setDocType(selection[0])
        }
    }

    function next(){
        if(validator.isEmpty(doc) || !validator.isDefined(docType)){
            setMessage('Documento Vacio')
        }else{
            navigation.navigate('account', {payload: {
                ...payload,
                doc,
                docType
            }})
        }
    }

    return (
        <View>
            <SectionedMultiSelect 
                items={docTypes}
                uniqueKey='id'
                selectText='Typo de DNI'
                showCancelButton={true}
                showDropDowns={true}
                onSelectedItemsChange={selectionChange}
                selectedItems={selectedItems}
                single={true}
            />
            <Input 
            placeholder=' Numero de Documento'
            onChangeText={setDoc}
            disabled={selectedItems.length==0}
            errorMessage={message}
            leftIcon={
                <Icon
                name='id-card'
                size={24}
                color='black'
            />
            }
            />
            <Button 
            type='outline'
            icon={
                <Icon
                name='arrow-right'
                size={24}
                color='black'
            />
            }
            onPress={next}
            />
        </View>
    );
}

const docTypes = [
    {
        name: 'DNI ARG',
        id:0,
    },
    {
        name: 'Licencia ARG',
        id:1
    }
]

export default DocumentationInput;
