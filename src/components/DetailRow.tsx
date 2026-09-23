import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';

type Props = {
  label: string;
  value: string;
  showDivider?: boolean;
};

export default function DetailRow({label, value, showDivider = true}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      {showDivider ? <View style={styles.divider} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.figtreeRegular,
    fontSize: 14,
    color: colors.textMuted,
  },
  value: {
    fontFamily: fonts.figtreeSemiBold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
