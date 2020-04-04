import React, { useEffect } from 'react';
import { Text, Button } from "react-native-elements";
import { View } from "react-native";
import { deleteToken } from '.././jwt.service';
import { useDispatch } from 'react-redux';
import { Action } from '../storage/dispatch.actions'


function HomeScreen({navigation}){

    const dispatch = useDispatch()


    async function logOut(){
        await deleteToken()
        dispatch({type: Action.DELETE_TOKEN})
    }
    

    return (
        <View>
            <Text>Logged in</Text>
            <Button 
                title='Log out'
                onPress={logOut}
            />
        </View>
    );
}

export default HomeScreen;