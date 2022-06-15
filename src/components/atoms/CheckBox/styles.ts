import { Image, Text, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { CheckBoxProps, StyledCheckBoxProps } from './types';
import { checkBoxStyles } from './utils';

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CheckBox = styled(View)<StyledCheckBoxProps>`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  ${props => checkBoxStyles(props)[props.variant]};
`;

export const Label = styled(Text)`
  margin-left: 10px;
  color: ${props => props.theme.palette.grey[2]};
`;

interface CheckImageProps {
  variant: NonNullable<CheckBoxProps['variant']>;
  checked: boolean;
}

export const CheckImage = styled(Image)<CheckImageProps>`
  width: 13px;
  height: 10px;

  ${props =>
    props.variant === 'checkonly' &&
    css({
      tintColor: props.checked
        ? props.theme.palette.main.DARK_BLACK
        : props.theme.palette.grey[4],
    })}

  ${props =>
    props.variant === 'borderless' &&
    css({
      tintColor: props.checked
        ? props.theme.palette.grey.WHITE
        : props.theme.palette.grey[6],
    })}
`;
