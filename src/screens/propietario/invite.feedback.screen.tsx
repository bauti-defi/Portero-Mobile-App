import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch} from 'react-redux';
import {
  useInviteSelector,
  useSessionSelector,
} from '../../storage/app.selectors';
import {createNewInvite} from '../../storage/invite.actions';

const InviteFeedbackScreen = ({navigation, route}) => {
  const token: string = useSessionSelector((session) => session.token);
  const {isSending, inviteToShare} = useInviteSelector((invite) => invite);
  const dispatch = useDispatch();

  useEffect(() => {
    create();
  }, []);

  const next = () => navigation.popToTop();

  const create = () => dispatch(createNewInvite(token, route.params));

  const share = () => {
    Share.open(shareOptions(inviteToShare))
      .then(next)
      .catch((error) => console.log(`Failed to share QR url: ${error}`));
  };

  return (
    <SafeAreaView style={styles.container}>
      {inviteToShare ? (
        <ShareInviteScreen onShare={share} />
      ) : isSending ? (
        <ActivityIndicator size={100} animating={true} />
      ) : (
        <FailureScreen onRetry={create} />
      )}
    </SafeAreaView>
  );
};

const ShareInviteScreen = ({onShare}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text
        h2
        style={{marginBottom: 20}}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Invitacion otorgada!
      </Text>
      <TouchableOpacity onPress={onShare} style={{alignItems: 'center'}}>
        <Icon name="whatsapp" size={70} color="green" />
        <Text
          h4
          style={{color: 'green'}}
          adjustsFontSizeToFit={true}
          numberOfLines={1}>
          Compartir con WhatsApp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const FailureScreen = ({onRetry}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Icon name="exclamation-circle" size={90} color="black" />
      <Text
        h3
        style={{marginBottom: 20}}
        adjustsFontSizeToFit={true}
        numberOfLines={1}>
        Ocurrio un error inesperado
      </Text>
      <Button
        type="clear"
        title="Volver a Intentar"
        onPress={onRetry}
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
    padding: 15,
  },
});

const inviteToURL = (invite) =>
  `192.168.0.88:3000/qr?i=${invite.id}&m=${invite.message}`;

export default InviteFeedbackScreen;
