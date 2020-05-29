import React from 'react';
import {SafeAreaView} from 'react-native';
import EmptyList from '../../components/empty.list';

const InviteScreen = () => {
  return (
    <SafeAreaView style={{flexGrow: 1}}>
      <EmptyList />
    </SafeAreaView>
  );
};

export default InviteScreen;
