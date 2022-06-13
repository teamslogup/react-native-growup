import { View, TextInput as RNTextInput, Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TextInputProps } from './types';

export const InputContainer = styled(View)`
  position: relative;
`;

export const EndAdornmentContainer = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-right: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

interface StyledTextInputProps
  extends Required<Pick<TextInputProps, 'variant' | 'error'>> {
  isFocused: boolean;
}

export const TextInput = styled(RNTextInput)<StyledTextInputProps>`
  height: 44px;
  font-size: 16px;

  ${props =>
    props.variant === 'standard'
      ? css`
          border-bottom-width: 2px;
          border-bottom-color: ${props.theme.grey[5]};

          ${props.isFocused &&
          css`
            border-bottom-color: ${props.theme.main.DARK_BLACK};
          `}

          ${props.error &&
          css`
            border-bottom-color: ${props.theme.state.RED};
          `}
        `
      : css`
          border-width: 1px;
          border-color: ${props.theme.grey[5]};

          ${props.isFocused &&
          css`
            border-color: ${props.theme.main.DARK_BLACK};
          `}

          ${props.error &&
          css`
            border-color: ${props.theme.state.RED};
          `}
        `}
`;

export const HelperText = styled(Text)<
  Required<Pick<StyledTextInputProps, 'error'>>
>`
  font-size: 12px;
  margin-top: 8px;

  ${props =>
    props.error &&
    css`
      color: ${props.theme.state.RED};
    `}
`;
