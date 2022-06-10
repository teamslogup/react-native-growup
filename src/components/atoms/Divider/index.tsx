import React from 'react';
import { View, ViewProps } from 'react-native';
import styled, { css, DefaultTheme, useTheme } from 'styled-components/native';
import Typography from '../Typography';

interface DividerProps {
  label?: string;
  textColor?: string | ((theme: DefaultTheme) => string);
  length?: string;
  thickness?: number;
  direction?: 'row' | 'column';
  color?: string | ((theme: DefaultTheme) => string);
}

const Divider: React.FC<DividerProps & ViewProps> = function Divider(props) {
  const {
    label,
    length,
    thickness = 1,
    direction = 'row',
    color,
    textColor,
    ...viewProps
  } = props;

  const theme = useTheme();

  const dividerColor = (() => {
    if (color) return typeof color === 'function' ? color(theme) : color;
    return theme.main.DARK_BLACK;
  })();

  const labelColor = (() => {
    if (textColor)
      return typeof textColor === 'function' ? textColor(theme) : textColor;
    return dividerColor;
  })();

  return (
    <StyledView
      length={length}
      thickness={thickness}
      dividerDirection={direction}
      color={dividerColor}
      {...viewProps}
    >
      {label && (
        <StyledLabelContainer>
          <Typography color={labelColor}>{label}</Typography>
        </StyledLabelContainer>
      )}
    </StyledView>
  );
};

interface StyledViewProps {
  length?: string;
  thickness: number;
  dividerDirection: 'row' | 'column';
  color: string;
}

const StyledView = styled(View)<StyledViewProps>`
  background-color: ${props => props.color};
  position: relative;

  ${props =>
    props.dividerDirection === 'row'
      ? css`
          width: ${props.length || 'auto'};
          height: ${props.thickness};
        `
      : css`
          width: ${props.thickness};
          height: ${props.length || 'auto'};
        `}
`;

const StyledLabelContainer = styled(View)`
  position: absolute;
  top: -8px;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default Divider;
