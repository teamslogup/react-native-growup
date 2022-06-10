import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
} from 'react-native';
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native';

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
    <StyledPressable
      width={containerSize.width}
      height={containerSize.height}
      onPress={onPress}
      shape={shape}
      backgroundColor={bgcolor}
    >
      <StyledImage
        width={iconSize.width}
        height={iconSize.height}
        source={src}
        style={styles.icon}
      />
    </StyledPressable>
  );
};

interface StyledPressableProps {
  width: number;
  height: number;
  shape: 'square' | 'circle';
  backgroundColor: string;
}

const StyledPressable = styled(Pressable)<StyledPressableProps>`
  background-color: ${props => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.shape === 'circle' &&
    css`
      border-radius: ${Math.max(props.width, props.height)};
    `};
`;

interface StyledImageProps {
  width: number;
  height: number;
}

const StyledImage = styled(Image)<StyledImageProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
  },
});

export default Icon;
