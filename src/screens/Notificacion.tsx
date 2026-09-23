import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';
import Card from '../components/Card';
import AppButton from '../components/AppButton';
import CroppedImage from '../components/CroppedImage';

type Props = NativeStackScreenProps<RootStackParamList, 'Notificacion'>;

export default function NotificacionScreen({navigation}: Props) {
  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card radius={20} style={styles.pushBanner}>
          <View style={styles.pushHeader}>
            <View style={styles.appIdentity}>
              <Icon name="bell-outline" size={20} color={colors.warmPeach} />
              <Text style={styles.appName}>Cronos Alarms</Text>
            </View>
            <Text style={styles.pushTime}>ahora</Text>
          </View>
          <Text style={styles.pushTitle}>Mamá no ha confirmado su alarma</Text>
          <Text style={styles.pushBody}>
            La alarma 'Pastilla presión' programada para las 07:00 AM no ha
            sido respondida aún. Ponte en contacto con ella.
          </Text>
        </Card>

        <Card radius={24} style={styles.landingCard}>
          <CroppedImage
            source={require('../assets/images/p13_bell.png')}
            width={59}
            height={62}
            crop={{w: 180.34, h: 172.58, left: -42.13, top: -36.56}}
            style={styles.bellImage}
          />
          <Text style={styles.landingTitle}>Notificaciones de seguridad</Text>
          <Text style={styles.landingText}>
            Las notificaciones Push te mantienen al tanto de tus alarmas en
            tiempo real. Configura alertas para recibir SMS si no hay
            conexión a Internet.
          </Text>
          <AppButton
            label="Configurar alertas SMS"
            fullWidth={false}
            onPress={navigation.goBack}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 26,
    paddingTop: 16,
    gap: 20,
  },
  pushBanner: {
    padding: 15,
    gap: 8,
    elevation: 4,
    shadowColor: '#000000',
  },
  pushHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appName: {
    fontFamily: fonts.nunitoBold,
    fontSize: 13,
    color: colors.warmPeach,
  },
  pushTime: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  pushTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 15,
    color: colors.textMuted,
  },
  pushBody: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    lineHeight: 20,
    color: '#9E9E9E',
  },
  landingCard: {
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  bellImage: {
    width: 59,
    height: 62,
  },
  landingTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  landingText: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
