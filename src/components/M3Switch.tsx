import React, {useEffect, useRef} from 'react';
import {Animated, Easing, Pressable, StyleSheet} from 'react-native';
import {colors} from '../styles/theme';

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const OFF_TRACK = '#E6E0E9';
const OFF_OUTLINE = '#79747E';

// Interruptor Material Design 3: pista 52x32, pulgar 16 (inactivo) -> 24 (activo).
export default function M3Switch({value, onValueChange}: Props) {
  const progress = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: value ? 1 : 0,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, progress]);

  const trackColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_TRACK, colors.sageGreen],
  });
  const outlineColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_OUTLINE, colors.sageGreen],
  });
  const thumbColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [OFF_OUTLINE, '#FFFFFF'],
  });
  const thumbSize = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 24],
  });
  const thumbRadius = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 12],
  });
  const thumbLeft = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 22],
  });
  const thumbTop = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 2],
  });

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{checked: value}}
      onPress={() => onValueChange(!value)}>
      <Animated.View
        style={[
          styles.track,
          {backgroundColor: trackColor, borderColor: outlineColor},
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbRadius,
              backgroundColor: thumbColor,
              left: thumbLeft,
              top: thumbTop,
            },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
  },
  thumb: {
    position: 'absolute',
  },
});
