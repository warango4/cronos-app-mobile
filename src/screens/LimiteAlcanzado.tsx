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

type Props = NativeStackScreenProps<RootStackParamList, 'LimiteAlcanzado'>;

export default function LimiteAlcanzadoScreen({navigation}: Props) {
  return (
    <View style={styles.screen}>
      <AppBar title="Alerta de límite" onBack={navigation.goBack} showAvatar={false} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Card radius={24} style={styles.warningCard}>
          <CroppedImage
            source={require('../assets/images/p12_warning.png')}
            width={156}
            height={124}
            crop={{w: 123.08, h: 154.84, left: -11.54, top: -27.42}} mirrored
            style={styles.warningImage}
          />
          <Text style={styles.warningTitle}>Ya no puedes posponer más</Text>
          <Text style={styles.warningDescription}>
            Has alcanzado el límite máximo de veces para posponer. Debes
            tomar una acción ahora.
          </Text>
        </Card>

        <View style={styles.contextInfo}>
          <Text style={styles.contextLabel}>Alarma pendiente:</Text>
          <Text style={styles.contextText}>
            Presión arterial - Mamá (07:00 AM)
          </Text>
        </View>

        <View style={styles.actions}>
          <AppButton
            label="Marcar como cumplida"
            fullWidth={false}
            onPress={() => navigation.navigate('ConfirmarAccion')}
          />
          <AppButton
            label="Omitir por hoy"
            variant="outline"
            fullWidth={false}
            onPress={() => navigation.popToTop()}
          />
        </View>
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
    padding: 24,
    gap: 32,
  },
  warningCard: {
    alignItems: 'center',
    padding: 24,
    gap: 20,
  },
  warningImage: {
    width: 156,
    height: 124,
  },
  warningTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 22,
    color: colors.textMuted,
    textAlign: 'center',
  },
  warningDescription: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
  },
  contextInfo: {
    backgroundColor: 'rgba(239,167,130,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 16,
    gap: 8,
  },
  contextLabel: {
    fontFamily: fonts.nunitoBold,
    fontSize: 14,
    color: colors.textMuted,
  },
  contextText: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  actions: {
    gap: 12,
    alignItems: 'center',
  },
});
