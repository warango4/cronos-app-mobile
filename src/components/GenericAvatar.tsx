import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fonts} from '../styles/typography';

type Props = {
  letter: string;
  backgroundColor: string;
  textColor?: string;
  size?: number;
};

export default function GenericAvatar({
  letter,
  backgroundColor,
  textColor = '#FFFFFF',
  size = 40,
}: Props) {
  return (
    <View
      style={[
        styles.circle,
        {width: size, height: size, borderRadius: size / 2, backgroundColor},
      ]}>
      <Text style={[styles.letter, {color: textColor, fontSize: size * 0.4}]}>
        {letter}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  letter: {
    fontFamily: fonts.figtreeSemiBold,
  },
});
