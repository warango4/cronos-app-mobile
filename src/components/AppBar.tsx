import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from '@react-native-vector-icons/material-design-icons';
import {colors} from '../styles/theme';
import {fonts} from '../styles/typography';
import GenericAvatar from './GenericAvatar';

type Props = {
  title: string;
  onBack?: () => void;
  titleSize?: number;
  showAvatar?: boolean;
  avatarLetter?: string;
  avatarColor?: string;
};

export default function AppBar({
  title,
  onBack,
  titleSize = 22,
  showAvatar = true,
  avatarLetter = 'C',
  avatarColor = colors.warmPeach,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.row}>
        <View style={styles.left}>
          {onBack ? (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBack}
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
              <Icon name="arrow-left" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          ) : null}
          <Text style={[styles.title, {fontSize: titleSize}]}>{title}</Text>
        </View>
        {showAvatar ? (
          <GenericAvatar letter={avatarLetter} backgroundColor={avatarColor} />
        ) : null}
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.surfaceMuted,
    width: '100%',
  },
  row: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flexShrink: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.nunitoBold,
    color: colors.textMuted,
    flexShrink: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
});
