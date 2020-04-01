import { View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Text, Button, Divider } from 'react-native-elements';
import React from 'react';


function LoginScreen(){

    return (
        <View>
          <Input
          placeholder=' Email'
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
          />
          <Button
          title='Registrar'
          type='clear'
          />
        </View>
    );
}

export default LoginScreen;