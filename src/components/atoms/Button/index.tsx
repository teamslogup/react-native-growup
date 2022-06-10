import React, { ReactNode } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import styled, { DefaultTheme } from 'styled-components/native';

interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'inverted';
  colorStyle?: 'dark' | 'light';
  size?: 'large' | 'medium' | 'small' | 'tiny';
  disabled?: boolean;
  children: ReactNode;
}

type ColorTable = Record<
  Required<ButtonProps>['variant'],
  Record<
    Required<ButtonProps>['colorStyle'] | 'disabled',
    (theme: DefaultTheme) => string
  >
>;
type SizeTable = Record<Required<ButtonProps>['size'], string>;

const Button: React.FC<ButtonProps & PressableProps> = function Button(props) {
  const {
    variant = 'contained',
    colorStyle = 'dark',
    size = 'medium',
    disabled = false,
    children,
    ...pressableProps
  } = props;

  return (
    <StyledPressable
      variant={variant}
      colorStyle={colorStyle}
      size={size}
      disabled={disabled}
      {...pressableProps}
    >
      <StyledText
        variant={variant}
        colorStyle={colorStyle}
        size={size}
        disabled={disabled}
      >
        {children}
      </StyledText>
    </StyledPressable>
  );
};

const backgroundColorTable: ColorTable = {
  contained: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.grey[1],
    disabled: theme => theme.grey[5],
  },
  inverted: {
    dark: theme => theme.grey[4],
    light: theme => theme.grey[5],
    disabled: theme => theme.grey[5],
  },
  outlined: {
    dark: theme => theme.grey.WHITE,
    light: theme => theme.grey.WHITE,
    disabled: theme => theme.grey.WHITE,
  },
};

const textColorTable: ColorTable = {
  contained: {
    dark: theme => theme.grey.WHITE,
    light: theme => theme.grey.WHITE,
    disabled: theme => theme.grey[4],
  },
  inverted: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.main.DARK_BLACK,
    disabled: theme => theme.grey[4],
  },
  outlined: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.main.DARK_BLACK,
    disabled: theme => theme.grey[4],
  },
};

const heightTable: SizeTable = {
  large: '56px',
  medium: '48px',
  small: '40px',
  tiny: '34px',
};

const fontSizeTable: SizeTable = {
  large: '16px',
  medium: '14px',
  small: '14px',
  tiny: '14px',
};

const fontWeightTable: SizeTable = {
  large: '500',
  medium: '500',
  small: '400',
  tiny: '400',
};

const StyledPressable = styled(Pressable)<Required<ButtonProps>>`
  background-color: ${props =>
    backgroundColorTable[props.variant][
      props.disabled ? 'disabled' : props.colorStyle
    ](props.theme)};
  height: ${props => heightTable[props.size]};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled(Text)<Required<ButtonProps>>`
  color: ${props =>
    textColorTable[props.variant][
      props.disabled ? 'disabled' : props.colorStyle
    ](props.theme)};
  font-size: ${props => fontSizeTable[props.size]};
  font-weight: ${props => fontWeightTable[props.size]};
`;

export default Button;
