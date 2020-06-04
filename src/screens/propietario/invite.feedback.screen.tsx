import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createInvite} from '../../requests/invite.requests';

const InviteFeedbackScreen = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [invite, setInvite] = useState(null);

  useEffect(() => {
    createInvite(route.params)
      .then((response) => response.data)
      .then((data) => {
        setLoading(false);
        setInvite(data);
      })
      .catch((error) => {
        console.debug(error);
        setLoading(false);
      });
  }, []);

  const next = () => navigation.popToTop();

  const share = () => {
    Share.open(shareOptions(invite))
      .then(next)
      .catch((error) => console.log(`Failed to share QR url: ${error}`));
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" animating={true} />
      ) : invite ? (
        <ShareInviteScreen onShare={share} />
      ) : (
        <FailureScreen onOk={next} />
      )}
    </SafeAreaView>
  );
};

const ShareInviteScreen = (props) => {
  return (
    <View>
      <Text h3 style={styles.textContainer}>
        Invitacion otorgada!
      </Text>
      <Button
        type="clear"
        icon={<Icon name="share-alt" size={60} color="black" />}
        onPress={props.onShare}
      />
    </View>
  );
};

const FailureScreen = (props) => {
  return (
    <View>
      <Text h4 style={styles.textContainer}>
        Ocurrio un error inesperado. Intente nuevamente
      </Text>
      <Button
        type="clear"
        title="Ok"
        onPress={props.onOk}
        titleStyle={{fontSize: 25}}
      />
    </View>
  );
};

const shareOptions = (invite) => {
  return {
    title: 'Compartir Invitacion',
    url: inviteToURL(invite),
  };
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexDirection: 'column',
    marginTop: '50%',
    alignItems: 'center',
    padding: 15,
  },
  textContainer: {
    marginBottom: 20,
  },
});

const inviteToURL = (invite) =>
  `192.168.0.88:3000/qr?i=${invite.id}&m=${invite.message}`;

export default InviteFeedbackScreen;
