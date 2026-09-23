import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import CroppedImage from '../components/CroppedImage';
import AppButton from '../components/AppButton';
import Card from '../components/Card';

type Props = NativeStackScreenProps<RootStackParamList, 'InvitacionEnviada'>;

const CHANNELS = ['WhatsApp', 'SMS', 'Copiar Enlace'];

export default function InvitacionEnviadaScreen({navigation}: Props) {
  const [channel, setChannel] = useState('WhatsApp');
  const [showToast, setShowToast] = useState(true);

  return (
    <View style={styles.screen}>
      <AppBar title="Invitación enviada" onBack={navigation.goBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Card radius={24} style={styles.pendingCard}>
          <CroppedImage
            source={require('../assets/images/p9_clock.png')}
            width={119}
            height={134}
            crop={{w: 165.55, h: 147.01, left: -32.77, top: -25.37}}
            style={styles.clockImage}
          />
          <Text style={styles.pendingTitle}>Esperando respuesta de Mamá</Text>
          <Text style={styles.pendingSubtitle}>Enviado hoy a las 9:45 AM</Text>
          <View style={styles.pendingBadge}>
            <Text style={styles.pendingBadgeText}>PENDIENTE DE CONFIRMACIÓN</Text>
          </View>
        </Card>

        <Text style={styles.channelsTitle}>Canal de envío preferido:</Text>
        <View style={styles.chipsRow}>
          {CHANNELS.map(option => {
            const selected = channel === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setChannel(option)}>
                {selected ? (
                  <Icon name="check" size={14} color="#FFFFFF" />
                ) : null}
                <Text
                  style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.actionsRow}>
          <AppButton
            label="Cancelar"
            variant="text"
            color={colors.textMuted}
            fullWidth={false}
            onPress={navigation.goBack}
          />
          <AppButton
            label="Reenviar"
            fullWidth={false}
            onPress={() => setShowToast(true)}
          />
        </View>
      </ScrollView>

      {showToast ? (
        <View style={styles.toast}>
          <Icon name="check" size={20} color={colors.sageGreen} />
          <Text style={styles.toastText}>Invitación enviada a Mamá</Text>
        </View>
      ) : null}
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
  pendingCard: {
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  clockImage: {
    width: 119,
    height: 134,
    marginBottom: 8,
  },
  pendingTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 20,
    color: colors.textMuted,
    textAlign: 'center',
  },
  pendingSubtitle: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
  },
  pendingBadge: {
    marginTop: 16,
    height: 32,
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: colors.warmPeach,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  pendingBadgeText: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 11,
    color: colors.warmPeach,
  },
  channelsTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: colors.sageGreen,
    borderColor: colors.sageGreen,
  },
  chipLabel: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 13,
    color: colors.textMuted,
  },
  chipLabelSelected: {
    color: '#FFFFFF',
    fontFamily: fonts.figtreeSemiBold,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    margin: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#1A1A1A',
  },
  toastText: {
    flex: 1,
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
