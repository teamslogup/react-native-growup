import { Pressable as RNPressable, Image as RNImage } from 'react-native';
import styled, { css } from 'styled-components/native';

interface PressableProps {
  width: number;
  height: number;
  shape: 'square' | 'circle';
  backgroundColor: string;
}

export const Pressable = styled(RNPressable)<PressableProps>`
  background-color: ${props => props.backgroundColor};
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.shape === 'circle' &&
    css`
      border-radius: ${Math.max(props.width, props.height)}px;
    `};
`;

interface ImageProps {
  width: number;
  height: number;
}

export const Image = styled(RNImage)<ImageProps>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;
