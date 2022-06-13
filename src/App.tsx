import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { RootStackNavigator } from '@src/navigations';
import { theme } from '@src/styles';

const App: React.FC = function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;
