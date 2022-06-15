import React from 'react';
import { View, ViewProps } from 'react-native';
import { FlattenInterpolation, ThemedStyledProps } from 'styled-components';
import { css, DefaultTheme, ThemeProps } from 'styled-components/native';
import { CheckBoxProps, StyledCheckBoxProps } from './types';

export const checkBoxStyles: (
  props: ThemedStyledProps<
    ViewProps & React.RefAttributes<View> & StyledCheckBoxProps,
    DefaultTheme
  >,
) => Record<
  NonNullable<CheckBoxProps['variant']>,
  FlattenInterpolation<ThemeProps<DefaultTheme>>
> = props => ({
  standard: css`
    background-color: ${props.value
      ? props.theme.palette.main.DARK_BLACK
      : props.theme.palette.grey[6]};
    border-width: 1px;
    border-color: ${props.theme.palette.main.DARK_BLACK};
  `,
  checkonly: css`
    background-color: transparent;
  `,
  borderless: css`
    background-color: ${props.value
      ? props.theme.palette.main.DARK_BLACK
      : props.theme.palette.grey[4]};
  `,
});
