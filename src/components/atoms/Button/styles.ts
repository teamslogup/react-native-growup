import { Pressable as RNPressable, Text as RNText } from 'react-native';
import styled from 'styled-components/native';
import { ButtonProps } from './types';
import {
  backgroundColorTable,
  fontSizeTable,
  fontWeightTable,
  heightTable,
  textColorTable,
} from './utils';

export const Pressable = styled(RNPressable)<Required<ButtonProps>>`
  background-color: ${({ variant, colorStyle, theme, disabled }) =>
    backgroundColorTable[variant][disabled ? 'disabled' : colorStyle](theme)};
  height: ${props => heightTable[props.size]};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Text = styled(RNText)<Required<ButtonProps>>`
  color: ${({ variant, disabled, theme, colorStyle }) =>
    textColorTable[variant][disabled ? 'disabled' : colorStyle](theme)};
  font-size: ${props => fontSizeTable[props.size]};
  font-weight: ${props => fontWeightTable[props.size]};
`;
