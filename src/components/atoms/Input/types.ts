import { MutableRefObject, ReactNode } from 'react';
import { TextInput, TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps {
  variant?: 'standard' | 'outlined';
  label?: string;
  error?: boolean;
  helperText?: string;
  helper?: ReactNode;
  inputRef?: MutableRefObject<TextInput>;
  inputProps?: RNTextInputProps;
  endAdornment?: ReactNode;
  onSubmit?: () => unknown;
}
