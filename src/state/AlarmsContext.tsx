import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {colors} from '../styles/theme';

export type Recipient = 'Yo' | 'Persona' | 'Mascota' | 'Otro';

export type Alarm = {
  id: string;
  name: string;
  time: string; // HH:mm, 24 h
  frequency: string;
  recipient: Recipient;
  recipientName?: string;
  until: string;
  enabled: boolean;
};

export type Draft = Partial<Omit<Alarm, 'id' | 'enabled'>>;

type AlarmsState = {
  alarms: Alarm[];
  pending: Alarm[];
  lastCreated?: Alarm;
  updateDraft: (patch: Draft) => void;
  saveDraft: (patch?: Draft) => Alarm;
  toggleAlarm: (id: string) => void;
  markShared: () => void;
};

const AlarmsContext = createContext<AlarmsState | null>(null);

const AVATAR_TINTS: Record<Recipient, {bg: string; color: string}> = {
  Yo: {bg: colors.sageTint, color: colors.sageGreen},
  Persona: {bg: colors.peachTint, color: colors.warmPeach},
  Mascota: {bg: colors.amberTint, color: colors.amber},
  Otro: {bg: '#F0EBF7', color: colors.lavender},
};

export function recipientLabel(alarm: Alarm) {
  return alarm.recipient === 'Otro'
    ? alarm.recipientName || 'Otro'
    : alarm.recipient;
}

export function avatarFor(alarm: Alarm) {
  return {
    letter: alarm.name.trim().charAt(0).toUpperCase() || 'A',
    ...AVATAR_TINTS[alarm.recipient],
  };
}

export function AlarmsProvider({children}: {children: React.ReactNode}) {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [pending, setPending] = useState<Alarm[]>([]);
  const [lastCreated, setLastCreated] = useState<Alarm>();
  const [draft, setDraft] = useState<Draft>({});

  const updateDraft = useCallback(
    (patch: Draft) => setDraft(prev => ({...prev, ...patch})),
    [],
  );

  const saveDraft = useCallback(
    (patch: Draft = {}) => {
      const d = {...draft, ...patch};
      const alarm: Alarm = {
        id: String(Date.now()),
        name: d.name?.trim() || 'Alarma',
        time: d.time ?? '07:00',
        frequency: d.frequency ?? 'Diaria',
        recipient: d.recipient ?? 'Yo',
        recipientName: d.recipientName?.trim() || undefined,
        until: d.until ?? 'Siempre',
        enabled: true,
      };
      setAlarms(prev => [...prev, alarm]);
      setLastCreated(alarm);
      setDraft({});
      return alarm;
    },
    [draft],
  );

  const toggleAlarm = useCallback(
    (id: string) =>
      setAlarms(prev =>
        prev.map(a => (a.id === id ? {...a, enabled: !a.enabled} : a)),
      ),
    [],
  );

  const markShared = useCallback(() => {
    const target = lastCreated ?? alarms[0];
    if (target) {
      setPending(prev =>
        prev.some(p => p.id === target.id) ? prev : [...prev, target],
      );
    }
  }, [lastCreated, alarms]);

  const value = useMemo(
    () => ({
      alarms,
      pending,
      lastCreated,
      updateDraft,
      saveDraft,
      toggleAlarm,
      markShared,
    }),
    [
      alarms,
      pending,
      lastCreated,
      updateDraft,
      saveDraft,
      toggleAlarm,
      markShared,
    ],
  );

  return (
    <AlarmsContext.Provider value={value}>{children}</AlarmsContext.Provider>
  );
}

export function useAlarms() {
  const ctx = useContext(AlarmsContext);
  if (!ctx) {
    throw new Error('useAlarms must be used inside <AlarmsProvider>');
  }
  return ctx;
}
