import React, { useEffect } from 'react';
import { View } from "react-native";
import { Text } from "react-native-elements";
import { hasToken } from '../jwt.service';


function SplashScreen(){

    return (
        <View>
            <Text>LOADING.....</Text>
        </View>
    );
} 

export default SplashScreen;