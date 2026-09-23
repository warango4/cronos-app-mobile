import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {Recipient, useAlarms} from '../state/AlarmsContext';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import CroppedImage from '../components/CroppedImage';
import AppButton from '../components/AppButton';
import FadeIn from '../components/FadeIn';
import {to24h} from '../utils/time';

type Props = NativeStackScreenProps<RootStackParamList, 'NuevaAlarma'>;

export default function NuevaAlarmaScreen({navigation}: Props) {
  const {updateDraft} = useAlarms();
  const [hour, setHour] = useState(6);
  const [minute, setMinute] = useState(30);
  const [meridiem, setMeridiem] = useState<'AM' | 'PM'>('AM');
  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState<Recipient>('Yo');
  const [otherName, setOtherName] = useState('');

  return (
    <View style={styles.screen}>
      <CroppedImage
        source={require('../assets/images/p4_alarm_bell.png')}
        width={390}
        height={145}
        crop={{w: 130.77, h: 117.24, left: -15.64, top: -13.79}}
        style={styles.footerImage}
      />
      <AppBar title="Nueva alarma" titleSize={20} onBack={navigation.goBack} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.timeCard}>
          <Text style={styles.timeCardTitle}>Selecciona la hora</Text>
          <View style={styles.pickerRow}>
            <TouchableOpacity
              style={styles.hourBlock}
              onPress={() => setHour(h => (h % 12) + 1)}>
              <Text style={styles.timeValue}>
                {String(hour).padStart(2, '0')}
              </Text>
              <Text style={styles.timeCaption}>Hora</Text>
            </TouchableOpacity>
            <Text style={styles.colon}>:</Text>
            <TouchableOpacity
              style={styles.minuteBlock}
              onPress={() => setMinute(m => (m + 5) % 60)}>
              <Text style={styles.timeValue}>
                {String(minute).padStart(2, '0')}
              </Text>
              <Text style={styles.timeCaption}>Minutos</Text>
            </TouchableOpacity>
            <View style={styles.ampmToggle}>
              <TouchableOpacity
                style={[
                  styles.ampmTab,
                  meridiem === 'AM' && styles.ampmTabActive,
                ]}
                onPress={() => setMeridiem('AM')}>
                <Text
                  style={[
                    styles.ampmLabel,
                    meridiem === 'AM' && styles.ampmLabelActive,
                  ]}>
                  AM
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.ampmTab,
                  meridiem === 'PM' && styles.ampmTabActive,
                ]}
                onPress={() => setMeridiem('PM')}>
                <Text
                  style={[
                    styles.ampmLabel,
                    meridiem === 'PM' && styles.ampmLabelActive,
                  ]}>
                  PM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TextInput
          mode="outlined"
          label="Nombre de la alarma"
          value={name}
          onChangeText={setName}
          outlineColor={colors.border}
          activeOutlineColor={colors.sageGreen}
          style={styles.textInput}
        />

        <View style={styles.recipientSection}>
          <Text style={styles.recipientTitle}>¿Para quién es?</Text>
          <View style={styles.segmentedWrapper}>
            {(['Yo', 'Persona', 'Mascota'] as Recipient[]).map(option => {
              const selected = recipient === option;
              return (
                <TouchableOpacity
                  key={option}
                  style={[styles.segment, selected && styles.segmentActive]}
                  onPress={() => setRecipient(option)}>
                  <Text
                    style={[
                      styles.segmentLabel,
                      selected && styles.segmentLabelActive,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Pressable
            style={styles.otherLink}
            onPress={() => setRecipient('Otro')}
            hitSlop={8}>
            <View style={styles.otherLinkUnderline}>
              <Text style={styles.otherLinkText}>Otro</Text>
            </View>
          </Pressable>
          {recipient === 'Otro' && (
            <FadeIn>
              <TextInput
                mode="outlined"
                label="¿Quién es?"
                value={otherName}
                onChangeText={setOtherName}
                outlineColor={colors.border}
                activeOutlineColor={colors.sageGreen}
                style={styles.textInput}
              />
            </FadeIn>
          )}
        </View>

        <AppButton
          label="Continuar →"
          fullWidth={false}
          style={styles.continueButton}
          onPress={() => {
            updateDraft({
              name,
              time: to24h(hour, minute, meridiem),
              recipient,
              recipientName: recipient === 'Otro' ? otherName : undefined,
            });
            navigation.navigate('Frecuencia');
          }}
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
    gap: 28,
  },
  timeCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    gap: 16,
  },
  timeCardTitle: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 14,
    color: colors.textMuted,
  },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hourBlock: {
    width: 80,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.amber,
    backgroundColor: '#FCF6E8',
    alignItems: 'center',
  },
  minuteBlock: {
    width: 80,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  timeValue: {
    fontFamily: fonts.nunitoBold,
    fontSize: 32,
    color: colors.textMuted,
  },
  timeCaption: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  colon: {
    fontFamily: fonts.nunitoBold,
    fontSize: 32,
    color: colors.textPrimary,
  },
  ampmToggle: {
    width: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  ampmTab: {
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  ampmTabActive: {
    backgroundColor: colors.sageGreen,
  },
  ampmLabel: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  ampmLabelActive: {
    fontFamily: fonts.figtreeBold,
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: colors.surface,
  },
  otherLink: {
    alignSelf: 'flex-end',
    marginTop: -4,
  },
  otherLinkUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: '#9E9E9E',
  },
  otherLinkText: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 13,
    color: '#9E9E9E',
  },
  recipientSection: {
    gap: 12,
  },
  recipientTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
  },
  segmentedWrapper: {
    flexDirection: 'row',
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  segmentActive: {
    backgroundColor: colors.sageGreen,
    borderLeftWidth: 0,
  },
  segmentLabel: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 13,
    color: colors.textMuted,
  },
  segmentLabelActive: {
    fontFamily: fonts.figtreeBold,
    color: '#FFFFFF',
  },
  footerImage: {
    position: 'absolute',
    bottom: 0,
    left: 9,
  },
  continueButton: {
    alignSelf: 'flex-end',
    marginTop: 35,
  },
});
