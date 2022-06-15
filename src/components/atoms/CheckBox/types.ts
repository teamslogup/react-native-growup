import { TextStyle } from 'react-native';
import { DefaultTheme } from 'styled-components/native';

export interface CheckBoxProps {
  variant?: 'standard' | 'borderless' | 'checkonly';
  label?: string;
  labelStyle?: TextStyle | ((theme: DefaultTheme) => TextStyle);
  value?: boolean;
  onChange?: (checked: boolean) => unknown;
  defaultValue?: boolean;
  disabled?: boolean;
}

export interface StyledCheckBoxProps {
  value: NonNullable<CheckBoxProps['value']>;
  disabled: NonNullable<CheckBoxProps['disabled']>;
  variant: NonNullable<CheckBoxProps['variant']>;
}
