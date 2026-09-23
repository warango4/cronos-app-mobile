import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {avatarFor, recipientLabel, useAlarms} from '../state/AlarmsContext';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import CroppedImage from '../components/CroppedImage';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import DetailRow from '../components/DetailRow';
import GenericAvatar from '../components/GenericAvatar';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalleAlarma'>;

export default function DetalleAlarmaScreen({navigation, route}: Props) {
  const {alarms} = useAlarms();
  const alarm = alarms.find(a => a.id === route.params.alarmId);
  if (!alarm) {
    return null;
  }
  const avatar = avatarFor(alarm);

  return (
    <View style={styles.screen}>
      <CroppedImage
          source={require('../assets/images/p7_living_room.png')}
          width={380}
          height={122}
          crop={{w: 171.32, h: 177.87, left: -36.84, top: -77.87}}
          style={styles.illustration}
        />
      <AppBar title="Detalle de alarma" onBack={navigation.goBack} />

      <ScrollView style={styles.body} contentContainerStyle={styles.bodyContent}>
        <Card radius={16} style={styles.alarmCard}>
          <GenericAvatar
            letter={avatar.letter}
            backgroundColor={avatar.bg}
            textColor={avatar.color}
          />
          <View style={styles.alarmText}>
            <Text style={styles.alarmTitle}>{alarm.name}</Text>
            <Text style={styles.alarmSubtitle}>Para: {recipientLabel(alarm)}</Text>
          </View>
        </Card>

        <View style={styles.actionsRow}>
          <AppButton
            label="Compartir"
            fullWidth={false}
            onPress={() => navigation.navigate('SelectorContacto')}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.detailsList}>
          <DetailRow label="Hora" value={alarm.time} />
          <DetailRow label="Frecuencia" value={alarm.frequency} />
          <DetailRow label="Para quién es" value={recipientLabel(alarm)} />
          <DetailRow label="Repite hasta" value={alarm.until} showDivider={false} />
        </View>

        <Card radius={16} style={styles.complianceCard}>
          <View style={styles.complianceHeader}>
            <Text style={styles.complianceTitle}>Estado de cumplimiento</Text>
            <Text style={styles.infoIcon}>ⓘ</Text>
          </View>
          <Text style={styles.complianceText}>
            3 de 3 veces marcadas como cumplida esta semana
          </Text>
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
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
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 20,
    gap: 20,
  },
  alarmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
  },
  alarmText: {
    flex: 1,
    gap: 4,
  },
  alarmTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  alarmSubtitle: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  actionsRow: {
    alignItems: 'flex-end',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  detailsList: {
    gap: 12,
  },
  complianceCard: {
    padding: 15,
    gap: 12,
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  complianceTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 15,
    color: colors.textMuted,
  },
  infoIcon: {
    fontSize: 14,
    color: colors.textMuted,
  },
  complianceText: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(143,171,130,0.13)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.sageGreen,
  },
  illustration: {
    position: 'absolute',
    bottom: 0,
    left: 16,
  },
});
