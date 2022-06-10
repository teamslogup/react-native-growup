import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const StyledView = styled(View)`
  height: 100%;
  background-color: ${props => props.theme.grey.WHITE};
  display: flex;
  align-items: center;
`;

export const StyledHelpText = styled(Text)`
  color: ${props => props.theme.grey[2]};
`;

export const StyledSocialView = styled(View)`
  margin-top: 50px;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
