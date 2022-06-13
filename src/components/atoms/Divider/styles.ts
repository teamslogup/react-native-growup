import { View as RNView } from 'react-native';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  length?: string;
  thickness: number;
  dividerDirection: 'row' | 'column';
  color: string;
}

export const Container = styled(RNView)<ContainerProps>`
  background-color: ${props => props.color};
  position: relative;

  ${props =>
    props.dividerDirection === 'row'
      ? css`
          width: ${props.length || 'auto'};
          height: ${props.thickness}px;
        `
      : css`
          width: ${props.thickness}px;
          height: ${props.length || 'auto'};
        `}
`;

export const LabelContainer = styled(RNView)`
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
