import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, View} from 'react-native';
import {Button, Text} from 'react-native-elements';
import Share from 'react-native-share';
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
    <SafeAreaView>
      {loading && <ActivityIndicator size="large" animating={true} />}
      {!loading &&
        (invite ? (
          <ShareInviteScreen onShare={share} />
        ) : (
          <FailureScreen onOk={next} />
        ))}
    </SafeAreaView>
  );
};

const ShareInviteScreen = (props) => {
  return (
    <View>
      <Text h4>Invitacion otorgada!</Text>
      <Button type="clear" title="Compartir" onPress={props.onShare} />
    </View>
  );
};

const FailureScreen = (props) => {
  return (
    <View>
      <Text h4>Ocurrio un error inesperado. Intente nuevamente</Text>
      <Button type="clear" title="Ok" onPress={props.onOk} />
    </View>
  );
};

const shareOptions = (invite) => {
  return {
    title: 'Compartir Invitacion',
    url: inviteToURL(invite),
  };
};

const inviteToURL = (invite) =>
  `192.168.0.88:3000/qr?id=${invite.id}&message=${invite.message}`;

export default InviteFeedbackScreen;
