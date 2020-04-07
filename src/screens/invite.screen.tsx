import React, { useEffect } from 'react';
import { Text, Button } from "react-native-elements";
import { View } from "react-native";
import { deleteToken } from '../jwt.service';
import { useDispatch } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Action } from '../storage/dispatch.actions'


function InviteScreen(){
    return(
        <View>
            <Text>Invite screen</Text>
        </View>
    )
}

export default InviteScreen;