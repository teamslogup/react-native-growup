import React, { useState } from 'react';
import { Image, Text, View, ViewProps } from 'react-native';
import styled from 'styled-components/native';
import { images } from '@src/assets';

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
    onChange?.call(null, !checked);
    setChecked(!checked);
  };

  return (
    <StyledView onTouchEnd={toggleChecked}>
      <StyledCheckBox value={checked} disabled={disabled} {...viewProps}>
        {checked && <CheckImage source={images.CHECK} />}
      </StyledCheckBox>
      {label && <StyledLabel>{label}</StyledLabel>}
    </StyledView>
  );
};

const StyledView = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

interface StyledCheckBoxProps {
  value: boolean;
  disabled: boolean;
}

const StyledCheckBox = styled(View)<StyledCheckBoxProps>`
  width: 24px;
  height: 24px;
  background-color: ${props =>
    props.value ? props.theme.main.DARK_BLACK : props.theme.grey[6]};
  border-width: 1px;
  border-color: ${props => props.theme.main.DARK_BLACK};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled(Text)`
  margin-left: 10px;
  color: ${props => props.theme.grey[2]};
`;

const CheckImage = styled(Image)`
  width: 13px;
  height: 8px;
`;

export default CheckBox;
