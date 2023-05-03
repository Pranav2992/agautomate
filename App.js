import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/stacknavigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { Root } from "native-base";

const App = () => {
  return (
    <Root>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </Root>
  );
};


export default App;
