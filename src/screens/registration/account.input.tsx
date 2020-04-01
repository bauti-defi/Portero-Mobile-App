import { View } from "react-native";
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements'
import {Validator} from "class-validator";

const validator = new Validator();

function AccountInput({route, navigation}){

    const {payload} = route.params

    const [email, setEmail] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
     
    function next(){
        if(!validator.isEmail(email)){
            setEmailMessage('Email Invalido')
        }else if(validator.isEmpty(password)){
            setPasswordMessage('Contrasena Invalida')
        }else if(password !== confirmPassword){
            setPasswordMessage('Contrasenas distintas')
        }else{
            navigation.navigate('login', {payload: {
                ...payload,
                email, 
                password
            }})
        }
    }

    return (
        <View>
            <Input
            placeholder=' Email'
            onChangeText={setEmail}
            errorMessage={emailMessage}
            leftIcon={
                <Icon
                name='envelope'
                size={24}
                color='black'
                />
          }
          />
          <Input
            placeholder=' Contrasena'
            onChangeText={setPassword}
            secureTextEntry={true}
            leftIcon={
                <Icon
                name='lock'
                size={24}
                color='black'
                />
            }
          />
          <Input
            placeholder=' Repetir Contrasena'
            secureTextEntry={true}
            onChangeText={setConfirmPassword}
            errorMessage={passwordMessage}
            leftIcon={
                <Icon
                name='lock'
                size={24}
                color='black'
                />
            }
          />
          <Button 
            type='outline'
            title='Registrar'
            onPress={next}
            />
        </View>
    );
}

export default AccountInput;