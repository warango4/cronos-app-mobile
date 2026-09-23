import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {colors} from '../styles/theme';

type Props = {
  children: React.ReactNode;
  radius?: number;
  style?: ViewStyle | ViewStyle[];
};

export default function Card({children, radius = 16, style}: Props) {
  return (
    <View style={[styles.card, {borderRadius: radius}, style]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
