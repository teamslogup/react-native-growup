import React from 'react';
import { PressableProps } from 'react-native';
import * as Styled from './styles';
import { ButtonProps } from './types';

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
    <Styled.Pressable
      variant={variant}
      colorStyle={colorStyle}
      size={size}
      disabled={disabled}
      {...pressableProps}
    >
      <Styled.Text
        variant={variant}
        colorStyle={colorStyle}
        size={size}
        disabled={disabled}
      >
        {children}
      </Styled.Text>
    </Styled.Pressable>
  );
};

export default Button;
