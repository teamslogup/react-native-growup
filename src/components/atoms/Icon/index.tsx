import React from 'react';
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import * as Styled from './styles';

interface IconProps {
  containerSize?: { width: number; height: number };
  iconSize?: { width: number; height: number };
  src: ImageSourcePropType;
  shape?: 'square' | 'circle';
  containerBackground?: string | ((theme: DefaultTheme) => string);
  onPress?: (e: GestureResponderEvent) => unknown;
}

const Icon: React.FC<IconProps> = function Icon(props) {
  const {
    containerSize = { width: 44, height: 44 },
    iconSize = { width: 24, height: 24 },
    onPress,
    shape = 'circle',
    containerBackground,
    src,
  } = props;

  const theme = useTheme();

  const bgcolor = (() => {
    if (containerBackground)
      return typeof containerBackground === 'function'
        ? containerBackground(theme)
        : containerBackground;
    return 'transparent';
  })();

  return (
    <Styled.Pressable
      width={containerSize.width}
      height={containerSize.height}
      onPress={onPress}
      shape={shape}
      backgroundColor={bgcolor}
    >
      <Styled.Image
        width={iconSize.width}
        height={iconSize.height}
        source={src}
        style={styles.icon}
      />
    </Styled.Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default Icon;
