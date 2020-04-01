import React from 'react';
import { Header, Text } from 'react-native-elements';


function AppHeader(){

    return (
        <Header
            centerComponent={title()}
        />
    )
}

function title(){
    return <Text h3>IngresoFacil</Text>
}

export default AppHeader;