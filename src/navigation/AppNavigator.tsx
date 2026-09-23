import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import {colors} from '../styles/theme';
import ListaAlarmasScreen from '../screens/ListaAlarmas';
import NuevaAlarmaScreen from '../screens/NuevaAlarma';
import FrecuenciaScreen from '../screens/Frecuencia';
import RecurrenciaScreen from '../screens/Recurrencia';
import DetalleAlarmaScreen from '../screens/DetalleAlarma';
import SelectorContactoScreen from '../screens/SelectorContacto';
import InvitacionEnviadaScreen from '../screens/InvitacionEnviada';
import ConfirmarAccionScreen from '../screens/ConfirmarAccion';
import LimiteAlcanzadoScreen from '../screens/LimiteAlcanzado';
import AlertaPantallaCompletaScreen from '../screens/AlertaPantallaCompleta';
import NotificacionScreen from '../screens/Notificacion';
import AlarmaCreadaScreen from '../screens/AlarmaCreada';

const Stack = createNativeStackNavigator<RootStackParamList>();

const DARK_BG = '#0D0B0F';

// Android dibuja borde a borde: este layout reserva el área de la barra de
// estado / navegación y le da el color que tiene el diseño en cada pantalla.
function ScreenLayout({
  routeName,
  children,
}: {
  routeName: string;
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  if (routeName === 'AlarmaCreada') {
    // Popup transparente: la lista de alarmas se ve detrás.
    return <>{children}</>;
  }
  const dark = routeName === 'AlertaPantallaCompleta';
  const topColor = dark ? DARK_BG : colors.surfaceMuted;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: dark ? DARK_BG : colors.background,
        paddingBottom: insets.bottom,
      }}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={{height: insets.top, backgroundColor: topColor}} />
      {children}
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ListaAlarmas"
      screenOptions={{headerShown: false}}
      screenLayout={({route, children}) => (
        <ScreenLayout routeName={route.name}>{children}</ScreenLayout>
      )}>
      <Stack.Screen name="ListaAlarmas" component={ListaAlarmasScreen} />
      <Stack.Screen name="NuevaAlarma" component={NuevaAlarmaScreen} />
      <Stack.Screen name="Frecuencia" component={FrecuenciaScreen} />
      <Stack.Screen name="Recurrencia" component={RecurrenciaScreen} />
      <Stack.Screen name="DetalleAlarma" component={DetalleAlarmaScreen} />
      <Stack.Screen
        name="SelectorContacto"
        component={SelectorContactoScreen}
      />
      <Stack.Screen
        name="InvitacionEnviada"
        component={InvitacionEnviadaScreen}
      />
      <Stack.Screen name="ConfirmarAccion" component={ConfirmarAccionScreen} />
      <Stack.Screen name="LimiteAlcanzado" component={LimiteAlcanzadoScreen} />
      <Stack.Screen
        name="AlertaPantallaCompleta"
        component={AlertaPantallaCompletaScreen}
      />
      <Stack.Screen name="Notificacion" component={NotificacionScreen} />
      <Stack.Screen
        name="AlarmaCreada"
        component={AlarmaCreadaScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          contentStyle: {backgroundColor: 'transparent'},
        }}
      />
    </Stack.Navigator>
  );
}
