import React from 'react';
import {Image, ImageSourcePropType, StyleProp, View, ViewStyle} from 'react-native';

// Porcentajes tal como los entrega Figma: la imagen original se posiciona
// dentro de un contenedor que la recorta (overflow hidden).
export type Crop = {w: number; h: number; left: number; top: number};

type Props = {
  source: ImageSourcePropType;
  width: number;
  height: number;
  crop: Crop;
  mirrored?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function CroppedImage({
  source,
  width,
  height,
  crop,
  mirrored = false,
  style,
}: Props) {
  return (
    <View
      style={[
        {width, height, overflow: 'hidden'},
        mirrored && {transform: [{scaleX: -1}]},
        style,
      ]}>
      <Image
        source={source}
        resizeMode="stretch"
        style={{
          position: 'absolute',
          width: `${crop.w}%`,
          height: `${crop.h}%`,
          left: `${crop.left}%`,
          top: `${crop.top}%`,
        }}
      />
    </View>
  );
}
