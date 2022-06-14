import { NavigationContainer } from '@react-navigation/native';
import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { Store, createStore } from 'redux';
import { rootReducer } from '@src/services';
import { RootStackNavigator } from '@src/navigations';

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
