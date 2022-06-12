import { ReactNode } from 'react';
import { TextInputProps as RNTextInputProps } from 'react-native';

export interface TextInputProps {
  variant?: 'standard' | 'outlined';
  error?: boolean;
  helperText?: string;
  inputProps: RNTextInputProps;
  endAdornment?: ReactNode;
  onSubmit?: () => unknown;
}
