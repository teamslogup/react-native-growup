import React, { useState } from 'react';
import { ViewProps } from 'react-native';
import { images } from '@src/assets';
import * as Styled from './styles';

interface CheckBoxProps {
  label?: string;
  value?: boolean;
  onChange?: (checked: boolean) => unknown;
  defaultValue?: boolean;
  disabled?: boolean;
}

const CheckBox: React.FC<CheckBoxProps & ViewProps> = function CheckBox(props) {
  const {
    label,
    defaultValue = false,
    value = defaultValue,
    onChange,
    disabled = false,
    ...viewProps
  } = props;

  const [checked, setChecked] = useState(value);

  const toggleChecked = () => {
    if (disabled) return;

    onChange?.call(null, !checked);
    setChecked(!checked);
  };

  return (
    <Styled.Container onTouchEnd={toggleChecked}>
      <Styled.CheckBox value={checked} disabled={disabled} {...viewProps}>
        {checked && <Styled.CheckImage source={images.CHECK} />}
      </Styled.CheckBox>
      {label && <Styled.Label>{label}</Styled.Label>}
    </Styled.Container>
  );
};

export default CheckBox;
