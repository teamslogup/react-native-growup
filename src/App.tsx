import React, { Suspense } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { SWRConfig } from 'swr';
import { RootStackNavigator } from '@src/navigations';
import { theme } from '@src/styles';

const App: React.FC = function App() {
  return (
    <RecoilRoot>
      <SWRConfig>
        <ThemeProvider theme={theme}>
          <NavigationContainer>
            <Suspense fallback={false}>
              <RootStackNavigator />
            </Suspense>
          </NavigationContainer>
        </ThemeProvider>
      </SWRConfig>
    </RecoilRoot>
  );
};

export default App;
