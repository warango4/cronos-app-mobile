import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import {Button} from 'react-native-paper';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';

type Variant = 'filled' | 'outline' | 'text';
type Size = 'small' | 'medium' | 'large';

const HEIGHTS: Record<Size, number> = {small: 48, medium: 56, large: 96};
const FONT_SIZES: Record<Size, number> = {small: 14, medium: 15, large: 18};
// M3 "Square": esquinas redondeadas según tamaño; "Round": píldora.
const SQUARE_RADIUS: Record<Size, number> = {small: 12, medium: 16, large: 28};

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  color?: string;
  size?: Size;
  shape?: 'square' | 'round';
  icon?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
};

export default function AppButton({
  label,
  onPress,
  variant = 'filled',
  color = colors.warmPeach,
  size = 'medium',
  shape = 'square',
  icon,
  disabled = false,
  fullWidth = true,
  style,
  labelStyle,
}: Props) {
  const height = HEIGHTS[size];
  const mode = variant === 'filled' ? 'contained' : variant === 'outline' ? 'outlined' : 'text';

  return (
    <Button
      mode={mode}
      onPress={onPress}
      icon={icon}
      disabled={disabled}
      buttonColor={variant === 'filled' ? color : undefined}
      textColor={variant === 'filled' ? '#FFFFFF' : color}
      style={[
        {
          borderRadius: shape === 'round' ? height / 2 : SQUARE_RADIUS[size],
          borderColor: variant === 'outline' ? color : undefined,
          borderWidth: variant === 'outline' ? 1.5 : undefined,
          alignSelf: fullWidth ? 'stretch' : undefined,
        },
        style,
      ]}
      contentStyle={{height}}
      labelStyle={[
        {fontFamily: fonts.figtreeBold, fontSize: FONT_SIZES[size]},
        labelStyle,
      ]}>
      {label}
    </Button>
  );
}
