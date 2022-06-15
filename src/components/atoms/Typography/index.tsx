import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  TextProps,
  TextStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import * as Styled from './styles';

interface TypographyProps {
  fontSize?: number | ((theme: DefaultTheme) => number);
  align?: 'left' | 'center' | 'right';
  color?: string | ((theme: DefaultTheme) => string);
  underline?: boolean;
  fontWeight?: TextStyle['fontWeight'];
  onPress?: (e: GestureResponderEvent) => unknown;
  children: ReactNode;
}

const Typography: React.FC<TypographyProps & TextProps> = function Typograph(
  props,
) {
  const {
    fontSize = 16,
    underline = false,
    align = 'left',
    onPress,
    fontWeight = '400',
    color,
    children,
    style: textStyle,
    ...textProps
  } = props;

  const theme = useTheme();

  const textColor = (() => {
    if (color) return typeof color === 'function' ? color(theme) : color;
    return theme.palette.main.DARK_BLACK;
  })();

  const style: StyleProp<TextStyle> = StyleSheet.compose(textStyle, {
    textAlign: align,
    fontWeight,
  });

  return (
    <Pressable onPress={onPress}>
      <Styled.Text
        fontSize={typeof fontSize === 'function' ? fontSize(theme) : fontSize}
        textColor={textColor}
        underline={underline}
        style={style}
        {...textProps}
      >
        {children}
      </Styled.Text>
    </Pressable>
  );
};

export default Typography;
