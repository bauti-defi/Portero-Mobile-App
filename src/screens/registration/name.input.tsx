import { View } from "react-native";
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import {Validator} from "class-validator";

const validator = new Validator();

function NameInput({navigation}){

    const [firstName, setFirstName] = useState('')
    const [firstNameMessage, setFirstNameMessage] = useState('')
    const [lastName, setLastName] = useState('')
    const [lastNameMessage, setLastNameMessage] = useState('')

    function next(){
        if(validator.isEmpty(firstName)){
            setFirstNameMessage('Nombre Vacio')
        }else if(validator.isEmpty(lastName)){
            setLastNameMessage('Apellido Vacio')
        }else{
            navigation.navigate('dni', {payload:{
                firstName,
                lastName
            }})
        }
    }

    return (

        <View>
            <Input 
            placeholder=' Nombre Completo'
            onChangeText={setFirstName}
            errorMessage={firstNameMessage}
            />
            <Input 
            placeholder=' Apellido'
            onChangeText={setLastName}
            errorMessage={lastNameMessage}
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

export default NameInput;