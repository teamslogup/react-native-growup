import React from 'react';
import { ViewProps } from 'react-native';
import { DefaultTheme, useTheme } from 'styled-components/native';
import Typography from '../Typography';
import * as Styled from './styles';

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

  const getDividerColor = () => {
    if (color) {
      return typeof color === 'function' ? color(theme) : color;
    }
    return theme.palette.main.DARK_BLACK;
  };

  const getLabelColor = () => {
    if (textColor) {
      return typeof textColor === 'function' ? textColor(theme) : textColor;
    }
    return getDividerColor();
  };

  return (
    <Styled.Container
      length={length}
      thickness={thickness}
      dividerDirection={direction}
      color={getDividerColor()}
      {...viewProps}
    >
      {label && (
        <Styled.LabelContainer>
          <Typography color={getLabelColor()}>{label}</Typography>
        </Styled.LabelContainer>
      )}
    </Styled.Container>
  );
};

export default Divider;
