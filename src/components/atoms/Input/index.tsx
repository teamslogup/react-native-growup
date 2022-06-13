import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  View,
  ViewProps,
} from 'react-native';
import * as Styled from './styles';
import { TextInputProps } from './types';

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
      <Styled.InputContainer>
        <Styled.TextInput
          isFocused={focused}
          variant={variant}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={error}
          onSubmitEditing={onSubmit}
          {...inputProps}
        />
        <Styled.EndAdornmentContainer pointerEvents="box-none">
          {endAdornment}
        </Styled.EndAdornmentContainer>
      </Styled.InputContainer>
      {!!helperText && (
        <Styled.HelperText error={error}>{helperText}</Styled.HelperText>
      )}
    </View>
  );
};

export default TextInput;
