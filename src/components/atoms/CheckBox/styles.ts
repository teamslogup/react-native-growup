import { Image, Text, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface CheckBoxProps {
  value: boolean;
  disabled: boolean;
}

export const CheckBox = styled(View)<CheckBoxProps>`
  width: 24px;
  height: 24px;
  background-color: ${props =>
    props.value ? props.theme.main.DARK_BLACK : props.theme.grey[6]};
  border-width: 1px;
  border-color: ${props => props.theme.main.DARK_BLACK};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`;

export const Label = styled(Text)`
  margin-left: 10px;
  color: ${props => props.theme.grey[2]};
`;

export const CheckImage = styled(Image)`
  width: 13px;
  height: 8px;
`;
