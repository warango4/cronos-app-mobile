import React, {useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {Alarm, avatarFor, useAlarms} from '../state/AlarmsContext';
import {fonts} from '../styles/typography';
import GenericAvatar from '../components/GenericAvatar';
import AppButton from '../components/AppButton';
import M3Switch from '../components/M3Switch';
import CroppedImage from '../components/CroppedImage';

type Props = NativeStackScreenProps<RootStackParamList, 'ListaAlarmas'>;

function scheduleOf(alarm: Alarm) {
  return `${alarm.time} · ${alarm.frequency}`;
}

export default function ListaAlarmasScreen({navigation}: Props) {
  const {alarms, pending, toggleAlarm} = useAlarms();
  const [activeTab, setActiveTab] = useState<'mis' | 'solicitudes'>('mis');

  const isEmpty = alarms.length === 0;

  return (
    <View style={styles.screen}>
      {isEmpty ? (
        <EmptyState onCreate={() => navigation.navigate('NuevaAlarma')} />
      ) : (
        <>
          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'mis' && styles.tabActive]}
              onPress={() => setActiveTab('mis')}>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'mis' && styles.tabLabelActive,
                ]}>
                Mis alarmas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tab,
                activeTab === 'solicitudes' && styles.tabActive,
              ]}
              onPress={() => setActiveTab('solicitudes')}>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === 'solicitudes' && styles.tabLabelActive,
                ]}>
                Solicitudes (0)
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'mis' ? (
            <ScrollView
              style={styles.body}
              contentContainerStyle={styles.bodyContent}>
              <Text style={styles.sectionTitle}>Alarmas personales</Text>
              <View style={styles.alarmList}>
                {alarms.map(alarm => {
                  const avatar = avatarFor(alarm);
                  return (
                    <Pressable
                      key={alarm.id}
                      style={styles.alarmCard}
                      onPress={() =>
                        navigation.navigate('DetalleAlarma', {alarmId: alarm.id})
                      }
                      onLongPress={() =>
                        navigation.navigate('AlertaPantallaCompleta', {
                          alarmId: alarm.id,
                        })
                      }>
                      <GenericAvatar
                        letter={avatar.letter}
                        backgroundColor={avatar.bg}
                        textColor={avatar.color}
                      />
                      <View style={styles.alarmDetails}>
                        <Text style={styles.alarmTitle}>{alarm.name}</Text>
                        <Text style={styles.alarmSchedule}>
                          {scheduleOf(alarm)}
                        </Text>
                      </View>
                      <M3Switch
                        value={alarm.enabled}
                        onValueChange={() => toggleAlarm(alarm.id)}
                      />
                    </Pressable>
                  );
                })}
              </View>

              {pending.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, styles.sectionSpaced]}>
                    Pendientes de confirmación
                  </Text>
                  <View style={styles.alarmList}>
                    {pending.map(alarm => {
                      const avatar = avatarFor(alarm);
                      return (
                        <Pressable
                          key={alarm.id}
                          style={styles.alarmCard}
                          onPress={() => navigation.navigate('Notificacion')}>
                          <GenericAvatar
                            letter={avatar.letter}
                            backgroundColor={avatar.bg}
                            textColor={avatar.color}
                          />
                          <View style={styles.alarmDetails}>
                            <Text style={styles.alarmTitle}>{alarm.name}</Text>
                            <Text style={styles.alarmSchedule}>
                              {scheduleOf(alarm)}
                            </Text>
                          </View>
                          <View style={styles.pendingBadge}>
                            <Text style={styles.pendingBadgeText}>Pendiente</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                </>
              )}
            </ScrollView>
          ) : (
            <View style={styles.emptyRequests}>
              <Text style={styles.emptyRequestsText}>
                No tienes solicitudes por ahora.
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.fab}
            onPress={() => navigation.navigate('NuevaAlarma')}>
            <Icon name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.fabLabel}>Nueva alarma</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function EmptyState({onCreate}: {onCreate: () => void}) {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis alarmas</Text>
        <GenericAvatar letter="C" backgroundColor={colors.warmPeach} />
      </View>
      <ScrollView
      style={styles.body}
      contentContainerStyle={styles.emptyContent}>
      <CroppedImage
            source={require('../assets/images/p2_empty_state.png')}
            width={269}
            height={238}
            crop={{w: 100.09, h: 150.84, left: -0.05, top: -25.63}}
            style={styles.emptyImage}
          />
      <Text style={styles.emptyTitle}>Aún no tienes alarmas</Text>
      <Text style={styles.emptyDescription}>
        Crea una alarma para ti, para alguien que cuidas o para tu mascota.
      </Text>
      <AppButton
        label="Crear tu primera alarma"
        icon="plus"
        onPress={onCreate}
        fullWidth={false}
        style={styles.emptyButton}
      />
      <View style={styles.smsInviteGroup}>
        <Text style={styles.smsInviteTitle}>¿Te compartieron una alarma?</Text>
        <Text style={styles.smsInviteSubtitle}>
          Acepta la invitación desde tu WhatsApp o SMS.
        </Text>
      </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 64,
    backgroundColor: colors.surfaceMuted,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 21,
  },
  headerTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 22,
    color: colors.textMuted,
  },
  tabs: {
    flexDirection: 'row',
    height: 48,
    backgroundColor: colors.surfaceMuted,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.sageGreen,
  },
  tabLabel: {
    fontFamily: fonts.nunitoMedium,
    fontSize: 15,
    color: colors.textMuted,
  },
  tabLabelActive: {
    fontFamily: fonts.nunitoBold,
    color: colors.sageGreen,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 31,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontFamily: fonts.nunitoBold,
    fontSize: 16,
    color: colors.textMuted,
    marginBottom: 12,
  },
  sectionSpaced: {
    marginTop: 44,
  },
  alarmList: {
    gap: 17,
  },
  alarmCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
  },
  alarmDetails: {
    flex: 1,
    gap: 4,
  },
  alarmTitle: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 15,
    color: colors.textMuted,
  },
  alarmSchedule: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  pendingBadge: {
    backgroundColor: colors.amberTint,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pendingBadgeText: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 11,
    color: colors.amber,
  },
  emptyRequests: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyRequestsText: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
  },
  fab: {
    position: 'absolute',
    right: 19,
    bottom: 20,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.warmPeach,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  fabLabel: {
    fontFamily: fonts.figtreeBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
  emptyContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 56,
    paddingTop: 90,
  },
  emptyImage: {
    marginBottom: 18,
  },
  emptyTitle: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 24,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyDescription: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 31,
  },
  emptyButton: {
    marginBottom: 66,
  },
  smsInviteGroup: {
    alignItems: 'center',
    gap: 8,
  },
  smsInviteTitle: {
    fontFamily: fonts.figtreeBold,
    fontSize: 14,
    color: colors.sageGreen,
    textAlign: 'center',
  },
  smsInviteSubtitle: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
