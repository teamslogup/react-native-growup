import { MutableRefObject, ReactNode } from 'react';
import { TextInput, TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps {
  variant?: 'standard' | 'outlined';
  error?: boolean;
  helperText?: string;
  inputRef?: MutableRefObject<TextInput>;
  inputProps?: RNTextInputProps;
  endAdornment?: ReactNode;
  onSubmit?: () => unknown;
}
