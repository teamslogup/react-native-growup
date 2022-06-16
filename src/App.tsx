import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Store, createStore } from 'redux';
import { RootStackNavigator } from './navigations';
import { rootReducer } from './services';

const App: FunctionComponent = function App() {
  const store: Store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
