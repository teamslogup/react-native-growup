import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  Text,
  TextProps,
} from 'react-native';
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native';

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
      <StyledText
        fontSize={fontSize}
        textColor={textColor}
        underline={underline}
        {...textProps}
      >
        {children}
      </StyledText>
    </Pressable>
  );
};

interface StyledTextProps {
  fontSize: number;
  textColor: string;
  underline: boolean;
}

const StyledText = styled(Text)<StyledTextProps>`
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize}px;

  ${props =>
    props.underline &&
    css`
      text-decoration: underline;
    `};
`;

export default Typography;
