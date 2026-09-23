import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/types';
import {colors} from '../styles/theme';
import {recipientLabel, useAlarms} from '../state/AlarmsContext';
import {fonts} from '../styles/typography';
import AppButton from '../components/AppButton';
import CroppedImage from '../components/CroppedImage';
import DetailRow from '../components/DetailRow';

type Props = NativeStackScreenProps<RootStackParamList, 'AlarmaCreada'>;

// Popup inferior (bottom sheet) sobre la lista de alarmas.
export default function AlarmaCreadaScreen({navigation}: Props) {
  const {lastCreated} = useAlarms();
  const insets = useSafeAreaInsets();
  const {height} = useWindowDimensions();
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 1,
      duration: 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [slide]);

  const close = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <Pressable style={StyleSheet.absoluteFill} onPress={close}>
        <Animated.View style={[styles.backdrop, {opacity: slide}]} />
      </Pressable>

      <Animated.View
        style={[
          styles.sheet,
          {
            maxHeight: height * 0.92,
            paddingBottom: 24 + insets.bottom,
            transform: [
              {
                translateY: slide.interpolate({
                  inputRange: [0, 1],
                  outputRange: [height, 0],
                }),
              },
            ],
          },
        ]}>
        <View style={styles.handle} />
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}>
          <CroppedImage
            source={require('../assets/images/p14_check.png')}
            width={228}
            height={183}
            crop={{w: 110.96, h: 138.25, left: -6.14, top: -22.4}}
          />
          <Text style={styles.title}>Alarma creada</Text>

          <View style={styles.detailsBox}>
            <DetailRow label="Hora" value={lastCreated?.time ?? '--:--'} />
            <DetailRow
              label="Frecuencia"
              value={lastCreated?.frequency ?? '-'}
            />
            <DetailRow
              label="Para quién es"
              value={lastCreated ? recipientLabel(lastCreated) : '-'}
            />
            <DetailRow
              label="Repite hasta"
              value={lastCreated?.until ?? '-'}
              showDivider={false}
            />
          </View>

          <View style={styles.actions}>
            <AppButton
              label="Continuar"
              variant="text"
              color={colors.textMuted}
              fullWidth={false}
              onPress={close}
            />
            <AppButton
              label="Compartir alarma"
              fullWidth={false}
              onPress={() => navigation.navigate('SelectorContacto')}
            />
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  handle: {
    alignSelf: 'center',
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CAC4D0',
  },
  content: {
    alignItems: 'center',
    paddingTop: 16,
  },
  title: {
    fontFamily: fonts.nunitoBold,
    fontSize: 20,
    color: colors.textMuted,
    marginTop: 16,
    marginBottom: 24,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: 'rgba(239,167,130,0.08)',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 24,
  },
  continueButton: {
    width: 143,
  },
});
