import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import CroppedImage from '../components/CroppedImage';
import AppButton from '../components/AppButton';
import Card from '../components/Card';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmarAccion'>;

export default function ConfirmarAccionScreen({navigation}: Props) {
  const goHome = () => navigation.popToTop();

  return (
    <View style={styles.screen}>
      <AppBar title="Confirmar" onBack={navigation.goBack} showAvatar={false} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Card radius={24} style={styles.successCard}>
          <CroppedImage
            source={require('../assets/images/p11_success_plant.png')}
            width={160}
            height={180}
            crop={{w: 160, h: 142.22, left: -30, top: -25.56}}
            style={styles.successImage}
          />
          <Text style={styles.successTitle}>¡Alarma marcada como cumplida!</Text>
        </Card>

        <View style={styles.notificationBanner}>
          <CroppedImage
            source={require('../assets/images/p11_bell_small.png')}
            width={26}
            height={25}
            crop={{w: 173.76, h: 176.45, left: -39.54, top: -44.68}}
          />
          <Text style={styles.notificationText}>
            Se notificó a Mamá y a ti en tu celular.
          </Text>
        </View>

        <View style={styles.suggestionCard}>
          <Text style={styles.suggestionTitle}>¿Necesitas más tiempo?</Text>
          <Text style={styles.suggestionText}>
            Si quieres posponer este recordatorio por unos minutos más en
            lugar de cerrarlo definitivamente.
          </Text>
          <View style={styles.suggestionActions}>
            <AppButton
              label="Posponer 10 min"
              variant="outline"
              color={colors.sageGreen}
              size="small"
              fullWidth={false}
              onPress={goHome}
            />
            <AppButton
              label="Posponer 5 min"
              variant="outline"
              color={colors.sageGreen}
              size="small"
              fullWidth={false}
              onPress={goHome}
            />
          </View>
        </View>

        <AppButton
          label="Listo, volver al inicio"
          color={colors.sageGreen}
          onPress={goHome}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
    gap: 20,
  },
  successCard: {
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  successImage: {
    width: 160,
    height: 180,
  },
  successTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 22,
    lineHeight: 28,
    color: colors.textMuted,
    textAlign: 'center',
    width: 226,
  },
  notificationBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(143,171,130,0.08)',
    borderRadius: 16,
    paddingLeft: 19,
    paddingRight: 15,
    height: 52,
  },
  notificationText: {
    flex: 1,
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 14,
    color: colors.sageGreen,
  },
  suggestionCard: {
    backgroundColor: 'rgba(239,167,130,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 20,
    gap: 16,
  },
  suggestionTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  suggestionText: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
  },
  suggestionActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
