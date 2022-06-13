import { DefaultTheme } from 'styled-components/native';
import { ButtonProps } from './types';

type ColorTable = Record<
  Required<ButtonProps>['variant'],
  Record<
    Required<ButtonProps>['colorStyle'] | 'disabled',
    (theme: DefaultTheme) => string
  >
>;
type SizeTable = Record<Required<ButtonProps>['size'], string>;

export const backgroundColorTable: ColorTable = {
  contained: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.grey[1],
    disabled: theme => theme.grey[5],
  },
  inverted: {
    dark: theme => theme.grey[4],
    light: theme => theme.grey[5],
    disabled: theme => theme.grey[5],
  },
  outlined: {
    dark: theme => theme.grey.WHITE,
    light: theme => theme.grey.WHITE,
    disabled: theme => theme.grey.WHITE,
  },
};

export const textColorTable: ColorTable = {
  contained: {
    dark: theme => theme.grey.WHITE,
    light: theme => theme.grey.WHITE,
    disabled: theme => theme.grey[4],
  },
  inverted: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.main.DARK_BLACK,
    disabled: theme => theme.grey[4],
  },
  outlined: {
    dark: theme => theme.main.DARK_BLACK,
    light: theme => theme.main.DARK_BLACK,
    disabled: theme => theme.grey[4],
  },
};

export const heightTable: SizeTable = {
  large: '56px',
  medium: '48px',
  small: '40px',
  tiny: '34px',
};

export const fontSizeTable: SizeTable = {
  large: '16px',
  medium: '14px',
  small: '14px',
  tiny: '14px',
};

export const fontWeightTable: SizeTable = {
  large: '500',
  medium: '500',
  small: '400',
  tiny: '400',
};
