import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getInvites} from '../../actions/invite.actions';
import DrawerContent from '../../components/home.drawer.content';
import {getAllLotes} from '../../requests/lotes.request';
import {useSessionSelector} from '../../storage/app.selectors';
import {LoteAction} from '../../storage/storage.actions';
import InviteNavigator from './invite.navigator';
import LotesNavigator from './lotes.navigator';
import PropietarioQRScannerNavigator from './qr.scanner.navigator';

const Drawer = createDrawerNavigator();

const PropietarioNavigator = () => {
  const token: string = useSessionSelector((session) => session.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(token));
  }, []);

  return (
    <Drawer.Navigator
      lazy={true}
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName="Invitaciones">
      <Drawer.Screen name="Invitaciones" component={InviteNavigator} />
      <Drawer.Screen name="Lotes" component={LotesNavigator} />
      <Drawer.Screen
        name="Escanear QR"
        component={PropietarioQRScannerNavigator}
        options={{unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};

const fetchData = (token) => (dispatch) => {
  console.debug('Loading propietario data');

  dispatch({type: LoteAction.START_LOADING, loading: true});

  return getAllLotes(token)
    .then((allLotes) => {
      dispatch({type: LoteAction.FINISHED_LOADING, lotes: allLotes || []});
    })
    .then(dispatch(getInvites(token)));
};

export default PropietarioNavigator;
