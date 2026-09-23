import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RadioButton, TextInput} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {useAlarms} from '../state/AlarmsContext';
import {nextHour} from '../utils/time';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import AppButton from '../components/AppButton';
import FadeIn from '../components/FadeIn';

type Props = NativeStackScreenProps<RootStackParamList, 'Frecuencia'>;

type FrequencyOption = 'unica' | 'diaria' | 'especificos' | 'varias';

const OPTIONS: {value: FrequencyOption; label: string}[] = [
  {value: 'unica', label: 'Única vez'},
  {value: 'diaria', label: 'Diaria (todos los días)'},
  {value: 'especificos', label: 'Días específicos'},
  {value: 'varias', label: 'Varias veces al día'},
];

const DAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function frequencyLabel(option: FrequencyOption, days: string[]) {
  switch (option) {
    case 'unica':
      return 'Única vez';
    case 'diaria':
      return 'Diaria';
    case 'especificos':
      return days.length === 5 && days.join('') === 'LMXJV'
        ? 'L-V'
        : days.join(' ');
    default:
      return 'Varias veces al día';
  }
}

export default function FrecuenciaScreen({navigation}: Props) {
  const {updateDraft} = useAlarms();
  const [schedules, setSchedules] = useState(['07:00', '19:00']);
  const [frequency, setFrequency] = useState<FrequencyOption>('varias');
  const [activeDays, setActiveDays] = useState<string[]>([
    'L',
    'M',
    'X',
    'J',
    'V',
  ]);

  const rows: string[][] = [];
  for (let i = 0; i < schedules.length; i += 2) {
    rows.push(schedules.slice(i, i + 2));
  }

  const updateSchedule = (index: number, text: string) =>
    setSchedules(prev => prev.map((t, i) => (i === index ? text : t)));

  const addSchedule = () => {
    setSchedules(prev => [...prev, nextHour(prev[prev.length - 1])]);
  };

  const toggleDay = (day: string) => {
    setActiveDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day],
    );
  };

  return (
    <View style={styles.screen}>
      <AppBar title="Frecuencia" onBack={navigation.goBack} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}
        keyboardShouldPersistTaps="handled">
        <Text style={styles.subtitle}>
          Selecciona la frecuencia de esta alarma
        </Text>

        <RadioButton.Group
          onValueChange={value => setFrequency(value as FrequencyOption)}
          value={frequency}>
          {OPTIONS.map(option => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioRow}
              onPress={() => setFrequency(option.value)}>
              <View style={styles.radioTarget}>
                <RadioButton value={option.value} color={colors.sageGreen} />
              </View>
              <Text
                style={[
                  styles.radioLabel,
                  frequency === option.value && styles.radioLabelSelected,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </RadioButton.Group>

        {frequency === 'varias' && (
          <View style={styles.expandedSection}>
            <Text style={styles.expandedTitle}>Horarios del día:</Text>
            {rows.map((row, ri) => {
              const Row = ri === 0 ? View : FadeIn;
              return (
                <Row key={ri} style={styles.scheduleInputs}>
                  {row.map((time, ci) => {
                    const index = ri * 2 + ci;
                    return (
                      <TextInput
                        key={index}
                        mode="outlined"
                        label={`Hora ${index + 1}`}
                        value={time}
                        onChangeText={text => updateSchedule(index, text)}
                        keyboardType="numbers-and-punctuation"
                        outlineColor={colors.border}
                        activeOutlineColor={colors.sageGreen}
                        style={styles.scheduleInput}
                      />
                    );
                  })}
                  {row.length === 1 && <View style={styles.scheduleInput} />}
                </Row>
              );
            })}
            <AppButton
              label="+ Agregar otro horario"
              variant="outline"
              color={colors.sageGreen}
              size="small"
              shape="round"
              fullWidth={false}
              onPress={addSchedule}
              style={styles.addScheduleButton}
              labelStyle={styles.addScheduleLabel}
            />
          </View>
        )}

        <View style={styles.daysSection}>
          <Text style={styles.daysLabel}>Días activos:</Text>
          <View style={styles.daysRow}>
            {DAYS.map(day => {
              const active = activeDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayChip, active && styles.dayChipActive]}
                  onPress={() => toggleDay(day)}>
                  <Text
                    style={[
                      styles.dayChipLabel,
                      active && styles.dayChipLabelActive,
                    ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <AppButton
          label="Continuar →"
          fullWidth={false}
          style={styles.continueButton}
          onPress={() => {
            updateDraft({frequency: frequencyLabel(frequency, activeDays)});
            navigation.navigate('Recurrencia');
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
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  subtitle: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 48,
    marginLeft: -4,
    marginBottom: 4,
  },
  radioTarget: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioLabel: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
  },
  radioLabelSelected: {
    fontFamily: fonts.figtreeSemiBold,
  },
  expandedSection: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 15,
    gap: 16,
    marginTop: 14,
    marginLeft: 10,
    marginRight: 4,
  },
  expandedTitle: {
    fontFamily: fonts.figtreeBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  scheduleInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleInput: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  addScheduleButton: {
    alignSelf: 'flex-end',
    borderWidth: 1,
  },
  addScheduleLabel: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
  },
  daysSection: {
    gap: 12,
    marginTop: 25,
    marginLeft: 10,
  },
  daysLabel: {
    fontFamily: fonts.figtreeBold,
    fontSize: 14,
    color: colors.textMuted,
  },
  daysRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayChip: {
    height: 32,
    width: 40,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(143,171,130,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: colors.sageGreen,
    borderColor: colors.sageGreen,
  },
  dayChipLabel: {
    fontFamily: fonts.figtreeBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  dayChipLabelActive: {
    color: '#FFFFFF',
  },
  continueButton: {
    alignSelf: 'flex-end',
    marginTop: 51,
    marginRight: 4,
  },
});
