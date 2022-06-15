import { ReactNode } from 'react';

export interface ButtonProps {
  variant?: 'contained' | 'outlined' | 'inverted';
  colorStyle?: 'dark' | 'light';
  size?: 'large' | 'medium' | 'small' | 'tiny';
  disabled?: boolean;
  children: ReactNode;
}
