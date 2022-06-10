import React, { ReactNode, useState } from 'react';
import {
  NativeSyntheticEvent,
  Text,
  TextInput as RNTextInput,
  TextInputFocusEventData,
  TextInputProps as RNTextInputProps,
  View,
  ViewProps,
} from 'react-native';
import styled, { css } from 'styled-components/native';

interface TextInputProps {
  variant?: 'standard' | 'outlined';
  error?: boolean;
  helperText?: string;
  inputProps: RNTextInputProps;
  endAdornment?: ReactNode;
  onSubmit?: () => unknown;
}

const TextInput: React.FC<TextInputProps & ViewProps> = function TextInput(
  props,
) {
  const {
    variant = 'standard',
    error = false,
    helperText,
    onSubmit,
    endAdornment,
    inputProps,
    ...viewProps
  } = props;

  const [focused, setFocused] = useState(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    inputProps.onFocus?.call(null, e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    inputProps.onBlur?.call(null, e);
  };

  return (
    <View {...viewProps}>
      <InputContainer>
        <StyledTextInput
          isFocused={focused}
          variant={variant}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={error}
          onSubmitEditing={onSubmit}
          {...inputProps}
        />
        <EndAdornmentContainer pointerEvents="box-none">
          {endAdornment}
        </EndAdornmentContainer>
      </InputContainer>
      {helperText && <HelperText error={error}>{helperText}</HelperText>}
    </View>
  );
};

const InputContainer = styled(View)`
  position: relative;
`;

const EndAdornmentContainer = styled(View)`
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

const StyledTextInput = styled(RNTextInput)<StyledTextInputProps>`
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
          `} /* &:focus {
      border-bottom-color: ${props.theme.main.DARK_BLACK};
    } */
        `
      : css``}
`;

const HelperText = styled(Text)<Required<Pick<StyledTextInputProps, 'error'>>>`
  font-size: 12px;
  margin-top: 8px;

  ${props =>
    props.error &&
    css`
      color: ${props.theme.state.RED};
    `}
`;

export default TextInput;
