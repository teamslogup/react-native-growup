import React, { useEffect, useState } from 'react';
import { ViewProps } from 'react-native';
import { useTheme } from 'styled-components/native';
import { icons } from '@src/assets';
import * as Styled from './styles';
import { CheckBoxProps } from './types';

const CheckBox: React.FC<CheckBoxProps & ViewProps> = function CheckBox(props) {
  const {
    variant = 'standard',
    label,
    labelStyle,
    defaultValue = false,
    value = defaultValue,
    onChange,
    disabled = false,
    ...viewProps
  } = props;

  const theme = useTheme();
  const [checked, setChecked] = useState(value);

  const toggleChecked = () => {
    if (disabled) return;

    onChange?.call(null, !checked);
    setChecked(!checked);
  };

  useEffect(() => setChecked(value), [value]);

  return (
    <Styled.Container onTouchEnd={toggleChecked} {...viewProps}>
      <Styled.CheckBox variant={variant} value={checked} disabled={disabled}>
        <Styled.CheckImage
          source={icons.CHECK}
          checked={checked}
          variant={variant}
        />
      </Styled.CheckBox>
      {label && (
        <Styled.Label
          style={
            typeof labelStyle === 'function' ? labelStyle(theme) : labelStyle
          }
        >
          {label}
        </Styled.Label>
      )}
    </Styled.Container>
  );
};

export default CheckBox;
