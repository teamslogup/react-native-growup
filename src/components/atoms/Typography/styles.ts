import { Text as RNText } from 'react-native';
import styled, { css } from 'styled-components/native';

interface TextProps {
  fontSize: number;
  textColor: string;
  underline: boolean;
}

export const Text = styled(RNText)<TextProps>`
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize}px;

  ${props =>
    props.underline &&
    css`
      text-decoration: underline;
    `};
`;
