import { Text, View as RNView } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(RNView)`
  height: 100%;
  background-color: ${props => props.theme.palette.grey.WHITE};
  display: flex;
  align-items: center;
`;

export const HelpText = styled(Text)`
  color: ${props => props.theme.palette.grey[2]};
`;

export const Socials = styled(RNView)`
  margin-top: 50px;
  width: 85%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
