import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
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
    label,
    error = false,
    helperText,
    helper,
    onSubmit,
    endAdornment,
    inputRef,
    inputProps,
    ...viewProps
  } = props;

  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState(inputProps?.defaultValue || '');

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(true);
    inputProps?.onFocus?.call(null, e);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setFocused(false);
    inputProps?.onBlur?.call(null, e);
  };

  const onChange = (newValue: string) => {
    setValue(newValue);
    inputProps?.onChangeText?.call(null, newValue);
  };

  useEffect(() => {
    setValue(prevValue =>
      typeof inputProps?.value === 'string' ? inputProps.value : prevValue,
    );
  }, [inputProps]);

  return (
    <View {...viewProps}>
      <Styled.InputContainer>
        {!!label && value.length > 0 && (
          <Styled.Label variant={variant}>{label}</Styled.Label>
        )}
        <Styled.TextInput
          ref={inputRef}
          isFocused={focused}
          variant={variant}
          onFocus={handleFocus}
          onBlur={handleBlur}
          error={error}
          onSubmitEditing={onSubmit}
          {...inputProps}
          value={value}
          onChangeText={onChange}
        />
        <Styled.EndAdornmentContainer pointerEvents="box-none">
          {endAdornment}
        </Styled.EndAdornmentContainer>
      </Styled.InputContainer>
      {!!helperText && (
        <Styled.HelperText error={error}>{helperText}</Styled.HelperText>
      )}
      <View style={styles.marginTop5}>{helper}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginTop5: {
    marginTop: 5,
  },
});

export default TextInput;
