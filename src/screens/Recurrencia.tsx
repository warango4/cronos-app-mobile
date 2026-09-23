import React, {useMemo, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Icon from '@react-native-vector-icons/material-design-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';
import AppBar from '../components/AppBar';
import AppButton from '../components/AppButton';
import FadeIn from '../components/FadeIn';
import {MONTH_NAMES, buildMonthGrid} from '../utils/calendar';
import {useAlarms} from '../state/AlarmsContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Recurrencia'>;

const DURATION_OPTIONS = ['7 días', '10 días', '30 días', 'Siempre'];
const WEEKDAY_LABELS = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];

export default function RecurrenciaScreen({navigation}: Props) {
  const {saveDraft} = useAlarms();
  const today = useMemo(() => new Date(), []);
  const [selectedDuration, setSelectedDuration] = useState('Siempre');
  const [customDate, setCustomDate] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());

  const weeks = useMemo(
    () => buildMonthGrid(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const formattedDate = `${String(selectedDate).padStart(
    2,
    '0',
  )} / ${MONTH_NAMES[viewMonth].slice(0, 3).toLowerCase()} / ${viewYear}`;

  return (
    <View style={styles.screen}>
      <AppBar title="¿Es recurrente?" onBack={navigation.goBack} />

      <ScrollView
        style={styles.body}
        contentContainerStyle={styles.bodyContent}>
        <Text style={styles.subtitle}>
          ¿Hasta cuándo se repite esta alarma?
        </Text>

        <View style={styles.chipsRow}>
          {DURATION_OPTIONS.map(option => {
            const selected = !customDate && selectedDuration === option;
            return (
              <TouchableOpacity
                key={option}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => {
                  setSelectedDuration(option);
                  setCustomDate(false);
                  setCalendarOpen(false);
                }}>
                <Text
                  style={[
                    styles.chipLabel,
                    selected && styles.chipLabelSelected,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.customLabel}>o elige una fecha personalizada:</Text>
        <Pressable
          onPress={() => {
            setCalendarOpen(open => !open);
          }}>
          <View pointerEvents="none">
            <TextInput
              mode="outlined"
              label="Fecha de finalización"
              value={formattedDate}
              editable={false}
              disabled={!calendarOpen}
              outlineColor={colors.border}
              activeOutlineColor={colors.sageGreen}
              style={styles.dateField}
            />
          </View>
        </Pressable>

        {calendarOpen && (
          <FadeIn>
            <View style={styles.calendarCard}>
              <View style={styles.calendarHeader}>
                <View style={styles.monthButton}>
                  <Text style={styles.monthLabel}>
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </Text>
                  <Icon name="menu-down" size={20} color={colors.textMuted} />
                </View>
                <View style={styles.calendarNav}>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => changeMonth(-1)}>
                    <Icon
                      name="chevron-left"
                      size={24}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.navButton}
                    onPress={() => changeMonth(1)}>
                    <Icon
                      name="chevron-right"
                      size={24}
                      color={colors.textPrimary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.weekdayRow}>
                {WEEKDAY_LABELS.map((label, i) => (
                  <Text key={i} style={styles.weekdayLabel}>
                    {label}
                  </Text>
                ))}
              </View>

              {weeks.map((week, wi) => (
                <View key={wi} style={styles.weekRow}>
                  {week.map((day, di) => {
                    const isToday =
                      day === today.getDate() &&
                      viewMonth === today.getMonth() &&
                      viewYear === today.getFullYear();
                    const isSelected = customDate && day === selectedDate;
                    return (
                      <TouchableOpacity
                        key={di}
                        disabled={!day}
                        style={styles.dayCell}
                        onPress={() => {
                          if (day) {
                            setSelectedDate(day);
                            setCustomDate(true);
                          }
                        }}>
                        {day ? (
                          <View
                            style={[
                              styles.dayCircle,
                              isToday && styles.dayCircleToday,
                            ]}>
                            {isSelected && (
                              <View style={styles.dayCircleFill} />
                            )}
                            <Text
                              style={[
                                styles.dayLabel,
                                isSelected && styles.dayLabelSelected,
                              ]}>
                              {day}
                            </Text>
                          </View>
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </FadeIn>
        )}

        <AppButton
          label="Guardar alarma"
          fullWidth={false}
          style={styles.saveButton}
          onPress={() => {
            saveDraft({until: customDate ? formattedDate : selectedDuration});
            // La lista queda debajo del popup de "Alarma creada".
            navigation.reset({
              index: 1,
              routes: [{name: 'ListaAlarmas'}, {name: 'AlarmaCreada'}],
            });
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
    paddingBottom: 30,
  },
  subtitle: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  chip: {
    height: 32,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.warmPeach,
    borderColor: colors.warmPeach,
  },
  chipLabel: {
    fontFamily: fonts.figtreeMedium,
    fontSize: 13,
    color: colors.textMuted,
  },
  chipLabelSelected: {
    color: '#FFFFFF',
    fontFamily: fonts.figtreeMedium,
  },
  customLabel: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
    marginBottom: 20,
  },
  dateField: {
    backgroundColor: colors.surface,
    marginBottom: 20,
  },
  calendarCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    overflow: 'hidden',
  },
  calendarHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
  },
  monthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  monthLabel: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 14,
    color: colors.sageGreen,
  },
  calendarNav: {
    flexDirection: 'row',
  },
  navButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekdayRow: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.figtreeMedium,
    fontSize: 14,
    color: colors.textMuted,
  },
  weekRow: {
    flexDirection: 'row',
    height: 48,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircleToday: {
    borderWidth: 1,
    borderColor: colors.amber,
  },
  dayCircleFill: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.warmPeach,
  },
  dayLabel: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 16,
    color: colors.textMuted,
  },
  dayLabelSelected: {
    color: '#FFFFFF',
  },
  saveButton: {
    alignSelf: 'flex-end',
    marginTop: 40,
    marginRight: -4,
  },
});
