import React, { ReactNode } from 'react';
import { GestureResponderEvent, Pressable, TextProps } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import * as Styled from './styles';

interface TypographyProps {
  fontSize?: number;
  color?: string | ((theme: DefaultTheme) => string);
  underline?: boolean;
  onPress?: (e: GestureResponderEvent) => unknown;
  children: ReactNode;
}

const Typography: React.FC<TypographyProps & TextProps> = function Typograph(
  props,
) {
  const {
    fontSize = 16,
    underline = false,
    onPress,
    color,
    children,
    ...textProps
  } = props;

  const theme = useTheme();

  const textColor = (() => {
    if (color) return typeof color === 'function' ? color(theme) : color;
    return theme.main.DARK_BLACK;
  })();

  return (
    <Pressable onPress={onPress}>
      <Styled.Text
        fontSize={fontSize}
        textColor={textColor}
        underline={underline}
        {...textProps}
      >
        {children}
      </Styled.Text>
    </Pressable>
  );
};

export default Typography;
