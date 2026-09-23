import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {fonts} from '../styles/typography';
import {useAlarms} from '../state/AlarmsContext';
import {MONTH_NAMES} from '../utils/calendar';
import AppButton from '../components/AppButton';
import CroppedImage from '../components/CroppedImage';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AlertaPantallaCompleta'
>;

const BG = '#0D0B0F';
const ACCENT = '#8FAB82';

export default function AlertaPantallaCompletaScreen({
  navigation,
  route,
}: Props) {
  const {alarms} = useAlarms();
  const alarm = alarms.find(a => a.id === route.params.alarmId);
  const today = new Date();
  const dateLabel = `HOY · ${today.getDate()} ${MONTH_NAMES[today.getMonth()]}`;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.topContent}>
        <View style={styles.pulseOuter}>
          <View style={styles.pulseInner}>
            <CroppedImage
              source={require('../assets/images/p10_alarm_pulse.png')}
              width={100}
              height={99}
              crop={{w: 142.25, h: 144.29, left: -19.01, top: -23.57}}
            />
          </View>
        </View>

        <View style={styles.timeBlock}>
          <Text style={styles.dateLabel}>{dateLabel}</Text>
          <Text style={styles.timeLabel}>{alarm?.time ?? '--:--'}</Text>
          <View style={styles.labelContainer}>
            <Text style={styles.alarmLabel}>{alarm?.name ?? 'Alarma'}</Text>
            <Text style={styles.alarmState}>Sonando ahora</Text>
          </View>
        </View>
      </View>

      <View style={styles.actionsStack}>
        <AppButton
          label="Marcar cumplida"
          color={ACCENT}
          size="large"
          style={styles.action}
          onPress={() => navigation.navigate('ConfirmarAccion')}
        />
        <AppButton
          label="Posponer"
          color="#2A2530"
          size="large"
          style={styles.action}
          onPress={() => navigation.navigate('LimiteAlcanzado')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: BG,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 24,
  },
  topContent: {
    alignItems: 'center',
  },
  pulseOuter: {
    width: 160,
    height: 160,
    borderRadius: 100,
    backgroundColor: 'rgba(143,171,130,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseInner: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: 'rgba(143,171,130,0.19)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeBlock: {
    alignItems: 'center',
    gap: 16,
    marginTop: 40,
  },
  dateLabel: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 16,
    color: ACCENT,
    textTransform: 'uppercase',
  },
  timeLabel: {
    fontFamily: fonts.nunitoExtraBold,
    fontSize: 80,
    lineHeight: 80,
    color: '#FFFFFF',
  },
  labelContainer: {
    alignItems: 'center',
    gap: 4,
  },
  alarmLabel: {
    fontFamily: fonts.nunitoBold,
    fontSize: 28,
    color: ACCENT,
    textAlign: 'center',
  },
  alarmState: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  actionsStack: {
    alignItems: 'center',
    gap: 16,
    marginTop: 40,
  },
  action: {
    width: 235,
  },
});
