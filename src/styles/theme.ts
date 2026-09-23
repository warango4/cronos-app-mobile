import {MD3LightTheme, configureFonts} from 'react-native-paper';
import type {MD3Theme} from 'react-native-paper';
import {fonts} from './typography';

export const colors = {
  background: '#FFFEFD',
  surface: '#FFFFFF',
  surfaceMuted: '#F7F5F0',
  border: '#E0DCD5',
  textPrimary: '#1A1A1A',
  textMuted: '#666666',
  sageGreen: '#8FAB82',
  sageTint: '#EBF1E8',
  warmPeach: '#EFA782',
  peachTint: '#FDF0EB',
  amber: '#E7B35A',
  amberTint: 'rgba(231, 179, 90, 0.13)',
  skyBlue: '#8FB8D9',
  lavender: '#A390C5',
  white: '#FFFFFF',
};

const baseFont = {fontFamily: fonts.figtreeRegular};

const fontConfig = {
  displayLarge: {...baseFont, fontFamily: fonts.nunitoBold},
  displayMedium: {...baseFont, fontFamily: fonts.nunitoBold},
  displaySmall: {...baseFont, fontFamily: fonts.nunitoBold},
  headlineLarge: {...baseFont, fontFamily: fonts.nunitoBold},
  headlineMedium: {...baseFont, fontFamily: fonts.nunitoBold},
  headlineSmall: {...baseFont, fontFamily: fonts.nunitoBold},
  titleLarge: {...baseFont, fontFamily: fonts.nunitoBold},
  titleMedium: {...baseFont, fontFamily: fonts.figtreeSemiBold},
  titleSmall: {...baseFont, fontFamily: fonts.figtreeSemiBold},
  labelLarge: {...baseFont, fontFamily: fonts.figtreeSemiBold},
  labelMedium: {...baseFont, fontFamily: fonts.figtreeMedium},
  labelSmall: {...baseFont, fontFamily: fonts.figtreeMedium},
  bodyLarge: {...baseFont, fontFamily: fonts.figtreeRegular},
  bodyMedium: {...baseFont, fontFamily: fonts.figtreeRegular},
  bodySmall: {...baseFont, fontFamily: fonts.figtreeRegular},
};

export const theme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts({config: fontConfig}),
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.sageGreen,
    onPrimary: colors.white,
    primaryContainer: colors.sageTint,
    secondary: colors.warmPeach,
    onSecondary: colors.white,
    secondaryContainer: colors.peachTint,
    tertiary: colors.skyBlue,
    background: colors.background,
    surface: colors.surface,
    surfaceVariant: colors.surfaceMuted,
    outline: colors.border,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textMuted,
  },
};
