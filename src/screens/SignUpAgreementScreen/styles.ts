import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  height: 100%;
  background-color: ${props => props.theme.palette.grey.WHITE};
  align-items: center;
`;

export const Container = styled.View`
  width: 90%;
  height: 95%;
  justify-content: space-between;
`;
