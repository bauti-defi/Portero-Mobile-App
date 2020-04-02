import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import React, { useState } from 'react';import {Validator} from "class-validator";
 
const validator = new Validator();

const axios = require('axios').default;

function LoginScreen({navigation}){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    function logIn(){
      if(!validator.isEmail(email) || validator.isEmpty(password)){
          setMessage('Email o Contrasena invalidad')
      }else{
        axios({
          method: 'post',
          url: `http://192.168.0.88:3500/propietario/login`,
          data: {email, password}
        })
      }
    }

    return (
        <View>
          <Input
          placeholder=' Email'
          onChangeText={setEmail}
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
          secureTextEntry={true}
          onChangeText={setPassword}
          errorMessage={message}
          leftIcon={
            <Icon
              name='lock'
              size={24}
              color='black'
            />
          }
          />
          <Button
          title='Ingresar'
          type='clear'
          onPress={logIn}
          />
          <Button
          title='Registrar'
          type='clear'
          onPress={() => navigation.navigate('register')}
          />
        </View>
    );
}

export default LoginScreen;